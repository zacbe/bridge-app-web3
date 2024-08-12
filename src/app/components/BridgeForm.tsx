
'use client';

import React, { useState } from 'react';
import { submitForm } from '@/app/actions/submitBridgeForm';
import { useAuth } from '@/context/AuthContext';

enum SupportedNetworks {
  arbitrumSepolia = 'ARBITRUM',
  optimismSepolia = 'OPTIMISM',
}


const BridgeForm = () => {
  const [amount, setAmount] = useState('');
  const [sourceNetwork, setSourceNetwork] = useState<SupportedNetworks>(SupportedNetworks.arbitrumSepolia);
  const [destinationNetwork, setDestinationNetwork] = useState<SupportedNetworks>(SupportedNetworks.optimismSepolia);
  const [error, setError] = useState<string | null>(null);
  const { signer } = useAuth();

  const handleSubmit = async (action: string) => {
    setError(null);

    if (!amount || !sourceNetwork || !destinationNetwork) {
      alert('Please fill out all fields.');
      return;
    }

    if (sourceNetwork === destinationNetwork) {
      setError(`Bridge cannot be made between the same network.`);
      return;
    }

    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('sourceNetwork', sourceNetwork);
    formData.append('destinationNetwork', destinationNetwork);

    try {
      if (!signer) throw new Error('Wallet is not connected');

      await submitForm(formData, signer);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while submitting the form.');
    }
  };

  return (
    <div className=" bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className='text-white text-xl p-4'>Bridge Operations</h1>
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Amount to Send:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              // Check if the value is a valid integer and is non-negative
              if (/^\d*$/.test(value)) {
                setAmount(value);
              }
            }}
            className="w-full p-2 text-white bg-gray-700 rounded-lg"
            placeholder="Amount"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-lg mb-2">From Chain:</label>
          <select
            value={sourceNetwork}
            onChange={(e) => setSourceNetwork(e.target.value as SupportedNetworks)}
            className="w-full p-2 text-white bg-gray-700 rounded-lg"
          >
            <option value="ARBITRUM">Arbitrum Sepolia</option>
            <option value="OPTIMISM">Optimism Sepolia</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white text-lg mb-2">To Chain:</label>
          <select
            value={destinationNetwork}
            onChange={(e) => setDestinationNetwork(e.target.value as SupportedNetworks)}
            className="w-full p-2 text-white bg-gray-700 rounded-lg"
          >
            <option value="OPTIMISM">Optimism Sepolia</option>
            <option value="ARBITRUM">Arbitrum Sepolia</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="w-full mr-2 px-4 py-2 text-white bg-blue-500 rounded-lg"
            onClick={() => handleSubmit('bridge')}
          >
            Bridge Tokens
          </button>

   
        </div>
      </div>
    </div>
  );
};

export default BridgeForm;