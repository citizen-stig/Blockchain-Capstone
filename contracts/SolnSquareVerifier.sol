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
        return super.verifyTx(a, b, c, input);
    }
}

contract SolnSquareVerifier is CustomERC721Token {
    SquareVerifier private squareVerifier;

    mapping(bytes32 => bool) private unique_solutions;

    event SolutionAdded(bytes32 hash, address prover);

    constructor(address payable verifierAddress)
        CustomERC721Token("Golub Blockchain Capstone Project", "GBPC")
    {
        squareVerifier = SquareVerifier(verifierAddress);
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
    ) public {
        require(
            !unique_solutions[getSolutionHash(a, b, c, input)],
            "Solution was used already used"
        );
        require(squareVerifier.verify(a, b, c, input), "Proof is invalid");
        addSolution(a, b, c, input);
        super._mintEnumerable(to, tokenId);
        super._setTokenURI(tokenId);
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
