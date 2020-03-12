var VOTECTRL = (function() {

  var Candidates = {}; // { name1:challenge1, name2:challenge2 }
  var currentVote;

  function initVoteTab() {
    VOTEVIEW.clearChallenge();
    global.pauseQRScanner();
    useVote( VOTEVIEW.getVoteName() );
  }

  function useVote( ensname ) {
    VOTEMODEL.setVote( ensname,
    err => {
      VOTEVIEW.resolvedVoteSCA( false );
    },
    res => {
      VOTEVIEW.resolvedVoteSCA( true );
      makeCandidateList();
    } );
  }

  function makeCandidateList() {
    VOTEMODEL.candidates(
    err => {
      console.log( 'makeCandidateList: ' + err );
    },
    cdlist => {
      Candidates = cdlist;

      let nmlist = [];
      for( let ii = 0; ii < cdlist.length; ii++ ) {
        nmlist.push( cdlist[ii] );
      }
      VOTEVIEW.candidateNames( nmlist );
    } );
  }

  function scanForVote() {
    VOTEVIEW.showCameraOutput();

    global.setScannerCallback( res => {
      currentVote = res;
      global.pauseQRScanner();
      VOTEVIEW.showScanResult( res );
    } );

    global.startQRScanner();
  }

  function doVote() {
    VOTEMODEL.vote( currentVote,
      err => {
        VIEW.userAlert( err );
      }, res => {
        initVoteTab();
      }
    );
  }

  return {
    initVoteTab:initVoteTab,
    useVote:useVote,
    makeCandidateList:makeCandidateList,
    scanForVote:scanForVote,
    doVote:doVote
  };

})();

