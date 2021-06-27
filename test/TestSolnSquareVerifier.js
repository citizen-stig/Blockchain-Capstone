const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const SquareVerifier = artifacts.require('SquareVerifier');
const proof_one = require('./proof_1.json');
const proof_two = require('./proof_2.json');

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

contract("Test SolnSquareVerifier", accounts => {
    // const name = "Test Token";
    // const symbol = "TTK";
    let owner = accounts[0];
    let accountOne = accounts[1];
    let accountTwo = accounts[2];

    let squareVerifierContract;
    let solnSquareVerifier;

    beforeEach(async function () {
        squareVerifierContract = await SquareVerifier.new({from: owner});
        solnSquareVerifier = await SolnSquareVerifier.new(squareVerifierContract.address, {from: owner});
    });

    describe('Minting token', function () {

        it('should mint with correct solution', async function () {

            let result = await solnSquareVerifier.mint(accountOne, 1, proof_one.proof.a,
                proof_one.proof.b,
                proof_one.proof.c,
                proof_one.inputs);
            let logs = result.logs;
            assert.equal("SolutionAdded", logs[0].event);
            assert.equal("Transfer", logs[1].event);
            let ownerOfTokenIdOne = await solnSquareVerifier.ownerOf.call(1);
            assert.equal(accountOne, ownerOfTokenIdOne)
        });

        it('should fail with duplicate solution');
        it('should fail with wrong solution');
    });

});
