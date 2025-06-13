'use client'; // It's a client component because it fetches data

import { useState, useEffect } from 'react';

// A utility function to format the date nicely
const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
};

export default function TransactionDetails({ id }: { id: string }) {
  const [data, setData] = useState<any | null>(null); // Using 'any' for simplicity with the complex RPC response
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/transaction/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Transaction not found or API error');
        return res.json();
      })
      .then(result => setData(result))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div className="text-center text-lg text-gray-400">Loading transaction details...</div>;
  }

  if (error || !data) {
    return <div className="text-red-500 text-center p-8 bg-light-bg rounded-lg">Error: Could not load transaction.</div>;
  }

  const status = data.meta.err === null ? 'Success' : 'Failed';
  const feeInSol = data.meta.fee / 10**9; // Lamports to SOL

  return (
    <div className="space-y-6">
      <div className="bg-light-bg border border-border-color rounded-lg p-6">
        <h2 className="text-sm text-gray-400 mb-2">Transaction Signature</h2>
        <p className="text-xl md:text-2xl font-bold break-all">{id}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-light-bg border border-border-color rounded-lg p-6">
          <h3 className="text-sm text-gray-400 mb-2">Status</h3>
          <p className={`text-xl font-bold ${status === 'Success' ? 'text-solana-green' : 'text-red-500'}`}>{status}</p>
        </div>
        <div className="bg-light-bg border border-border-color rounded-lg p-6">
          <h3 className="text-sm text-gray-400 mb-2">Timestamp (UTC)</h3>
          <p className="text-xl font-bold">{formatDate(data.blockTime)}</p>
        </div>
        <div className="bg-light-bg border border-border-color rounded-lg p-6">
          <h3 className="text-sm text-gray-400 mb-2">Slot</h3>
          <p className="text-xl font-bold font-mono">{data.slot}</p>
        </div>
        <div className="bg-light-bg border border-border-color rounded-lg p-6">
          <h3 className="text-sm text-gray-400 mb-2">Fee</h3>
          <p className="text-xl font-bold font-mono">{feeInSol.toFixed(9)} SOL</p>
        </div>
      </div>

      <div className="bg-light-bg border border-border-color rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Transaction Logs</h3>
          <div className="bg-dark-bg p-4 rounded-md font-mono text-xs overflow-x-auto">
            {data.meta.logMessages.map((log: string, index: number) => (
                <p key={index} className="whitespace-pre-wrap">{log}</p>
            ))}
          </div>
      </div>
    </div>
  );
}

