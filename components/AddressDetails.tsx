'use client'; // This directive is crucial! It marks this as a Client Component.

import { useState, useEffect } from 'react';

// Define the shape of the data we expect to receive
type AddressData = {
  address: string;
  balance: number;
  signatures: string[];
};

export default function AddressDetails({ id }: { id: string }) {
  const [data, setData] = useState<AddressData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from our own API route
    fetch(`/api/lookup/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]); // Re-run this effect if the ID changes

  if (isLoading) {
    return <div className="text-center text-lg text-gray-400">Loading wallet data...</div>;
  }

  if (error || !data) {
    return <div className="text-red-500 text-center p-8 bg-light-bg rounded-lg">Error: Could not load wallet details.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-light-bg border border-border-color rounded-lg p-6">
        <h2 className="text-sm text-gray-400 mb-2">Wallet Address</h2>
        <p className="text-2xl font-bold break-all">{data.address}</p>
      </div>
      <div className="bg-light-bg border border-border-color rounded-lg p-6">
        <h3 className="text-sm text-gray-400 mb-2">SOL Balance</h3>
        <p className="text-3xl font-mono text-solana-green">{data.balance.toFixed(6)} SOL</p>
      </div>
      <div className="bg-light-bg border border-border-color rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions (Last 15)</h3>
        <ul className="space-y-2 font-mono text-sm">
          {data.signatures.map((sig) => (
            <li key={sig} className="p-3 bg-dark-bg rounded-md truncate hover:bg-border-color">
              <a href={`/tx/${sig}`} className="hover:text-solana-green">{sig}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

