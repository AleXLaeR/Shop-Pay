import { FaMapMarkerAlt } from 'react-icons/fa';

interface AddressEntryLocationProps {
  primary: string;
  fallback?: string;
  location: string;
}

export default function AddressEntryLocation({
  primary,
  fallback,
  location,
}: AddressEntryLocationProps) {
  return (
    <div className="pl-4 flex flex-col py-2.5 max-w-[300px]">
      <span className="flex items-center gap-1.5 text-lg">
        <FaMapMarkerAlt className="fill-grey-dark text-black-lighter" />
        {primary}
      </span>
      {fallback && <span>{fallback}</span>}
      <span className="flex items-center gap-1.5 text-black-lighter">{location}</span>
    </div>
  );
}
