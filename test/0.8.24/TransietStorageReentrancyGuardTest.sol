// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {Generosity} from "../../src/0.8.24/TransietStorageReentrancyGuard.sol";

contract TransietStorageReentrancyGuardTest is Test {
    Generosity public generosity;

    function setUp() public {
        generosity = new Generosity();
        console.logString("Initial contract balance:");
        console.logUint(address(this).balance);

        //transfer balance
        payable(address(generosity)).transfer(1 ether);
        console.logString("Initial generosity contract balance:");
        console.logUint(address(generosity).balance);
    }

    function test_claimGift() public {
        generosity.claimGift();
    }

    receive() external payable {
        // Custom logic or simply leave it empty to accept plain transfers
    }
}
