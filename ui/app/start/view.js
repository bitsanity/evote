var STARTVIEW = (function() {

  function getWSUrl() {
    return $( "#WSURLValue" ).val();
  }

  function connection( isUp ) {
    let fld = $( "#WSURLValue" );

    if (isUp) {
      fld.attr( "class", "data" );
    }
    else {
      fld.attr( "class", "reddata" );
    }
  }

  function getRawKey() {
    return $( "#LoadRawKeyField" ).val();
  }

  function getGethVal() {
    return $( "#PasteGethFileField" ).val();
  }

  function getPassphraseFromUser() {
    return prompt( STRINGS[LANG].PassphrasePrompt );
  }

  function gasPrice() {
    return $( "#GasTextValue" ).val();
  }

  function setGasPrice( gprix ) {
    $( "#GasTextValue" ).val( gprix );
  }

  function setUserFields( addr, bal, nonce ) {
    $( "#MyBalanceValue" ).html( bal );
    $( "#AddrValue" ).html( addr );
    $( "#TxCountValue" ).html( nonce );
  }

  function rawKeyLoaded( isGood ) {
    let tab = $( "#StartTabButton" );
    let fld = $( "#LoadRawKeyField" );

    if (isGood) {
      tab.removeClass( "redtext" );
      fld.removeClass( "highlighted" );
      fld.val( "" );
    }
    else {
      fld.addClass( "highlighted" );
    }
  }

  function gethObjLoaded( isGood ) {
    let tab = $( "#StartTabButton" );
    let fld = $( "#PasteGethFileField" );

    if (isGood) {
      tab.removeClass( "redtext" );
      fld.removeClass( "highlighted" );
      fld.val( "" );
    }
    else {
      fld.addClass( "highlighted" );
    }
  }

  return {
    getWSUrl:getWSUrl,
    connection:connection,
    getRawKey:getRawKey,
    getGethVal:getGethVal,
    getPassphraseFromUser:getPassphraseFromUser,
    gasPrice:gasPrice,
    setGasPrice:setGasPrice,
    setUserFields:setUserFields,
    rawKeyLoaded:rawKeyLoaded,
    gethObjLoaded:gethObjLoaded
  };

})();

