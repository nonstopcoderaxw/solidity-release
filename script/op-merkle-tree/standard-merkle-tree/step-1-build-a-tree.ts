import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import { ethers, AbiCoder } from "ethers";

// (1)
const values = [
  ["0x1111111111111111111111111111111111111111", "5000000000000000000"],
  ["0x2222222222222222222222222222222222222222", "2500000000000000000"],
  ["0x2222222222222222222222222222222222222223", "3500000000000000000"],
  ["0x2222222222222222222222222222222222222224", "4500000000000000000"],
  ["0x2222222222222222222222222222222222222225", "4500000000000000000"],
  ["0x2222222222222222222222222222222222222226", "4500000000000000000"],
  ["0x2222222222222222222222222222222222222227", "4500000000000000000"],
];

const concated = AbiCoder.defaultAbiCoder().encode(
  ["address", "uint256"],
  values[0]
);
console.log("concated", concated);

// the first leaf is double hashed
const hashOfLeaf = ethers.keccak256(ethers.keccak256(concated));
console.log("hash of concated", hashOfLeaf);

// (2)
const tree = StandardMerkleTree.of(values, ["address", "uint256"]);

// (3)
console.log("Merkle Root:", tree.root);

// (4)
fs.writeFileSync(
  "script/op-merkle-tree/standard-merkle-tree/tree.json",
  JSON.stringify(tree.dump())
);
