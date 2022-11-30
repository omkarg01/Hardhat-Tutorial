/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")
const ALCHEMY_API_KEY = "7ODs56f5EYW28UFYTCfNv0341y8Winox";
const GOERLI_PRIVATE_KEY = "ad8741f075ce0d99c6cab2999c870413f156796b0fcfc29c1377dd63a5183fa1";

module.exports = {
	solidity: "0.8.9",

	networks: {
		goerli:{
			url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
			accounts:[`0x${GOERLI_PRIVATE_KEY}`]
		}
	}
};
