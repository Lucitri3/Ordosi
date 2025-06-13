import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// By defining a 'Props' type, we make the expected shape very clear to TypeScript.
type Props = {
  params: { id: string };
};

// This function will fetch data on the server
async function getAddressData(address: string) {
  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const publicKey = new PublicKey(address);

    const [balance, signatures] = await Promise.all([
      connection.getBalance(publicKey),
      connection.getSignaturesForAddress(publicKey, { limit: 15 }),
    ]);

    return {
      address,
      balance: balance / LAMPORTS_PER_SOL,
      signatures: signatures.map((s) => s.signature),
      error: null,
    };
  } catch (e: any) {
    console.error(e);
    return {
      address,
      error: "Invalid address or failed to fetch data. Please check the address and try again.",
    };
  }
}

// We now use our new 'Props' type here. This is the fix.
export default async function AddressPage({ params }: Props) {
  const data = await getAddressData(params.id);

  if (data.error) {
    return <div className="text-red-500 text-center p-8 bg-light-bg rounded-lg">{data.error}</div>;
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
              <a href={`/tx/${sig}`} className="hover:text-solana-green">
                {sig}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

