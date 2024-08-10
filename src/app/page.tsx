import React from 'react';
import BridgeForm from '@/app/components/BridgeForm';
import TransactionsTableComponent from '@/app/components/TransactionsTable';
import MintForm from '@/app/components/MintForm';
import TransactionStatusComponent from '@/app/components/TransactionStatus';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <BridgeForm />
        <TransactionsTableComponent/>
        <TransactionStatusComponent/>
        <MintForm/>
      </div>
    </div>
  );
};

export default Home;