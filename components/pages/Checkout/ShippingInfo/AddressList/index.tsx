import { selectAddresses } from '@store/slices/checkout.slice';
import { useAppSelector } from '@store/hooks';
import AddressListEntry from './AddressListEntry';

export default function AddressList() {
  const addresses = useAppSelector(selectAddresses);

  return (
    <div className="flex flex-col gap-4 w-full">
      {addresses.map((address) => (
        <AddressListEntry key={address._id} address={address} />
      ))}
    </div>
  );
}
