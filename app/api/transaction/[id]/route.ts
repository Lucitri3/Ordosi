import { Connection, PublicKey } from '@solana/web3.js';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const signature = params.id; // The transaction ID/signature

  if (!signature) {
    return NextResponse.json({ error: 'Transaction signature is required' }, { status: 400 });
  }

  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com');

    // getParsedTransaction is a powerful call that returns human-readable data
    const txData = await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });

    if (!txData) {
      return NextResponse.json({ error: 'Transaction not found.' }, { status: 404 });
    }

    // We send the useful data back to our component
    return NextResponse.json(txData);

  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch transaction data. Please check the signature." },
      { status: 500 }
    );
  }
}

