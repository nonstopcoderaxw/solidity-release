// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {TestSlot} from "src/solidity-by-example/applications/WriteToAnySlot.sol";

contract WriteToAnySlotTest is Test {
    TestSlot public testSlot;

    function setUp() public {
        testSlot = new TestSlot();
    }

    function test_1() public {
        testSlot.write(address(1111));
        console.log("get slot value", testSlot.get());

        console.log("value", testSlot.get2());
    }
}
