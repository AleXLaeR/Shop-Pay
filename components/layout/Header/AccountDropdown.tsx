import Link from 'next/link';
import ROUTES from '@components/common/routes';
import Image from 'next/image';

interface AccountDropdownProps {
  loginState: boolean;
}

export default function AccountDropdown({ loginState }: AccountDropdownProps) {
  return (
    <div className="flex justify-center w-60 shadow-md absolute !cursor-default mt-1 top-full -right-1 bg-white z-10 flex flex-col gap-4 py-4 px-0">
      <h4 className="text-center font-bold">Welcome Back !</h4>
      <div className="flex w-full gap-3 py-0 px-4">
        {loginState ? (
          <>
            <Image
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              alt="Country Flag"
              className="ml-5 h-16 w-16 rounded-full cursor-pointer"
              loading="lazy"
              width={64}
              height={64}
            />
            <div className="flex flex-col">
              <span>Welcome Back, </span>
              <h3 className="font-bold">Alex</h3>
              <span className="text-blue underline underline-offset-2 cursor-pointer hover:text-blue-dark">
                Sign Out
              </span>
            </div>
          </>
        ) : (
          <>
            <button type="button" className="btn-primary">
              Register
            </button>
            <button type="button" className="btn-outlined">
              Log In
            </button>
          </>
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
