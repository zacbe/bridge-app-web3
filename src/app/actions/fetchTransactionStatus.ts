import { ethers } from 'ethers';

const bridge_url = process.env.BRIDGE_BACKEND_URL || 'http://localhost:3001/api/v1/bridge';

export async function fetchTransactionStatus(transactionId: string, signer: ethers.JsonRpcSigner) {
  try {
    const address = await signer.getAddress();
    const message = `Fetching status for ${transactionId}`;
    const signature = await signer.signMessage(message);

    const url = new URL(`${bridge_url}/transactions/status/${transactionId}`);
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-address': address,
        'x-message': message,
        'x-signature': signature,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}