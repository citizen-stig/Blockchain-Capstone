// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./Verifier.sol";
import "./ERC721Mintable.sol";

//TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {
    function verify(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public view returns (bool) {
        return true;
        // return super().verifyTx(a, b, c, input);
    }
}

contract SolnSquareVerifier is CustomERC721Token {
    Verifier private squareVerifier;

    mapping(bytes32 => bool) private unique_solutions;

    event SolutionAdded(bytes32 hash, address prover);

    constructor(
//        string memory name,
//        string memory symbol,
        address payable verifierAddress
    ) CustomERC721Token("Golub Blockchain Capstone Project", "GBPC") {
        squareVerifier = Verifier(verifierAddress);
    }

    function addSolution(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) internal {
        bytes32 hash = getSolutionHash(a, b, c, input);
        unique_solutions[hash] = true;
        emit SolutionAdded(hash, msg.sender);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSupply
    function mint(
        address to,
        uint256 tokenId,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public returns (bool) {
        require(
            !unique_solutions[getSolutionHash(a, b, c, input)],
            "Solution was used already used"
        );
        if (squareVerifier.verifyTx(a, b, c, input)) {
            addSolution(a, b, c, input);
            return super.mint(to, tokenId);
        }
        return false;
    }

    function getSolutionHash(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(a, b, c, input));
    }
}
