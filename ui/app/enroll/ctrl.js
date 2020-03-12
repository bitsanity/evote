var ENROLLCTRL = (function() {

  var challenge;
  var voter;

  function initEnrollTab() {

    challenge = "";
    voter = "";

    ENROLLVIEW.clearChallenge();
    global.pauseQRScanner();

    useVoterList( ENROLLVIEW.getVoterListValue() );
  }

  function useVoterList( ensname ) {
    ENROLLMODEL.setVoterList( ensname,
      err => {
        ENROLLVIEW.resolvedVoterListSCA( false );
    },
      res => {
        ENROLLVIEW.resolvedVoterListSCA( true );
    } );
  }

  function newChallenge() {

    challenge = ADILOS.newGatekeeperChallenge();
    console.log( 'challenge:\n' + challenge + '\n' );
    ENROLLVIEW.showQRCode( challenge );
    global.pauseQRScanner();
  }

  function scanForResponse() {

    ENROLLVIEW.showCameraOutput();

    global.setScannerCallback( res => {
      global.pauseQRScanner();
      let pubkey = getUserPubkey( res );
      if (pubkey) {
        voter = pubkey;
        ENROLLVIEW.showScanResult( pubkey );
      }
      else {
        VIEW.userAlert( res + "\nis invalid response to:\n" + challenge );
      }
    } );

    global.startQRScanner();
  }

  function getUserPubkey( result ) {

    if ( ADILOS.isValidResponseToChallenge(result, challenge) ) {
      let responseObj = ADILOS.parseSimpleADILOS( result );
      return responseObj.msg.toString('hex');
    }

    return null;
  }

  function enrollVoter() {
    let voterpubkeyhex = voter.toString('hex');

    ENROLLMODEL.enrollVoter(
      voterpubkeyhex,
      err => {
        VIEW.userAlert( err );
      }, res => {
        initEnrollTab();
      }
    );
  }

  return {
    initEnrollTab:initEnrollTab,
    useVoterList:useVoterList,
    newChallenge:newChallenge,
    scanForResponse:scanForResponse,
    getUserPubkey:getUserPubkey,
    enrollVoter:enrollVoter
  };

})();

