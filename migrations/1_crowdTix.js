var CrowdTix = artifacts.require("./CrowdTix.sol")

module.exports = function (deployer) {
    deployer.deploy(CrowdTix);
}