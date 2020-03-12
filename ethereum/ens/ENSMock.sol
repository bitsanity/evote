pragma solidity >= 0.5.0;

contract ENSMock {

  // node => X mappings
  mapping( bytes32=>address ) public owners;
  mapping( bytes32 => address ) public addr;

  function owner(bytes32 _node) external view returns (address) {
    return owners[_node];
  }

  function setSubnodeOwner(bytes32 _node, bytes32 _label, address _owner)
  external {
    bytes32 subnode = keccak256( abi.encodePacked(_node, _label) );
    owners[subnode] = _owner;
  }

  function resolver(bytes32 _node) external view returns (address) {
    require( _node != bytes32(0x0) );
    return address(this);
  }

  function setAddr( bytes32 _node, address _newAddr ) external {
    addr[_node] = _newAddr;
  }
}
