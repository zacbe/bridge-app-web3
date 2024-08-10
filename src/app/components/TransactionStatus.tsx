
'use client';

import React, { useState } from 'react';
import { fetchTransactionStatus } from '@/app/actions/fetchTransactionStatus';
import { useAuth } from '@/context/AuthContext';
import { BridgeTransaction } from '@/types/bridgeTransaction';

const TransactionStatusComponent = () => {
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<BridgeTransaction | null>(null);
  const { signer } = useAuth();

  const handleSubmit = async () => {
    setError(null);
    setTransaction(null); 

    if (!transactionId) {
      alert('Please enter a transaction ID.');
      return;
    }

    try {
      if (!signer) throw new Error('Wallet is not connected');

      const fetchedTransaction = await fetchTransactionStatus(transactionId, signer);
      setTransaction(fetchedTransaction);
      console.log('Transaction fetched successfully');
    } catch (error) {
      console.error('Error fetching transaction status:', error);
      setError('An error occurred while fetching the transaction status.');
    }
  };

  return (
    <div className=" bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className='text-white text-xl p-4'>Transaction Status </h1>
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Input transaction id</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full p-2 text-white bg-gray-700 rounded-lg"
            placeholder="transaction id"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg"
            onClick={handleSubmit}
          >
            Check Status
          </button>
        </div>
      </div>
      {transaction && (
        <div className="w-full max-w-md p-8 mt-4 bg-gray-800 rounded-lg text-white">
          <h2 className="text-lg mb-2">Transaction Details</h2>
          <p><strong>Transaction ID:</strong> {transaction.id}</p>
          <p><strong>User Address:</strong> {transaction.userAddress}</p>
          <p><strong>Amount:</strong> {transaction.amount}</p>
          <p><strong>From Network:</strong> {transaction.from.network}</p>
          <p><strong>To Network:</strong> {transaction.to.network}</p>
          <p><strong>Status:</strong> {transaction.status}</p>
          <p><strong>Created At:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(transaction.updatedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionStatusComponent;