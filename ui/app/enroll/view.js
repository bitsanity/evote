var ENROLLVIEW = (function() {

  function getVoterListValue() {
    return $( "#VoterListValue" ).val();
  }

  function resolvedVoterListSCA( isGood ) {
    let fld = $( "#VoterListValue" );

    if (isGood) {
      fld.removeClass( "reddata" );
      fld.addClass( "data" );
    }
    else {
      fld.removeClass( "data" );
      fld.addClass( "reddata" );
    }
  }

  function clearChallenge() {

    $( "#ResponseArea" ).hide();
    $( "#ScanResult" ).hide();
    $( "#ChallengeArea" ).empty();
    $( "#ChallengeArea" ).show();

    setEnrollEnabled( false );
  }

  function showQRCode( txtb64 ) {

    $( "#ResponseArea" ).hide();
    $( "#ScanResult" ).hide();
    $( "#ChallengeArea" ).empty();
    $( "#ChallengeArea" ).show();

    setEnrollEnabled( false );

    let qrcode = new QRCode( "ChallengeArea", {
      text: txtb64,
      width: 450,
      height: 450,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    } );
  }

  function showCameraOutput() {

    $( "#ScanResult" ).hide();
    $( "#ChallengeArea" ).hide();
    $( "#ResponseArea" ).show();

    setEnrollEnabled( false );
  }

  function prepScanResult() {
    $( "#ChallengeArea" ).hide();
    $( "#ResponseArea" ).hide();
    $( "#ScanResult" ).show();
    setEnrollEnabled( true );
  }

  function showScanResult( pubkeyhex ) {

    prepScanResult();

    let canvas = document.getElementById( "ScanResultCanvas" );
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect( 0, 0, 500, 500 );
    ctx.font = "14px monospace";
    ctx.fillStyle = "darkgreen";

    ctx.fillText( pubkeyhex.substring(0,2), 20, 30 );
    let psz = (pubkeyhex.length - 2) / 2;
    ctx.fillText( pubkeyhex.substring(2, 2 + psz), 20, 50 );
    ctx.fillText( pubkeyhex.substring(2 + psz), 20, 70 );
  }

  function setEnrollEnabled( enable ) {
    $( "#EnrollVoterButton" ).prop( "disabled", !enable );
  }

  return {
    getVoterListValue:getVoterListValue,
    resolvedVoterListSCA:resolvedVoterListSCA,
    clearChallenge:clearChallenge,
    showQRCode:showQRCode,
    showCameraOutput:showCameraOutput,
    prepScanResult:prepScanResult,
    showScanResult:showScanResult
  };

})();

