pragma solidity ^0.8.0;
import "./DeXcelPair.sol";

contract InitCodeHashGenerator {
    function getInitCodeHash() external pure returns (bytes32) {
        bytes memory initCode = type(DeXcelPair).creationCode;
        return keccak256(initCode);
    }
}