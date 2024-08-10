import { ethers } from 'ethers';

export const connectToMetamask = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { provider, signer, address };
    } catch (error) {
      throw new Error('Failed to connect to Metamask');
    }
  } else {
    throw new Error('Metamask is not installed');
  }
};