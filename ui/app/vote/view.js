var VOTEVIEW = (function() {

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

  function candidateNames( namesObj ) {
    let sel = $( "#CandidateSelect" );

    for (let ii = sel.options.length - 1; ii >= 0 ; ii--)
      sel.remove( ii );

    for( let x in namesObj ) {
      let op = document.createElement("option");
      op.text = namesObj.x;
      sel.add( op );
    }
  }

  function showCameraOutput() {
    $( "#ResponseArea" ).show();
  }

  function showScanResult( res ) {
    $( "#ResponseArea" ).hide();
  }

  return {
    getVoteName:getVoteName,
    resolvedVoteSCA:resolvedVoteSCA,
    candidateNames:candidateNames,
    showCameraOutput:showCameraOutput,
    showScanResult:showScanResult
  };

})();

