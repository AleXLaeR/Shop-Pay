import { useSession } from 'next-auth/react';

import ShippingForm from './ShippingForm';

interface ShippingProps {
  addresses: UserAddress[];
  setSelectedAddress: (state: string) => void;
}

export default function ShippingInfo({ addresses, setSelectedAddress }: ShippingProps) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full pb-1.5 border-b border-b-white-darker">
        <h3>Shipping information</h3>
      </div>
      <div className="addresses">
        {addresses.map(({ primaryAddress }) => (
          <h1 key={primaryAddress}>{primaryAddress}</h1>
        ))}
      </div>
      <ShippingForm />
    </div>
  );
}
