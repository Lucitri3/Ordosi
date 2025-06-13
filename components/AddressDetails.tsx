'use client';

import { useState, useEffect } from 'react';
import { Wallet, Landmark, History } from 'lucide-react';

function InfoCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// This line MUST have "export default"
export default function AddressDetails({ id }: { id: string }) {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/lookup/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(result => setData(result))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div className="text-center text-lg text-text-secondary">Loading wallet data...</div>;
  }

  if (error || !data) {
    return <div className="text-red-500 text-center p-8 bg-surface rounded-lg">Error: Could not load wallet details.</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <InfoCard title="Wallet Address" icon={<Wallet className="text-primary" />}>
        <p className="text-lg md:text-xl font-mono break-all text-text-secondary">{data.address}</p>
      </InfoCard>

      <InfoCard title="SOL Balance" icon={<Landmark className="text-secondary" />}>
         <p className="text-3xl font-bold text-text-primary">{data.balance.toFixed(6)} <span className="text-xl text-secondary">SOL</span></p>
      </InfoCard>

      <InfoCard title="Recent History" icon={<History className="text-primary" />}>
        <ul className="space-y-2 font-mono text-sm">
          {data.signatures.map((sig) => (
            <li key={sig} className="p-3 bg-background rounded-md truncate hover:bg-border transition-colors">
              <a href={`/tx/${sig}`} className="text-text-secondary hover:text-primary">{sig}</a>
            </li>
          ))}
        </ul>
      </InfoCard>
    </div>
  );
}

