var VOTEVIEW = (function() {

  function clearChallenge() {
    $( "#VoteResponseArea" ).hide();
    $( "#VoteScanResult" ).hide();
    $( "#VoteChallengeArea" ).empty();
    $( "#VoteChallengeArea" ).show();
  }

  function getVoteName() {
    return $( "#VoteValue" ).val();
  }

  function resolvedVoteSCA( isGood ) {
    let fld = $( "#VoteValue" );

    if (isGood) {
      fld.removeClass( "reddata" );
      fld.addClass( "data" );
    }
    else {
      fld.removeClass( "data" );
      fld.addClass( "reddata" );
    }
  }

  function candidateNames( names ) {
    let combobox = document.getElementById( "CandidateSelect" );
    for (let ii = combobox.options.length - 1; ii >= 0 ; ii--)
      combobox.remove( ii );

    if (!names || names.length == 0)
      return;

    let op = document.createElement("option");
    op.text = "";
    combobox.add( op );

    for (ii = 0; ii < names.length; ii++) {
      op = document.createElement("option");
      op.text = names[ii];
      combobox.add( op );
    }
  }

  function getSelectedCandidate() {
    return $( "#CandidateSelect option:selected" ).text();
  }

  function showQRCode( chall ) {
    $( "#VoteResponseArea" ).hide();
    $( "#VoteScanResult" ).hide();
    $( "#VoteChallengeArea" ).empty();
    $( "#VoteChallengeArea" ).show();

    let qrcode = new QRCode( "VoteChallengeArea", {
      text: chall,
      width: 450,
      height: 450,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    } );
  }

  function showCameraOutput() {
    $( "#VoteScanResult" ).hide();
    $( "#VoteChallengeArea" ).hide();
    $( "#VoteResponseArea" ).show();
  }

  function showScanResult( res ) {
    $( "#VoteChallengeArea" ).hide();
    $( "#VoteResponseArea" ).hide();
    $( "#VoteScanResult" ).show();

    let canvas = document.getElementById( "VoteScanResultCanvas" );
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect( 0, 0, 500, 500 );
    ctx.font = "14px monospace";
    ctx.fillStyle = "darkgreen";
    ctx.fillText( "Got it, thanks", 20, 30 );
  }

  function setVoteEnabled( enable ) {
    $( "#VoteButton" ).prop( "disabled", !enable );
  }

  return {
    clearChallenge:clearChallenge,
    getVoteName:getVoteName,
    resolvedVoteSCA:resolvedVoteSCA,
    candidateNames:candidateNames,
    getSelectedCandidate:getSelectedCandidate,
    showQRCode:showQRCode,
    showCameraOutput:showCameraOutput,
    showScanResult:showScanResult,
    setVoteEnabled:setVoteEnabled
  };

})();

