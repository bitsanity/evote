var STARTMODEL = (function() {

  var User = {
    address: "",
    privkey : null,
    nonce: 0
  };

  function getUser() {
    return User;
  }

  function loadUserByGeth( gethfilecontents, passphrase, errcb, rescb ) {

    try {
      let gethobj = JSON.parse( gethfilecontents );
      let privk = global.keythereum.recover( passphrase, gethobj );
      privkeyToKeyObject( privk );
    }
    catch (err) {
      errcb( err.toString() );
      return;
    }
    rescb();
  }

  function loadUserByRawKey( keyhexstr, errcb, rescb ) {

    try {
      if (! keyhexstr || keyhexstr.length == 0) throw "Invalid key";

      if (/0x.*$/.test(keyhexstr))
        keyhexstr = keyhexstr.substring( 2 );

      let privKey = Buffer.from( keyhexstr, 'hex' );
      privkeyToKeyObject( privKey );
    }
    catch (err) {
      errcb( err.toString() );
      return;
    }
    rescb();
  }

  function privkeyToKeyObject( privkey ) {
    let addr = global.keythereum.privateKeyToAddress(privkey).toLowerCase();
    if (!addr || addr.length == 0) throw "Address fail";
    User.address = addr;
    User.privkey = privkey;
    refreshTxCount();
  }

  function currentGasPrice( rescb ) {
    MODEL.getWeb3().eth.getGasPrice()
    .then( gprix => {
      rescb( gprix );
    } )
    .catch( err => {
      console.log( err.toString() );
    } );
  }

  function currentUserBalance( rescb ) {
    if (!User.address || User.address.length == 0) return;

    MODEL.getWeb3().eth.getBalance( User.address )
    .then( bal => {
      rescb( MODEL.getWeb3().utils.fromWei(bal,'ether') );
    } )
    .catch( err => {
      User.balance = 0;
    } );
  }

  function refreshTxCount() {
    MODEL.getWeb3().eth.getTransactionCount( User.address )
    .then( cnt => {
      User.nonce = cnt;
    } )
    .catch( err => {
      User.nonce = -1;
    } );
  }

  return {
    getUser:getUser,
    currentUserBalance:currentUserBalance,
    currentGasPrice:currentGasPrice,
    loadUserByGeth:loadUserByGeth,
    loadUserByRawKey:loadUserByRawKey,
    refreshTxCount:refreshTxCount
  };

})();

