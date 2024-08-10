import { ethers } from 'ethers';

const bridge_url = process.env.BRIDGE_BACKEND_URL!;

export async function submitForm(formData: FormData, signer: ethers.JsonRpcSigner) {
  const amount = formData.get('amount');
  const sourceNetwork = formData.get('sourceNetwork');
  const destinationNetwork = formData.get('destinationNetwork');

  if (!amount || !sourceNetwork || !destinationNetwork) {
    throw new Error('Missing required fields');
  }

  console.log({amount, sourceNetwork, destinationNetwork})

  const payload = {
    amount,
    sourceNetwork,
    destinationNetwork,
  };

  try {
    const dataToSign = JSON.stringify(payload);
    const signature = await signer.signMessage(dataToSign);
    const address = await signer.getAddress();

    const url = new URL("http://localhost:3001/api/v1/bridge");
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-address': address,
        'x-message': dataToSign,
        'x-signature': signature,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error('Failed to bridge tokens');
    }

  } catch (error) {
    throw error
  }
}