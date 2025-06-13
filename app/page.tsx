import Search from '@/components/Search';
export default function HomePage() {
  return ( <div> <Search /> <div className="mt-8 p-6 bg-light-bg border border-border-color rounded-lg text-gray-400"> <h2 className="text-xl font-bold text-white mb-4">How This Works</h2> <ul className="list-disc list-inside space-y-2"> <li>This tool uses Solana's free, public JSON RPC API.</li> <li>It can only look up specific addresses or transactions you provide.</li> <li>Global search and real-time updates are not supported due to RPC limitations.</li> </ul> </div> </div> );
}

