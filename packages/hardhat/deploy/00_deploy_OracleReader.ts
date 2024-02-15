import * as dotenv from "dotenv";
dotenv.config();
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract, getAddress } from "ethers";

/**
 * Deploys a contract named "OracleReader" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployOracleReader: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Read oracle and self-kisser addresses from .env file.
  const oracle = getAddress(process.env.CHRONICLE_ORACLE || "");
  const selfKisser = getAddress(process.env.SELF_KISSER || "");

  await deploy("OracleReader", {
    from: deployer,
    // Contract constructor arguments
    args: [oracle, selfKisser],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const oracleReader = await hre.ethers.getContract<Contract>("OracleReader", deployer);
  console.log("👋 The current oracle's value is:", await oracleReader.read());
};

export default deployOracleReader;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags OracleReader
deployOracleReader.tags = ["OracleReader"];
