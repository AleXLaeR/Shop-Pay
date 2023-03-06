/* eslint-disable @typescript-eslint/naming-convention */
import { useAppSelector } from '@store/hooks';
import { selectActiveAddress } from '@store/slices/checkout.slice';

import AddressEntryImage from './AddressEntryImage';
import AddressEntryActions from './AddressEntryActions';
import AddressEntryLocation from './AddressEntryLocation';
import AddressEntryContacts from './AddressEntryContacts';

interface AddressListEntryProps {
  address: UserAddress & { _id: string };
}

export default function AddressListEntry({ address }: AddressListEntryProps) {
  const {
    _id,
    firstName,
    lastName,
    contactNumber,
    country,
    city,
    state,
    zipCode,
    primaryAddress,
    secondaryAddress,
  } = address;
  const activeAddressId = useAppSelector(selectActiveAddress)?._id;

  return (
    <div className="relative">
      <AddressEntryActions addressId={_id} activeAddressId={activeAddressId} />
      <div
        className={`relative rounded-md grid grid-cols-1 sm:grid-cols-2 transition-[background-color] duration-300 hover:bg-white-light shadow-md cursor-pointer h-full ${
          activeAddressId === _id ? 'border-2 border-dashed border-green' : ''
        }`}
      >
        <AddressEntryImage />
        <AddressEntryContacts
          fullName={`${firstName} ${lastName}`}
          contactNumber={contactNumber}
          zipCode={zipCode}
        />
        <AddressEntryLocation
          primary={primaryAddress}
          fallback={secondaryAddress}
          location={`${city}, ${state}, ${country}`}
        />
        {activeAddressId === _id && (
          <span className="absolute bottom-4 right-4 text-green-light text-base">Active</span>
        )}
      </div>
    </div>
  );
}
