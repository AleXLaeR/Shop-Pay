import { FaIdCard } from 'react-icons/fa';
import { GiPhone, GiPostStamp } from 'react-icons/gi';

interface AddressEntryContactsProps {
  fullName: string;
  contactNumber: string;
  zipCode: string;
}

export default function AddressEntryContacts({
  fullName,
  contactNumber,
  zipCode,
}: AddressEntryContactsProps) {
  return (
    <div className="pr-2 md:pr-4 pl-4 sm:pl-0 flex flex-col py-2.5">
      <span className="flex items-center gap-1.5 uppercase font-semibold italic">
        <FaIdCard className="fill-grey-dark" />
        {fullName}
      </span>
      <span className="flex items-center gap-1.5 font-semibold">
        <GiPhone className="fill-grey-dark" />
        {contactNumber}
      </span>
      <span className="flex items-center gap-1.5 italic underline underline-offset-2">
        <GiPostStamp className="fill-grey-dark" />
        {zipCode}
      </span>
    </div>
  );
}
