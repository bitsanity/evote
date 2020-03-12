var ENROLLMODEL = (function() {

  const VOTERSABI = '[{"constant":false,"inputs":[{"internalType":"bytes","name":"_pubkey","type":"bytes"}],"name":"enroll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"voters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"regs","outputs":[{"internalType":"contract Registrars","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ensname","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_ensname","type":"string"},{"internalType":"contract Registrars","name":"_regs","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes","name":"pubkey","type":"bytes"}],"name":"Voter","type":"event"}]';

  const ENROLLGAS = 100000;

  var VotersCon;

  function setVoterList( ensname, errcb, rescb ) {
    ENS.nameToAddress( ensname, sca => {

      if (sca) {
        let web3 = MODEL.getWeb3();
        VotersCon = new web3.eth.Contract( JSON.parse(VOTERSABI), sca );
        rescb( sca );
        return;
      }
      else {
        errcb( "no such name '" + ensname + "'" );
      }
    } );
  }

  async function enrollVoter( voterpubkeyhex, errcb, rescb ) {

    let web3 = MODEL.getWeb3();
    let usr = STARTMODEL.getUser();
    let calldata = VotersCon.methods.enroll( voterpubkeyhex ).encodeABI();

    let txobj = { nonce:usr.nonce++,
                  to:VotersCon.options.address,
                  data:calldata,
                  gas:ENROLLGAS,
                  gasPrice:STARTVIEW.gasPrice() };

    let priv = usr.privkey.toString('hex');
    let sigObj = await web3.eth.accounts.signTransaction( txobj, priv );
    web3.eth.sendSignedTransaction( sigObj.rawTransaction, (err,res) => {
      if (err) {
        errcb( err.toString() );
        return;
      }
      rescb( res );
    } );
  }

  return {
    setVoterList:setVoterList,
    enrollVoter:enrollVoter
  };

})();

