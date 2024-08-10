'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ethers } from 'ethers';
import { connectToMetamask } from '../lib/auth';

interface AuthContextProps {
  address: string | null;
  signer: ethers.JsonRpcSigner | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  useEffect(() => {
    // Restore wallet connection on page reload
    const savedAddress = window.localStorage.getItem('walletAddress');
    if (savedAddress) {
      reconnect(savedAddress);
    }
  }, []);

  const reconnect = async (savedAddress: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      if (address.toLowerCase() === savedAddress.toLowerCase()) {
        setAddress(address);
        setSigner(signer);
      }
    } catch (error) {
      console.error('Failed to reconnect to Metamask:', error);
    }
  };

  const connect = async () => {
    try {
      const { signer, address } = await connectToMetamask();
      setAddress(address);
      setSigner(signer);
    } catch (error) {
      console.error('Metamask connection failed:', error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    window.localStorage.removeItem('walletAddress');
    setAddress(null);
  };

  return (
    <AuthContext.Provider value={{ address, signer, connect, disconnect }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};