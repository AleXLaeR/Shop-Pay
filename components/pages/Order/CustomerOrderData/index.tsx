import Image from 'next/image';
import { useSession } from 'next-auth/react';
import OrderAddressData from './OrderAddressData';

interface CustomerOrderDataProps {
  shippingAddress: UserAddress;
}

export default function CustomerOrderData({ shippingAddress }: CustomerOrderDataProps) {
  const { data: session } = useSession();

  return (
    <div className="p-4 shadow-md rounded-sm">
      <h1 className="text-3xl my-4">Customer&apos;s Order</h1>
      <div className="pb-2.5">
        <div className="flex gap-2.5">
          <Image
            src={session?.user?.image!}
            alt={session?.user?.name!}
            width={55}
            height={55}
            loading="lazy"
          />
          <div>
            <p className="font-semibold">{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2">
        <OrderAddressData address={shippingAddress} title="Shipping" />
        <OrderAddressData address={shippingAddress} title="Billing" />
      </div>
    </div>
  );
}
