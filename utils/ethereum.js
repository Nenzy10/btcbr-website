import { ethers } from 'ethers';

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create a provider using Web3
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      return { provider, address };
    } catch (err) {
      console.error("User denied account access", err);
      return { provider: null, address: null };
    }
  } else {
    console.error('Ethereum provider not found!');
    return { provider: null, address: null };
  }
};
