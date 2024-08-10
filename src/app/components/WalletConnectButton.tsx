'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';

const WalletConnectButton = () => {
  const { address, connect } = useAuth();

  return (
    <div>
      {address ? (
        <span className="text-white">Connected: {address}</span>
      ) : (
        <button onClick={connect} className="px-4 py-2 text-white bg-blue-600 rounded-lg">
          Connect wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnectButton;