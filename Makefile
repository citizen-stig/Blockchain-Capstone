.PHONY: test
init:
	npm install && truffle compile

ganache:
	ganache-cli

dev:
	truffle deploy
	npm run dev

test:
	truffle test
