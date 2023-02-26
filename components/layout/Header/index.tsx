/* eslint-disable react/jsx-no-useless-fragment */
import Link from 'next/link';
import Image from 'next/image';
import ROUTES from '@services/routes';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAxios, useDebounce } from '@hooks/index';

import Logo from '@assets/images/logo.png';
import { ClockLoader } from 'react-spinners';

import { TbCircleDot } from 'react-icons/tb';
import { RiSearch2Line } from 'react-icons/ri';
import { AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';

import { useAppSelector } from '@store/hooks';
import { selectProducts } from '@store/slices/cart.slice';

import AdBanner from './AdBanner';
import NavBar from './NavBar';

export default function Header() {
  const { pathname } = useRouter();
  const products = useAppSelector(selectProducts);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 700);

  const { data, isLoading } = useAxios<SuggestionsResponse>(
    debouncedQuery ? `/suggestions?search=${debouncedQuery}&limit=6` : null,
    {
      method: 'GET',
    },
  );

  return (
    <div className="h-full shadow-md">
      {pathname !== '/sign-up' && pathname !== '/sign-in' && <AdBanner />}
      <NavBar />
      <div className="flex items-center relative h-[4rem]">
        <div className="flex-between w-full pr-10 flex-shrink gap-4 max-w-screen-xl my-0 mx-auto py-0 px-4">
          <Link href={ROUTES.BASE} className="w-44">
            <Image src={Logo} alt="Logo" />
          </Link>
          <div className="relative flex-grow z-20">
            <div className="flex items-center bg-[#eeeeeebc] h-10 rounded-md">
              <input
                type="text"
                placeholder="Search..."
                onChange={({ target }) => setSearchQuery(target.value)}
                className="w-full h-full bg-transparent text-sm md:text-base border-0 outline-0 pl-4"
              />
              <div className="w-12 h-10 grid place-items-center transition-[background-color] duration-150 bg-blue hover:bg-blue-dark rounded-r-[5px] cursor-pointer">
                <RiSearch2Line className="w-5 h-5 md:w-6 md:h-6 fill-white" />
              </div>
            </div>
            <div className="absolute w-full bg-white rounded-md z-10 top-11">
              {data && data.products?.length !== 0 ? (
                <>
                  {data.products?.map(({ _id, slug, name, rating }) => (
                    <div
                      key={_id}
                      className="cursor-pointer [&>a]:hover:underline [&>a]:underline-offset-2 hover:bg-grey-light transition-colors duration-300 border-greyish border-b px-2 py-1 flex items-center gap-4"
                    >
                      <TbCircleDot />
                      <Link href={`/product/${slug}`}>{name}</Link>
                      <p className="flex items-center gap-1">
                        <span>{rating}</span>
                        <AiOutlineStar className="fill-yellow" />
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {data !== undefined && (
                    <p className="text-center text-xl py-6 px-3">Nothing found by your request</p>
                  )}
                </>
              )}
              {isLoading && (
                <div className="flex-center py-2">
                  <ClockLoader />
                </div>
              )}
            </div>
          </div>
          <Link href={ROUTES.CHECKOUT.BASE} className="relative">
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
