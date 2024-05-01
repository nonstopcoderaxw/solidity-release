// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.24;

// contract Generosity {
//     mapping(address => bool) sentGifts;

//     modifier nonreentrant() {
//         assembly {
//             if tload(0) { revert(0, 0) }
//             tstore(0, 1)
//         }
//         _;
//         // Unlocks the guard, making the pattern composable.
//         // After the function exits, it can be called again, even in the same transaction.
//         assembly {
//             tstore(0, 0)
//         }
//     }

//     function claimGift() public nonreentrant {
//         require(address(this).balance >= 1 ether);
//         require(!sentGifts[msg.sender]);
//         (bool success,) = msg.sender.call{value: 1 ether}("");
//         require(success);

//         // In a reentrant function, doing this last would open up the vulnerability
//         sentGifts[msg.sender] = true;
//     }

//     receive() external payable {
//         // Custom logic or simply leave it empty to accept plain transfers
//     }
// }
