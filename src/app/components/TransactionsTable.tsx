'use client';

import React, { useState } from 'react';
import TableComponent from './TableComponent';
import { fetchTransactions } from '@/app/actions/fetchTransactions';
import { useAuth } from '@/context/AuthContext';
import { BridgeTransaction } from '@/types/bridgeTransaction';

const TransactionsTableComponent = () => {
  const [transactions, setTransactions] = useState<BridgeTransaction[]>([]);
  const { signer } = useAuth();

  const handleFetchTransactions = async () => {
    try {
      if (!signer) throw new Error('Wallet is not connected');
      const data = await fetchTransactions(signer);
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }

  return (
    <div className="w-full bg-gray-900 p-4">
      <h1 className="text-2xl text-white mb-4">Bridge Transactions</h1>
      <TableComponent transactions={transactions} />
      <div className="flex flex-col items-center justify-between mt-4">
        <button
          type="button"
          className="w-1/2 mr-2 px-4 py-2 text-white bg-blue-500 rounded-lg"
          onClick={handleFetchTransactions}
        >
          Fetch Transactions
        </button>
      </div>
    </div>
  );
};

export default TransactionsTableComponent;