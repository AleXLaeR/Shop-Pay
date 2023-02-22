import Link from 'next/link';
import Image from 'next/image';

import ROUTES from '@services/routes';
import { useSession, signOut, signIn } from 'next-auth/react';

export default function AccountDropdown() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center w-60 shadow-md absolute !cursor-default mt-1 top-full -right-1 bg-white z-10 flex flex-col gap-4 py-4 px-0">
      <h4 className="text-center font-bold">Welcome {session && 'Back'} !</h4>
      <div className="flex w-full gap-3 py-0 px-4">
        {session ? (
          <>
            <Image
              src={session.user?.image!}
              alt="Profile"
              className="ml-5 !h-14 !w-14 md:!h-16 md:!w-16 rounded-full"
              loading="lazy"
              width={96}
              height={96}
            />
            <div className="flex flex-col">
              <span>Welcome Back, </span>
              <h3 className="font-bold">{session.user?.name?.split(' ')[0]}</h3>
              <span
                className="text-blue underline underline-offset-2 cursor-pointer hover:text-blue-dark"
                onClick={() => signOut()}
                role="presentation"
              >
                Sign Out
              </span>
            </div>
          </>
        ) : (
          <div className="w-full flex gap-2 justify-around">
            <Link href="/sign-up">
              <button type="button" className="btn-outlined min-w-[100px]">
                Register
              </button>
            </Link>
            <button onClick={() => signIn()} type="button" className="btn-primary min-w-[100px]">
              Login
            </button>
          </div>
        )}
      </div>
      <ul className="grid grid-cols-2 gap-x-5 pr-4 pl-5">
        <li className="flex-center rounded-[0.25rem] transition-[background-color] duration-200 hover:bg-white-dark py-1">
          <Link href={ROUTES.PROFILE.BASE} className="hover:underline">
            Account
          </Link>
        </li>
        <li className="flex-center rounded-[0.25rem] transition-[background-color] duration-200 hover:bg-white-dark py-1">
          <Link href={ROUTES.PROFILE.ORDERS} className="hover:underline">
            My Orders
          </Link>
        </li>
        <li className="flex-center rounded-[0.25rem] transition-[background-color] duration-200 hover:bg-white-dark py-1">
          <Link href={ROUTES.PROFILE.MESSAGES} className="hover:underline">
            Messages
          </Link>
        </li>
        <li className="flex-center rounded-[0.25rem] transition-[background-color] duration-200 hover:bg-white-dark py-1">
          <Link href={ROUTES.PROFILE.ADDRESSES} className="hover:underline">
            Addresses
          </Link>
        </li>
        <li className="flex-center rounded-[0.25rem] transition-[background-color] duration-200 hover:bg-white-dark py-1">
          <Link href={ROUTES.PROFILE.WISHLIST} className="hover:underline">
            Wishlist
          </Link>
        </li>
      </ul>
    </div>
  );
}
