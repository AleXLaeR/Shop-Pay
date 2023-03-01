import Link from 'next/link';
import Image from 'next/image';

import ROUTES from '@services/routes';
import { useRouter } from 'next/router';

import Logo from '@assets/images/logo.png';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { useAppSelector } from '@store/hooks';
import { selectProducts } from '@store/slices/cart.slice';

import NavBar from './NavBar';
import AdBanner from './AdBanner';
import SuggestionsInput from '../SuggestionsInput';

export default function Header() {
  const { pathname } = useRouter();
  const products = useAppSelector(selectProducts);

  return (
    <div className="h-full shadow-md">
      {pathname !== '/sign-up' && pathname !== '/sign-in' && <AdBanner />}
      <NavBar />
      <div className="flex items-center relative h-[4rem]">
        <div className="flex-between w-full pr-10 flex-shrink gap-4 max-w-screen-xl my-0 mx-auto py-0 px-4">
          <Link href={ROUTES.BASE} className="w-44">
            <Image src={Logo} alt="Logo" />
          </Link>
          <SuggestionsInput />
          <Link href="/cart" className="relative">
            <AiOutlineShoppingCart className="h-10 w-10 fill-grey-dark hover:fill-black transition-[fill] duration-200" />
            <span className="absolute -top-[0.2rem] -right-2.5 bg-blue w-5 h-5 hover:fill rounded-full flex-center text-white-dark text-sm">
              {products.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
