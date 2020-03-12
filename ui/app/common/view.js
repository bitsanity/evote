var VIEW = (function() {
  'use strict';

  function openTab(evt, tabName) {
    var ii, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (ii = 0; ii < tabcontent.length; ii++) {
      tabcontent[ii].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (ii = 0; ii < tablinks.length; ii++) {
      tablinks[ii].className = tablinks[ii].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function userAlert( str ) {
    alert( str );
  }

  function userConfirm( msg ) {
    return confirm( msg );
  }

  function userPrompt( msg ) {
    return prompt( msg );
  }

  function userConfirmTransaction( command, acct, val, gas, gasprix ) {

    let msg = command + "\n" +
      "{from:" + acct + ",value:" + val + ",gas:" + gas + ",gasPrice:" +
      gasprix + "}";

    return confirm( msg );
  }

  return {
    openTab:openTab,
    userAlert:userAlert,
    userConfirm:userConfirm,
    userPrompt:userPrompt,
    userConfirmTransaction:userConfirmTransaction
  };

})();

