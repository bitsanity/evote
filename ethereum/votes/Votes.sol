pragma solidity ^0.6.0;

// Here, the CEO ("Chief Electoral Officer") is the public Ethereum account of
// someone responsible for the administration of elections, referendum and other
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

// Votes is a smart contract for one election. Voters vote by providing the
// response to their preferred candidate's challenge.

contract Votes is HasCEO {

  event Vote( string response );

  string public ensname;
  bool public running;

  struct Candidate {
    string name;
    bool status; // CEO can disable a Candidate, e.g. for moral turpitude
  }

  string[] public challenges; // an ADILOS challenge from each Candidate
  mapping( string => Candidate ) public candidates;

  constructor ( string memory _ensname ) public {
    ensname = _ensname;
  }

  function getChallengeCount() public view returns (uint) {
    return challenges.length;
  }

  function setRunning( bool _running ) external isCEO {
    running = _running;
  }

  function setCandidate( string calldata _name,
                         string calldata _challenge,
                         bool _status ) external isCEO {

    require( bytes(_name).length > 0 );

    if ( bytes(candidates[_challenge].name).length == 0) {
      challenges.push( _challenge );
    }

    candidates[_challenge].name = _name;
    candidates[_challenge].status = _status;
  }

  // note: As yet, no smart contract nor on-chain library exists that can
  //       verify secp256k1 ECDSA signatures using SHA256 hash function -
  //       verification and counting is done off-chain.

  // note: assume caller ensures voter is on the voters list prior to sending
  //       in the vote here. Votes made by unrecognized keys will not be
  //       valid/counted

  function vote( string calldata _response ) external {

    require( running, "election not running" );
    emit Vote( _response );
  }

}

