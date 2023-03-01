import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';

import EmptyCartImg from '@assets/images/emptyCart.png';
import { BiShoppingBag, BiHome } from 'react-icons/bi';

export default function EmptyCart() {
  const { data: session } = useSession();

  return (
    <div className="relative top-20 p-8 flex-center flex-col text-black-light">
      <Image src={EmptyCartImg} alt="empty cart" width={130} />
      <h1 className="mt-4 text-4xl font-bold">Cart is empty</h1>
      {!session && (
        <button
          type="button"
          onClick={() => signIn()}
          className="mt-4 mb-4 h-12 w-[300px] hover:underline rounded-md shadow-md bg-yellow text-black-lighter font-semibold uppercase"
        >
          Sign in / register
        </button>
      )}
      <span className="border-b-greyish border-b-2 w-[300px] my-2" />
      <Link href="/products">
        <button className="hover:bg-transparent hover:border-black-lighter rounded-sm shadow-md hover:text-black-lighter border border-black text-white bg-black-light mt-4 flex-center h-16 font-semibold text-lg cursor-pointer w-[300px] uppercase transition-all duration-200">
          <BiShoppingBag className="mr-2 w-6 h-6" />
          shop now
        </button>
      </Link>
      <Link href="/">
        <button className="bg-transparent border-black-lighter text-black-lighter rounded-sm shadow-md border border-black hover:text-white hover:bg-black-light mt-4 flex-center h-16 font-semibold text-lg cursor-pointer w-[300px] uppercase transition-all duration-200">
          <BiHome className="mr-2 w-6 h-6" />
          go to home
        </button>
      </Link>
    </div>
  );
}
