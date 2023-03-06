import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function AddressEntryImage() {
  const { data: session } = useSession();

  return (
    <div className="h-24 w-24 p-2 rounded-br-lg bg-white-light grid place-items-center">
      <Image
        src={session?.user?.image!}
        alt={session?.user?.name! ?? 'user'}
        loading="lazy"
        width={100}
        height={100}
        className="rounded-full shadow-md"
      />
    </div>
  );
}
