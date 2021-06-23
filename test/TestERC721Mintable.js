const ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const name = "Test Token";
    const symbol = "TTK";
    const baseUri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"
    const accountOne = accounts[0];
    const accountTwo = accounts[1];
    const accountThree = accounts[2];
    const accountFour = accounts[3];
    // console.log({
    //     accountOne, accountTwo, accountThree, accountFour
    // })

    let contract;

    beforeEach(async function() {
        contract = await ERC721MintableComplete.new(name, symbol, {from: accountOne});
    })

    describe('match erc721 spec', function () {
        const tokenIdOne = 111;
        const tokenIdTwo = 222;
        beforeEach(async function () {
            // TODO: Check if it is minted
            let minted = await Promise.all([
                contract.mint(accountTwo, tokenIdOne, {from: accountOne}),
                contract.mint(accountThree, tokenIdTwo, {from: accountOne}),
            ]);
        })

        it('should return total supply', async function () {
            const totalSupply = await contract.totalSupply.call();
            assert.equal(2, totalSupply);
        })

        it('should get account balance', async function () {
            const balanceOfAccountOne = await contract.balanceOf(accountOne);
            assert.equal(0, balanceOfAccountOne);
            const balanceOfAccountTwo = await contract.balanceOf(accountTwo);
            assert.equal(1, balanceOfAccountTwo);
            const balanceOfAccountFour = await contract.balanceOf(accountFour);
            assert.equal(0, balanceOfAccountFour);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let tokenOneUri = await contract.tokenURI.call(tokenIdOne);
            assert.equal(baseUri + tokenIdOne, tokenOneUri);
        })

        it('should transfer token from one owner to another', async function () {
            await contract.approve(accountFour, tokenIdOne, {from: accountTwo});
            await contract.safeTransferFrom(accountTwo, accountFour, tokenIdOne, {from: accountFour});
            let ownerOfTokenIdOne = await contract.ownerOf.call(tokenIdOne);
            assert.equal(accountFour, ownerOfTokenIdOne);

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
