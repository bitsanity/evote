var VOTEMODEL = (function() {

  const VOTEABI = '[{"constant":false,"inputs":[{"internalType":"address","name":"_newCEO","type":"address"}],"name":"appoint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"bytes","name":"_challenge","type":"bytes"},{"internalType":"bool","name":"_status","type":"bool"}],"name":"setCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"challenges","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ceo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"candidates","outputs":[{"internalType":"bytes","name":"challenge","type":"bytes"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"running","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"_running","type":"bool"}],"name":"setRunning","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ensname","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes","name":"_response","type":"bytes"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_ensname","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes","name":"response","type":"bytes"}],"name":"Vote","type":"event"}]';

  const VOTEGAS = 100000;

  var VoteCon;

  function setVote( ensname, errcb, rescb ) {
    ENS.nameToAddress( ensname, sca => {

      if (sca) {
        let web3 = MODEL.getWeb3();
        VoteCon = new web3.eth.Contract( JSON.parse(VOTEABI), sca );
        rescb( sca );
        return;
      }
      else {
        errcb( "no such name '" + ensname + "'" );
      }
    } );
  }

  // returns { name1:chall1, ... namen: challn }

  async function candidates( errcb, rescb ) {
    VoteCon.methods.candidates().call()
    .then( bytesarray => {

      let result = {};

      for( let ii = 0; ii < bytesarray.length; ii++ ) {
        let cobj = await VoteCon.methods.candidates( bytesarray[ii] );
        let nm = cobj[0];

        if (!nm || nm.length == 0)
          continue;

        result[nm] = bytesarray[ii];
      }

      rescb( result );
    } )
    .catch( err => {
      errcb( err.toString() );
    } );
  }

  function vote( votestr, errcb, rescb ) {
    let web3 = MODEL.getWeb3();
    let usr = STARTMODEL.getUser();
    let calldata = VoteCon.methods.vote( votestr ).encodeABI();

    let txobj = { nonce:usr.nonce++,
                  to:VoteCon.options.address,
                  data:calldata,
                  gas:VOTEGAS,
                  gasPrice:STARTVIEW.gasPrice() };

    let priv = usr.privkey.toString( 'hex' );
    let sigObj = await web3.eth.accounts.signTransaction( txobj, priv );
    web3.eth.sendSignedTransaction( sigObj.rawTransaction, (err, res) => {
      if (err) {
        errcb( err.toString() );
        return;
      }
      rescb( res );
    } );
  }

  return {
    setVote:setVote,
    candidates:candidates,
    vote:vote
  };

})();

