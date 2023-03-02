import Link from 'next/link';
import Image from 'next/image';

import Logo from '@assets/images/logo.png';
import { MdPlayArrow } from 'react-icons/md';
import { SuggestionsInput } from '@components/layout';

export default function CartPageHeader() {
  return (
    <div className="h-16 px-3 shadow-md border border-white-darker flex items-center">
      <div className="w-full max-w-[1300px] mx-auto flex-between gap-4">
        <div className="flex items-center">
          <Link href="/" className="cursor-pointer mr-2">
            <Image src={Logo} alt="Logo" loading="lazy" height={35} />
          </Link>
        </div>
        <SuggestionsInput />
        <div className="">
          <Link
            href="/products"
            className="link flex [&>svg]:hover:rotate-90 items-center gap-0.5 text-grey-dark uppercase md:text-base text-sm"
          >
            <span className="text-center sm:text-start">Continue shopping</span>
            <MdPlayArrow className="fill-grey-dark transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
