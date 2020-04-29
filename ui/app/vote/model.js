var VOTEMODEL = (function() {

  const VOTEABI = '[{"inputs":[{"internalType":"string","name":"_ensname","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"response","type":"string"}],"name":"Vote","type":"event"},{"inputs":[{"internalType":"address","name":"_newCEO","type":"address"}],"name":"appoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"candidates","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"status","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ceo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"challenges","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ensname","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getChallengeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"running","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_challenge","type":"string"},{"internalType":"bool","name":"_status","type":"bool"}],"name":"setCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_running","type":"bool"}],"name":"setRunning","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_response","type":"string"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

  const VOTEGAS = 100000;

  var VoteCon;

  var Candidates = {}; // { name:chall* }

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

  async function candidates( errcb, rescb ) {

    let result = [];

    try {
      let count = await VoteCon.methods.getChallengeCount().call();

      for (let ii = 0; ii < count; ii++) {
        let chall = await VoteCon.methods.challenges(ii).call();
        let cobj = await VoteCon.methods.candidates(chall).call();
        let nm = cobj[0];
        let st = cobj[1];
        if (nm && st) {
          result.push( nm );
          Candidates[nm] = chall;
        }
      }
      rescb( result );
    }
    catch( err ) {
      errcb( err.toString() );
    }
  }

  function challengeFor( name ) {
    return Candidates[name];
  }

  async function vote( votestr, errcb, rescb ) {
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
    challengeFor:challengeFor,
    vote:vote
  };

})();

