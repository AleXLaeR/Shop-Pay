import Image from 'next/image';
import { useState } from 'react';
import { useToggle } from '@hooks/index';

import { MdSecurity } from 'react-icons/md';
import { BsSuitHeart } from 'react-icons/bs';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';

import NavLink from './NavLink';
import AccountDropdown from './AccountDropdown';

export default function NavBar({
  data: {
    country,
    currency: { code },
  },
}: IpRegistryProps) {
  const { name: countryName, flag } = country;
  const [isLoggedIn] = useState(false);
  const {
    toggleState: isDropDownVisible,
    handlers: { toggle },
  } = useToggle();

  return (
    <div className="bg-gray border-y-[1px] border-white-dark pr-1">
      <div className="my-0 mx-auto p-2 flex-between">
        <div />
        <ul className="flex gap-4 [&_span]:text-sm">
          <NavLink className="!no-underline !cursor-default">
            <Image
              src={flag.emojitwo}
              alt="Country Flag"
              className="h-4 w-4 md:w-7 md:h-7 rounded-full"
              loading="lazy"
              width={28}
              height={28}
            />
            <span className="capitalize font-semibold">
              {countryName} / <span className="uppercase font-bold">{code}</span>
            </span>
          </NavLink>
          <NavLink className="hidden md:flex">
            <MdSecurity />
            <span>Security</span>
          </NavLink>
          <NavLink className="hidden md:flex">
            <span>Buyer Protection</span>
          </NavLink>
          <NavLink className="hidden md:flex">
            <span>Customer Service</span>
          </NavLink>
          <NavLink>
            <span>Help</span>
          </NavLink>
          <NavLink>
            <BsSuitHeart />
            <span>Wishlist</span>
          </NavLink>
          <NavLink onClick={toggle}>
            <div className="flex items-center gap-0.5 [&>svg]:scale-[1.2] [&>svg]:mr-1">
              <RiAccountPinCircleLine />
              <span>{isLoggedIn ? 'Alex' : 'Account'}</span>
              <RiArrowDropDownFill />
            </div>
            {isDropDownVisible ? <AccountDropdown loginState={isLoggedIn} /> : undefined}
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
