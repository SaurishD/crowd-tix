import { ethers } from "ethers";
import CrowdTixCompiled from "../../../build/contracts/CrowdTix.json";

const CONTRACT_ABI: any = CrowdTixCompiled.abi; // Your contract ABI
const NODE_URL = "http://127.0.0.1:8545";

export class InteractionHelper {
  private static provider: ethers.providers.JsonRpcProvider | null = null;
  private static contractReader: ethers.Contract | null = null;
  private static contractWriter: ethers.Contract | null = null;
  private static network: ethers.providers.Network | null = null;
  private static signer: ethers.providers.JsonRpcSigner | null = null;
  private static contractAddress: string =
    "0x90666411e5Db00aE8c3dEB05Cd59F7aB51dC84B3";
  constructor() {}

  public static getProvider() {
    this.provider = new ethers.providers.JsonRpcProvider(NODE_URL);
    return this.provider;
  }

  public static async getSigner() {
    if (this.signer != null) return this.signer;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    this.signer = provider.getSigner();
    return this.signer;
  }

  public static async getNetwork() {
    if (this.network != null) return this.network;
    return this.provider?.getNetwork();
  }

  public static async getContractReader() {
    const provider = await this.getProvider();
    if (this.contractReader != null) return this.contractReader;

    this.contractReader = new ethers.Contract(
      this.contractAddress,
      CONTRACT_ABI,
      provider
    );
    return this.contractReader;
  }

  public static async getContractWriter() {
    const signer = await this.getSigner();
    if (this.contractWriter != null) return this.contractWriter;

    this.contractWriter = new ethers.Contract(
      this.contractAddress,
      CONTRACT_ABI,
      signer
    );
    return this.contractWriter;
  }
}
