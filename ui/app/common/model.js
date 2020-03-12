var MODEL = (function() {

  var web3;

  function Ξconnect( wsurl, errcb, rescb ) {

    web3 = new Web3( new Web3.providers.WebsocketProvider(wsurl) );
    web3.eth.getGasPrice()
    .then( gp => {
      rescb( gp );
    } )
    .catch( err => {
      errcb( err );
    } );
  }

  function ΞgetWeb3() {
    return web3;
  }

  function Ξkeccak( something ) {
    return web3.utils.sha3( something );
  }

  function ΞbytesToHex( bytes ) {
    return web3.utils.bytesToHex( bytes );
  }

  function ΞhexToBytes( hexstr ) {
    return web3.utils.hexToBytes( hexstr );
  }

  return {
    connect:Ξconnect,
    getWeb3:ΞgetWeb3,
    keccak:Ξkeccak,
    bytesToHex:ΞbytesToHex,
    hexToBytes:ΞhexToBytes
  };

})();
