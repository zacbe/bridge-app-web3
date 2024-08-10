import React, { useState } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid';
import { BridgeTransaction } from '@/types/bridgeTransaction';

const TableComponent = ({ transactions }: { transactions: BridgeTransaction[] }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-6)}`;
  };

  const truncateTimeStamp = (timestamp: string) => {
    return timestamp.slice(0, 10);
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Transaction Id</th>
            <th className="px-4 py-2">User Hash</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">To</th>
            <th className="px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: BridgeTransaction, index: number) => (
            <tr key={transaction.id} className="border-t border-gray-700">
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <span className="mr-2">{truncateHash(transaction.id)}</span>
                  <ClipboardDocumentIcon
                    onClick={() => copyToClipboard(transaction.id)}
                    className="w-4 h-4 ml-2 cursor-pointer text-gray-400 hover:text-white"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <span className="mr-2">{truncateHash(transaction.userAddress)}</span>
                  <ClipboardDocumentIcon
                    onClick={() => copyToClipboard(transaction.userAddress)}
                    className="w-4 h-4 ml-2 cursor-pointer text-gray-400 hover:text-white"
                  />
                </div>
              </td>
              <td className="px-4 py-2">{transaction.amount}</td>
              <td className="px-4 py-2">{transaction.from.network}</td>
              <td className="px-4 py-2">{transaction.to.network}</td>
              <td className="px-4 py-2">
                <span className="mr-2">{truncateTimeStamp(transaction.updatedAt)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableComponent;

