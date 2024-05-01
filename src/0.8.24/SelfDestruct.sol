// // SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

contract SelfDestructOnCancun {
    uint256 public a = 123;

    constructor() payable {}

    function updateA(uint256 _a) external {
        a = _a;
    }

    function kill(address payable to) external {
        selfdestruct(to);
    }
}
