export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface NetworkTransactionDetails {
  transactionHash: string | null;
  network: 'ARBITRUM' | 'OPTIMISM';
  timestamp: string | null;
}

export interface BridgeTransaction {
  id: string;
  userAddress: string;
  amount: string;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
  from: NetworkTransactionDetails;
  to: NetworkTransactionDetails;
}