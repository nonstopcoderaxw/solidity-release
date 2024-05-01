// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Vault} from "src/solidity-by-example/hacks/AccessPrivateState.sol";

// cmd: forge test -C src/solidity-by-example/hacks/AccessPrivateStateTest.sol -vv --match-contract AccessPrivateStateTest
contract AccessPrivateStateTest is Test {
    Vault public vault;

    function setUp() public {
        vault = new Vault("_pw_");
    }

    function test_addUser() public {
        console.logString("view count");
        console.logUint(vault.count());
    }
}
