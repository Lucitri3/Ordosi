'use client';

import { useState, useEffect } from 'react';
import { Info, CheckCircle, XCircle, FileText, ArrowRight } from 'lucide-react';

const formatDate = (timestamp: number) => new Date(timestamp * 1000).toUTCString();

function DetailItem({ label, value, accent = false }: { label: string, value: React.ReactNode, accent?: boolean}) {
    return (
        <div className="bg-surface border border-border rounded-lg p-4">
            <p className="text-sm text-text-secondary mb-1">{label}</p>
            <p className={`text-lg font-semibold font-mono ${accent ? 'text-primary' : 'text-text-primary'}`}>{value}</p>
        </div>
    )
}

export default function TransactionDetails({ id }: { id: string }) {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/transaction/${id}`)
      .then(res => { if (!res.ok) throw new Error('Transaction not found'); return res.json(); })
      .then(result => setData(result))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div className="text-center text-lg text-text-secondary">Loading transaction details...</div>;
  }
  if (error || !data) {
    return <div className="text-red-500 text-center p-8 bg-surface rounded-lg">Error: Could not load transaction.</div>;
  }

  const status = data.meta.err === null ? 'Success' : 'Failed';
  const feeInSol = data.meta.fee / 10**9;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-surface border border-border rounded-lg p-5">
        <div className="flex items-center gap-3 mb-3">
          <Info className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Transaction Signature</h3>
        </div>
        <p className="text-lg font-mono break-all text-text-secondary">{id}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DetailItem label="Status" value={
            <span className={`flex items-center gap-2 ${status === 'Success' ? 'text-secondary' : 'text-red-500'}`}>
                {status === 'Success' ? <CheckCircle size={20}/> : <XCircle size={20}/>} {status}
            </span>
        }/>
        <DetailItem label="Slot" value={data.slot}/>
        <DetailItem label="Fee (SOL)" value={feeInSol.toFixed(9)}/>
        <DetailItem label="Timestamp (UTC)" value={formatDate(data.blockTime)}/>
      </div>

      <div className="bg-surface border border-border rounded-lg p-5">
        <div className="flex items-center gap-3 mb-3">
          <FileText className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Transaction Logs</h3>
        </div>
        <div className="bg-background p-4 rounded-md font-mono text-xs overflow-x-auto">
          {data.meta.logMessages.map((log: string, index: number) => (
            <p key={index} className="whitespace-pre-wrap leading-relaxed">{log.replace(/Program log: /g, '')}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

