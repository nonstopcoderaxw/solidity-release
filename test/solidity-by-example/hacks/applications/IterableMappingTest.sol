// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {IterableMapping} from "src/solidity-by-example/applications/IterableMapping.sol";

contract IterableMappingTest is Test {
    address[] keys;

    function setUp() public {
        keys.push(address(1));
        keys.push(address(2));
        keys.push(address(3));
    }

    function test_DeleteDynamicArrayElement() public {
        console.log("keys length", keys.length);
        console.log("keys1", keys[1]);

        delete keys[1];
        // this won't change keys length after delete
        console.log("keys length", keys.length);
        console.log("keys1", keys[1]);
    }
}
