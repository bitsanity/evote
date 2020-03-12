var STRINGS = {};
var LANG = "";

var LABELS = (function() {
  'use strict';

  function setLabels()
  {
    LANG = $( "#LanguageCB" ).val();

    // header labels
    $( "#AddrLabel" ).html( STRINGS[LANG].AddrLabel );
    $( "#SkinLabel" ).html( STRINGS[LANG].SkinLabel );
    $( "#LanguageLabel" ).html( STRINGS[LANG].LanguageLabel );

    // tab button labels
    $( "#StartTabButton" ).html( STRINGS[LANG].StartTabButton );
    $( "#EnrollTabButton" ).html( STRINGS[LANG].EnrollTabButton );
    $( "#VoteTabButton" ).html( STRINGS[LANG].VoteTabButton );
    $( "#AboutTabButton" ).html( STRINGS[LANG].AboutTabButton );

    // start tab labels
    $( "#WSURLLabel" ).html( STRINGS[LANG].WSURLLabel );
    $( "#GasPriceLabel" ).html( STRINGS[LANG].GasPriceLabel );
    $( "#AddrLabel" ).html( STRINGS[LANG].AddrLabel );
    $( "#MyBalanceLabel" ).html( STRINGS[LANG].MyBalanceLabel );
    $( "#TxCountLabel" ).html( STRINGS[LANG].TxCountLabel );
    $( "#AddPrivateKeyLegend" ).html( STRINGS[LANG].AddPrivateKeyLegend );
    $( "#LoadRawKeyLabel" ).html( STRINGS[LANG].LoadRawKeyLabel );
    $( "#PasteGethFileLabel" ).html( STRINGS[LANG].PasteGethFileLabel );

    // enroll tab labels
    $( "#VoterListLabel" ).html( STRINGS[LANG].VoterListLabel );
    $( "#SCAENSLabel" ).html( STRINGS[LANG].SCAENSLabel );
    $( "#IDChallengeLabel" ).html( STRINGS[LANG].IDChallengeLabel );
    $( "#ChallengeButton" ).html( STRINGS[LANG].ChallengeButton );
    $( "#ScanButton" ).html( STRINGS[LANG].ScanButton );
    $( "#EnrollVoterButton" ).html( STRINGS[LANG].EnrollVoterButton );

    // vote tab labels
    $( "#VoteLabel" ).html( STRINGS[LANG].VoteLabel );
    $( "#SCAENSLabel2" ).html( STRINGS[LANG].SCAENSLabel );
    $( "#CandidateLabel" ).html( STRINGS[LANG].CandidateLabel );
    $( "#ScanVoteButton" ).html( STRINGS[LANG].ScanVoteButton );
    $( "#VoteButton" ).html( STRINGS[LANG].VoteButton );

    // about tab labels
    $( "#AboutTextArea" ).val( STRINGS[LANG].AboutText );
  }

  return {
    setLabels:setLabels
  };

})();
