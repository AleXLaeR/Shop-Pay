/* eslint-disable react/jsx-no-useless-fragment */
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { useAxios, useClickOutside, useDebounce, useEventListener } from '@hooks/index';

import { AiOutlineStar } from 'react-icons/ai';
import { RiSearch2Line } from 'react-icons/ri';
import { TbCircleDot } from 'react-icons/tb';
import { ClockLoader } from 'react-spinners';

export default function SuggestionsInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 700);

  const { data, isLoading } = useAxios<SuggestionsResponse>(
    debouncedQuery ? `/suggestions?search=${debouncedQuery}&limit=6` : null,
    {
      method: 'GET',
    },
  );

  const onClickOutside = useCallback(() => {
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  useClickOutside(inputRef, onClickOutside);
  useEventListener('scroll', onClickOutside);

  return (
    <div className="relative flex-grow z-20">
      <div className="flex items-center bg-[#eeeeeebc] focus:border focus:border-grey-dark h-10 rounded-md">
        <input
          type="text"
          ref={inputRef}
          placeholder="Search..."
          onChange={({ target }) => setSearchQuery(target.value)}
          className="w-full h-full bg-transparent text-sm md:text-base border-0 outline-0 pl-4"
        />
        <div className="w-12 h-10 grid place-items-center transition-[background-color] duration-150 bg-blue hover:bg-blue-dark rounded-r-[5px] cursor-pointer">
          <RiSearch2Line className="w-5 h-5 md:w-6 md:h-6 fill-white" />
        </div>
      </div>
      <div className="shadow-md absolute w-full bg-white rounded-md z-10 top-11">
        {data && data.products?.length !== 0 ? (
          <>
            {data.products?.map(({ _id, slug, name, rating }) => (
              <div
                key={_id}
                className="cursor-pointer [&>a]:hover:underline [&>a]:underline-offset-2 hover:bg-grey-light transition-colors duration-300 border-greyish border-b px-2 py-1 flex items-center gap-4"
              >
                <TbCircleDot />
                <Link href={`/product/${slug}`} target="_blank">
                  {name}
                </Link>
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
  );
}
