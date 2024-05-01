// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Attack, EtherGame} from "src/solidity-by-example/hacks/SelfDestructAttrack.sol";

// cmd: forge test -C src/solidity-by-example/hacks/SelfDestructAttrack.sol -vv --match-contract SelfDestructAttrackTeset
contract SelfDestructAttrackTeset is Test {
    EtherGame public etherGame;
    Attack public attack;

    function setUp() public {
        etherGame = new EtherGame();
        attack = new Attack(etherGame);
    }

    function test_Attack() public {
        // this will send the etherGame via selfDestruct even if the no receive() function
        // on the dest contract
        attack.attack{value: 5 ether}();

        //payable(address(etherGame)).transfer(1 ether);
        //(bool sent,) = payable(address(etherGame)).call{value: 1 ether}("");
        console.logString("balance of etherGame");
        console.logUint(address(etherGame).balance);
    }
}
