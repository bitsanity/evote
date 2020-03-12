var STARTCTRL = (function() {

  function initStartTab() {

    STARTMODEL.currentUserBalance( bal => {
      STARTVIEW.setUserFields(
        STARTMODEL.getUser().address, bal, STARTMODEL.getUser().nonce );
    } );
  }

  function wsUrlChanged() {
    let url = STARTVIEW.getWSUrl();
    MODEL.connect( url,
      (errmsg) => {
        console.log( errmsg );
        STARTVIEW.connection( false );
      },
      (res) => {
        STARTVIEW.connection( true );
        STARTVIEW.setGasPrice( res );
        ENS.init();
      }
    );
  }

  function ingestRawKey() {
    let hexstr = STARTVIEW.getRawKey();
    STARTMODEL.loadUserByRawKey( hexstr,
      err => { STARTVIEW.rawKeyLoaded( false ); },
      () => {
        STARTVIEW.rawKeyLoaded( true );
        setTimeout( initStartTab, 100 ); // yield thread
      }
    );
  }

  function ingestGeth() {
    let gethobjstr = STARTVIEW.getGethVal();
    let passphrase = STARTVIEW.getPassphraseFromUser();

    STARTMODEL.loadUserByGeth( gethobjstr, passphrase,
      err => { STARTVIEW.gethObjLoaded( false ) },
      () => {
        STARTVIEW.gethObjLoaded( true );
        setTimeout( initStartTab, 100 ); // yield thread
      }
    );
  }

  return {
    initStartTab:initStartTab,
    wsUrlChanged:wsUrlChanged,
    ingestRawKey:ingestRawKey,
    ingestGeth:ingestGeth
  };

})();

