'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import React from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { address, connect, disconnect } = useAuth();

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-700 shadow-sm border-b border-gray-800">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/gelato.svg"
            alt="Logo"
            width={82}
            height={160}
            className="mr-2"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/" className={pathname === '/' ? 'text-white font-medium' : 'text-orange-100'}>
          Home
        </Link>
        <div>
        {address ? (
            <>
              <button className="px-4 py-2 text-white bg-gray-600 rounded-lg" disabled>
                Connected
              </button>
              <button onClick={disconnect} className="ml-2 px-4 py-2 text-white bg-red-600 rounded-lg">
                Disconnect
              </button>
            </>
          ) : (
            <button onClick={connect} className="px-4 py-2 text-white bg-blue-600 rounded-lg">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}