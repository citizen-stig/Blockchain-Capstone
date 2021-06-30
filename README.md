# Udacity Blockchain Capstone

The capstone project is build a decentralized housing product.

## How to run

1. Run ganache: `make ganache`. Keep it running
1. To run tests, in new terminal execute: `make test`

To deploy and mint:

1. Place infura secret key into `.secret` file
1. Run `truffle deploy --network rinkeby`
1. Get smart contract address and replace it in mint.js on line 9
1. Run mint.js

```
node scripts/mint.js \
    ../test/proof_1.json \
    ../test/proof_3.json \
    ../test/proof_4.json \
    ../test/proof_5.json \
    ../test/proof_6.json \
    ../test/proof_7.json \
    ../test/proof_8.json \
    ../test/proof_9.json \
    ../test/proof_10.json \
    ../test/proof_11.json \
    ../test/proof_12.json
```

This will mint several tokens with precomputed proof.

## Addresses

 * Contract [0x7C3F14509531897A76069EAC5Ce1182Aa054e9d2](https://rinkeby.etherscan.io/address/0x7C3F14509531897A76069EAC5Ce1182Aa054e9d2) on Rinkeby
 * Contract Abi's
 * OpenSea [MarketPlace Storefront](https://testnets.opensea.io/collection/golub-blockchain-capstone-project):
    * Transfer of [Asset "Luxury Home"](https://testnets.opensea.io/assets/0x7c3f14509531897a76069eac5ce1182aa054e9d2/2): [0x7880a41befd16560992dda8b332ef7aebff8db845a91908af0e01c895423dc6a](https://rinkeby.etherscan.io/tx/0x7880a41befd16560992dda8b332ef7aebff8db845a91908af0e01c895423dc6a)

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
