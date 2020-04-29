const fs = require('fs');
const Web3 = require('web3');
const web3 =
  new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); // test
//new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8546"));

const MYGASPRICE = '1000000000';

function getABI() {
  return JSON.parse(
    fs.readFileSync('./build/Votes_sol_Votes.abi').toString() );
}

function getBinary() {
  var binary =
    fs.readFileSync('./build/Votes_sol_Votes.bin').toString();
  if (!binary.startsWith('0x')) binary = '0x' + binary;
  return binary;
}

function getContract(sca) {
  return new web3.eth.Contract( getABI(), sca );
}

function printEvent(evt) {
  console.log( 'event: ' + JSON.stringify(evt.returnValues) );
}

const cmds =
  [
   'deploy',
   'events',
   'variables',
   'challenges',
   'candidate',
   'setCandidate',
   'setRunning'
  ];

function usage() {
  console.log(
    '\nUsage:\n$ node cli.js <acctindex> <SCA> <command> [arg]*\n',
     'Commands:\n',
     '\tdeploy <ensname> |\n',
     '\tevents |\n',
     '\tvariables |\n',
     '\tchallenges |\n',
     '\tcandidate <challenge>|\n',
     '\tsetCandidate <name> <challenge> <status> |\n',
     '\tsetRunning <true | false> |\n'
  );
}

var ebi = process.argv[2];
var sca = process.argv[3];
var cmd = process.argv[4];

let found = false;
for (let ii = 0; ii < cmds.length; ii++)
  if (cmds[ii] == cmd) found = true;

if (!found) {
  usage();
  process.exit(1);
}

var eb;
web3.eth.getAccounts().then( (res) => {
    eb = res[ebi];
    if (cmd == 'deploy')
    {
      let con = new web3.eth.Contract( getABI() );
      let name = process.argv[5];

      con.deploy({data:getBinary(), arguments: [name]})
        .send({from:eb, gas:1000000, gasPrice:MYGASPRICE}, (err, txhash) => {
          if (err) console.log( err );
        } )
        .on('error', (err) => { console.log("err: ", err); })
        .on('transactionHash', (h) => { console.log( "hash: ", h ); } )
        .on('receipt', (r) => { console.log( 'rcpt: ' + r.contractAddress); } )
        .on('confirmation', (cn, rcpt) => { console.log( 'cn: ', cn ); } )
        .then( (nin) => {
          console.log( "SCA", nin.options.address );
          process.exit(0);
        } );
    }
    else
    {
      let con = new web3.eth.Contract( getABI(), sca );

      if (cmd == 'events')
      {
        con.getPastEvents('allEvents', {fromBlock: 0, toBlock: 'latest'})
           .then( (events) =>
        {
          for (var ii = 0; ii < events.length; ii++) {
            printEvent( events[ii] );
          }
        })
        .catch( err => { console.log(err.toString()) } );
      }

      if (cmd == 'variables')
      {
        con.methods.ensname().call().then( (res) => {
          console.log( "ensname = ", res )
        } )
        .catch( err => { console.log(err.toString()) } );

        con.methods.running().call().then( (res) => {
          console.log( "running = ", res )
        } )
        .catch( err => { console.log(err.toString()) } );
      }

      if (cmd == 'challenges')
      {
        con.methods.getChallengeCount().call().then( res => {
          for( let ii = 0; ii < res; ii++ ) {
            con.methods.challenges(ii).call().then( ch => {
              console.log( 'challenges[' + ii + '] = ' + item );
            } )
            .catch( err => { console.log(err.toString()) } );
          }
        } )
        .catch( err => { console.log(err.toString()) } );
      }

      if (cmd == 'candidate') {
        let chall = process.argv[5];
        con.methods.candidate(chall).call().then( obj => {
          console.log( 'candidate\n\tname: ' +
                       obj.name +
                       '\n\tstatus: ' +
                       obj.status +
                       '\n\tchallenge: ' + chall );
        } )
        .catch( err => { console.log(err.toString()) } );
      }

      if (cmd == 'setCandidate') {
        let name = process.argv[5];
        let challenge = process.argv[6];
        let stat = process.argv[7];

        con.methods.setCandidate( name, challenge, stat )
        .send( {from:eb, gas:300000, gasPrice:MYGASPRICE} )
        .catch( err => { console.log(err.toString())} );
      }

      if (cmd == 'setRunning') {
        let flag = process.argv[5];

        con.methods.setRunning( flag )
        .send( {from:eb, gas:100000, gasPrice:MYGASPRICE} )
        .catch( err => { console.log(err.toString())} );
      }

    }
} );

