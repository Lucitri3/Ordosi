import AddressDetails from '@/components/AddressDetails';

// This page component is now very simple. It is NOT async.
// Its only job is to get the 'id' from the URL and pass it to our new component.
export default function AddressPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <AddressDetails id={params.id} />
    </div>
  );
}

