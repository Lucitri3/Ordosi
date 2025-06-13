'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

export default function Search() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    if (trimmedQuery.length > 50) {
      router.push(`/tx/${trimmedQuery}`);
    } else if (trimmedQuery.length > 30) {
      router.push(`/address/${trimmedQuery}`);
    } else {
      alert('Please enter a valid Solana Address or Transaction Signature.');
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto my-8">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <SearchIcon className="h-5 w-5 text-text-secondary" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Address / Txn Signature"
          className="block w-full rounded-full border-2 border-border bg-surface p-4 pl-12 text-lg text-text-primary focus:border-primary focus:ring-0 focus:outline-none transition-colors"
        />
      </div>
    </form>
  );
}

