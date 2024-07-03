// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/OracleReader.sol";

contract OracleReaderTest is Test {
    OracleReader public yourContract;

    function setUp() public {
        yourContract = new OracleReader(address(0), address(1));
    }

    function testMessageOnDeployment() public view {
        // require(
        //     keccak256(bytes(yourContract.greeting()))
        //         == keccak256("Building Unstoppable Apps!!!")
        // );
    }

    // function testSetNewMessage() public {
        // yourContract.setGreeting("Learn Scaffold-ETH 2! :)");
        // require(
        //     keccak256(bytes(yourContract.greeting()))
        //         == keccak256("Learn Scaffold-ETH 2! :)")
        // );
    // }
}
