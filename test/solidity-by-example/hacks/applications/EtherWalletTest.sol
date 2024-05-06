// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {EtherWallet} from "src/solidity-by-example/applications/EtherWallet.sol";

contract EtherWalletTest is Test {
    EtherWallet public etherWallet;
    address nonOwner = address(1);

    function setUp() public {
        etherWallet = new EtherWallet{value: 1 ether}();

        // print deployed address
        console.log("etherWallet address", address(etherWallet));
        // try_1. use owner
        console.log("owner user address", address(this));
        // try_2. use non-owner
        console.log("nonowner user address", nonOwner);
    }

    function testWithdrawSingle() public {
        console.log("balance of the ether wallet", address(etherWallet).balance);
        // widthdraw with large amt
        vm.expectRevert();
        etherWallet.withdraw(2 ether);
    }

    // function test__withdraw(uint256 amount) public {
    //     //console.logUint(amount);

    //     // try_1 .restrict amount <= contract amt
    //     // try_2 .restrict amount > contract amt to see if an error thrown
    // }
}
