var ADILOS = (function() {

  function newGatekeeperChallenge() {

    let pvk = CRYPTO.randomBytes(32);
    SECP256K1.privateKeyVerify( pvk );

    let msg = Buffer.from( SECP256K1.publicKeyCreate(pvk) );
    let hash = CRYPTO.createHash( 'sha256' ).update( msg ).digest();
    let sigobj = SECP256K1.ecdsaSign( hash, pvk );
    let sig = Buffer.from( SECP256K1.signatureExport(sigobj.signature) );
    let sz = msg.length + sig.length;
    let sizebyte = Uint8Array.from( [sz] );
    let result = Buffer.concat( [sizebyte, msg, sig] );

    return result.toString( 'base64' );
  }

  function parseSimpleADILOS( strB64 ) {

    let rspbuff = Buffer.from( strB64, 'base64' );
    let hash, sig;

    if (rspbuff[1] == 0x02 || rspbuff[1] == 0x03) {
      // compressed pubkey
      pubk = rspbuff.slice( 1, 34 );
      sig = rspbuff.slice( 34 );
    } else if (rspbuff[1] == 0x04) {
      // uncompressed pubkey
      pubk = rspbuff.slice( 1, 66 );
      sig = rspbuff.slice( 66 );
    } else {
      throw "Invalid message.";
    }

    return { msg:pubk, sig:sig };
  }

  function isValidResponseToChallenge( respb64, challb64 ) {

    if (respb64 == challb64) throw "Mirror attack.";

    let rsp = parseSimpleADILOS( respb64 );
    if (null == rsp) throw "Invalid response.";
    let sig = SECP256K1.signatureImport( rsp.sig );

    let chg = parseSimpleADILOS( challb64 );
    if (null == chg) throw "Invalid challenge.";
    let hash = CRYPTO.createHash( 'sha256' ).update( chg.sig ).digest();

    return SECP256K1.ecdsaVerify( sig, hash, rsp.msg );
  }

  return {
    newGatekeeperChallenge:newGatekeeperChallenge,
    parseSimpleADILOS:parseSimpleADILOS,
    isValidResponseToChallenge:isValidResponseToChallenge
  };

})();

