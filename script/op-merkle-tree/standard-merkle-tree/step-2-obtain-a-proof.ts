import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";

// (1)
const tree = StandardMerkleTree.load(
  JSON.parse(
    fs.readFileSync(
      "script/op-merkle-tree/standard-merkle-tree/tree.json",
      "utf8"
    )
  )
);
console.log("tree", tree);
// (2)
for (const [i, v] of tree.entries()) {
  if (v[0] === "0x1111111111111111111111111111111111111111") {
    // (3)
    const proof = tree.getProof(i);
    console.log("Value:", v);
    console.log("Proof:", proof);
  }
}
