const hre = require("hardhat");
const fs = require("fs");

const tokens = (nToken) => {
  return ethers.utils.parseUnits(nToken.toString(), "ether");
};

async function main() {
  //Token contract
  const _initialSupply = tokens(50000000);

  const TokenContract = await hre.ethers.getContractFactory("TokenContract");
  const tokenContract = await TokenContract.deploy(_initialSupply);
  await tokenContract.deployed();

  console.log(`TokenContract: ${tokenContract.address}`);

  //token sale contract
  const _tokenPrice = tokens(1);

  const TokenSale = await hre.ethers.getContractFactory("TokenSale");
  const tokenSale = await TokenSale.deploy(tokenContract.address, _tokenPrice);
  await tokenSale.deployed();
  console.log(`TokenSale: ${tokenSale.address}`);

  fs.writeFileSync(
    "./config.js",
    `
  export const TokenContractAddress = "${tokenContract.address}"
  export const TokenSaleAddress = "${tokenSale.address}"
  export const ownerAddress = "${tokenSale.signer.address}"
  `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
