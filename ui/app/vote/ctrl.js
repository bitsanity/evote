var VOTECTRL = (function() {

  var Candidates = {}; // { name1:challenge1, name2:challenge2 }
  var currentVote;

  function initVoteTab() {
    VOTEVIEW.clearChallenge();
    VOTEVIEW.setVoteEnabled( false );

    global.pauseQRScanner();
    global.initVoteVideo();
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
      }
    );
  }

  function makeCandidateList() {
    VOTEMODEL.candidates(
      err => {
        console.log( 'makeCandidateList: ' + err );
      },
      (nmlist) => {
        VOTEVIEW.candidateNames( nmlist );
      } );
  }

  function candidateSelected() {
    let nm = VOTEVIEW.getSelectedCandidate();
    if (!nm || nm.length == 0) {
      VOTEVIEW.clearChallenge();
      return;
    }

    // write qr
    let challenge = VOTEMODEL.challengeFor( nm );
    VOTEVIEW.showQRCode( challenge );
    global.pauseQRScanner();
  }

  function scanForVote() {
    VOTEVIEW.showCameraOutput();

    global.setScannerCallback( res => {
      currentVote = res;
      global.pauseQRScanner();
      VOTEVIEW.showScanResult( res );
      VOTEVIEW.setVoteEnabled( true );
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
    candidateSelected:candidateSelected,
    scanForVote:scanForVote,
    doVote:doVote
  };

})();

