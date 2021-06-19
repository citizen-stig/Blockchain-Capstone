const ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const name = "Test Token";
    const symbol = "TTK";
    const baseUri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"
    const account_one = accounts[0];
    const account_two = accounts[1];

    let contract;

    beforeEach(async function() {
        contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});

    })

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            // console.log("________");
            // this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});
            let res = await contract.mint(account_two, 123, {from: account_one});
            // TODO: mint multiple tokens
        })

        it('should return total supply', async function () {

        })

        it('should get token balance', async function () {

        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {

        })

        it('should transfer token from one owner to another', async function () {

        })
    });

    describe('have ownership properties', function () {
        // beforeEach(async function () {
        //     this.;
        // })

        it('should fail when minting when address is not contract owner', async function () {

        })

        it('should return contract owner', async function () {

        })

    });
})
