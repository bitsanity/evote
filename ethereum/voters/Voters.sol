pragma solidity ^0.5.0;

// External contract needed to define what address(es) may enroll voters

interface Registrars {
  function registrars( address ) external view returns (bool);
}

// List of public keys for persons legally allowed to vote in an electoral
// system. These are Elliptic Curve (secp256k1) public keys either 33-byte
// compressed form or 65-byte uncompressed form. Storing the long, uncompressed
// form is ok, but more expensive.

contract Voters {

  Registrars public regs;
  string public ensname;
  mapping( bytes => bool ) public voters;

  constructor ( string memory _ensname, Registrars _regs ) public {
    ensname = _ensname;
    regs = _regs;
  }

  function enroll( bytes calldata _pubkey ) external {
    require( regs.registrars(msg.sender), "caller is not a Registrar" );
    require( _pubkey.length == 33 || _pubkey.length == 65, "bad pubkey" );

    voters[_pubkey] = true;
  }

}

