/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")

task('accounts', "Prints the list of accounts", async(taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for(const acc in accounts){
    console.log(acc);
  }
})
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks:{
    hardhat: {}
  }
};
