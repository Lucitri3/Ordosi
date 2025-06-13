'use client'; import { useState } from 'react'; import { useRouter } from 'next/navigation';
export default function Search() { const [query, setQuery] = useState(''); const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); const trimmedQuery = query.trim(); if (!trimmedQuery) return; if (trimmedQuery.length > 50) { router.push(`/tx/${trimmedQuery}`); } else if (trimmedQuery.length > 30) { router.push(`/address/${trimmedQuery}`); } else { alert('Please enter a valid Solana Address or Transaction Signature.'); } };
  return ( <form onSubmit={handleSearch}> <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter Solana Address or Transaction ID" className="w-full p-4 bg-light-bg border-2 border-border-color rounded-lg focus:ring-2 focus:ring-solana-green focus:outline-none" /> </form> );
}

