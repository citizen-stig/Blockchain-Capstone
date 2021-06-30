const web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraKey = "a878b1e124f0461d9f7a68749475250f";

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

const CONTRACT_DATA = require("../build/contracts/SolnSquareVerifier.json");
const CONTRACT_ADDRESS = "0x6ac3a159460Fc1FF41724d3283768077CD963add"

async function main() {
    console.log("Start minting...");
    let provider = new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`);
    // console.log(provider);
    let thisAddress = provider.addresses[0];
    const web3Instance = new web3(provider);

    const contract = new web3Instance.eth.Contract(
        CONTRACT_DATA.abi,
        CONTRACT_ADDRESS,
        {gasLimit: "1000000"}
    );


    // console.log(contract);
    console.log("Checking total supply")
    const totalSupply = await contract.methods
        .totalSupply()
        .call({from: thisAddress });
    console.log(`Total supply before: ${totalSupply}`);



    const args = process.argv.slice(2);
    console.log("To mint with these proofs:")
    console.log(args);

    let tokenId = Number(totalSupply) + 1;

    for (let i = 0; i < args.length; i++) {
        let jsonPath = args[i];
        const proofData = require(jsonPath);
        let response = await contract.methods
            .mint(
                thisAddress,
                tokenId,
                proofData.proof.a,
                proofData.proof.b,
                proofData.proof.c,
                proofData.inputs
            )
            .send({from: thisAddress });
        console.log(response);
        tokenId += 1;
    }

}

main().then(() => {
    console.log("Done minting.");
    process.exit(0);
})
