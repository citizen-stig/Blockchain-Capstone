.PHONY: test
init:
	npm install && truffle compile

dev:
	truffle deploy
	npm run dev

test:
	truffle test
