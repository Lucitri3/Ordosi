import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { NextResponse } from 'next/server';

// This GET function is our new API endpoint
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const address = params.id;

  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const publicKey = new PublicKey(address);

    const [balance, signatures] = await Promise.all([
      connection.getBalance(publicKey),
      connection.getSignaturesForAddress(publicKey, { limit: 15 }),
    ]);

    const data = {
      address,
      balance: balance / LAMPORTS_PER_SOL,
      signatures: signatures.map((s) => s.signature),
    };

    // Send the successful response back as JSON
    return NextResponse.json(data);

  } catch (e: any) {
    // Send an error response back as JSON
    return NextResponse.json(
      { error: "Invalid address or failed to fetch data." },
      { status: 500 }
    );
  }
}

