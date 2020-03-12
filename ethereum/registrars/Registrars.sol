pragma solidity ^0.5.0;

// Here, the CEO ("Chief Electoral Officer") is the public Ethereum account of a
// person responsible for the administration of elections, referendum and other
// aspects of an electoral system.

contract HasCEO {

  modifier isCEO {
    require( msg.sender == ceo, "!CEO" );
    _;
  }

  address public ceo;

  constructor() public {
    ceo = msg.sender;
  }

  function appoint( address _newCEO ) public isCEO {
    ceo = _newCEO;
  }
}

// Registrars is the list of Ethereum accounts held by people responsible for
// enrolling voters in the electoral system. This includes responsibility for
// verifying that voters are legally allowed to vote.

contract Registrars is HasCEO {

  event Registrar( address indexed registrar, bool enabled );

  string public ensname;
  mapping( address => bool ) public registrars;

  constructor ( string memory _ensname ) public {
    ensname = _ensname;
  }

  function setRegistrar( address _registrar, bool _enabled ) external isCEO {
    registrars[_registrar] = _enabled;
    emit Registrar( _registrar, _enabled );
  }

}
