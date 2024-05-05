import { ethers } from "ethers";

// Check if MetaMask is installed and enabled
const requestAccount = async () => {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (error) {
    console.error("Error requesting account access:", error);
  }
};

// Call requestAccount function to prompt user for account access

// Example usage: Get the user's account address
const getUserAccount = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
    // Get signer (user's account)
    const signer = provider.getSigner();
    // Get user's address
    const userAddress = await signer.getAddress();
    console.log("User Address:", userAddress);
    return userAddress;
  } catch (error) {
    console.error("Error getting user account:", error);
  }
};
const getEthereumAccount = async () => {
  if (window.ethereum) {
    // Create an ethers.js provider using MetaMask
    requestAccount();
    // Request access to user's MetaMask account
    // Call getUserAccount to retrieve the user's account address
    return await getUserAccount();
  } else {
    console.error("MetaMask is not installed");
  }
};

export default getEthereumAccount;
