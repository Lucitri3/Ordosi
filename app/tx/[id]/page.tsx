import TransactionDetails from '@/components/TransactionDetails';

// This page component is simple. It just passes the ID to our client component.
export default function TransactionPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <TransactionDetails id={params.id} />
    </div>
  );
}

