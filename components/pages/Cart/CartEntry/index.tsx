/* eslint-disable @typescript-eslint/naming-convention */
import Image from 'next/image';
import { useState } from 'react';

import { MdOutlineStorefront } from 'react-icons/md';
import { RiCheckboxCircleLine } from 'react-icons/ri';

import EntryHeader from './EntryHeader';
import ControlActions from './ControlActions';
import SummaryLabel from './SummaryLabel';

interface CartEntryProps {
  product: CartProduct;
}

export default function CartEntry({ product }: CartEntryProps) {
  const {
    _id,
    name,
    images,
    quantity,
    color,
    size,
    discountedPrice,
    startingPrice,
    discount,
    shippingPrice,
    slug,
  } = product;
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative border-b border-b-greyish card-base grid-in-products flex flex-col gap-4">
      {quantity < 1 && <div className="blur z-20 max-w-full max-h-full" />}
      <div className="flex items-center gap-2.5 text-sm text-grey-dark pb-4 border-b border-b-white-dark">
        <MdOutlineStorefront className="w-8 h-8" />
        ShopPay Official Store
        {quantity < 1 && (
          <p className="flex-grow text-right pr-2 text-red text-lg font-semibold">Inactive</p>
        )}
      </div>
      <div className="grid grid-cols-cartEntryImages gap-2.5">
        <RiCheckboxCircleLine
          className={`w-10 h-10 transition-transform hover:scale-105 cursor-pointer hover:fill-green-light rounded-full ${
            isActive ? 'fill-green-light' : 'fill-grey-lighter'
          }`}
          onClick={() => {}}
        />
        <Image
          src={images[0].uri}
          alt={images[0].publicUri}
          loading="lazy"
          width={100}
          height={140}
          className="rounded-md shadow-md w-24 h-[170px] sm:h-[140px]"
        />
        <div className="col">
          <EntryHeader name={name} _id={_id} />
          <SummaryLabel slug={slug} color={color} size={size} price={discountedPrice} />
          <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-base md:text-lg font-semibold">
                USD {(discountedPrice * quantity).toFixed(2)}$
              </span>
              {discountedPrice !== startingPrice && (
                <>
                  <span className="line-through text-grey-light font-semibold">
                    USD {startingPrice}$
                  </span>
                  <span className="bg-pink shadow-sm rounded-md text-sm py-0.5 px-2.5 font-semibold text-orange">
                    -{discount}%
                  </span>
                </>
              )}
            </div>
            <ControlActions product={product} />
          </div>
          <div className=" mt-1 md:mt-0 text-sm text-blue">
            <span>{shippingPrice !== 0 ? `+${shippingPrice}$ Shipping fee` : 'Free Shipping'}</span>
          </div>
        </div>
      </div>
      {quantity < 1 && (
        <p className="md:ml-10 text-red text-lg w-full z-10 underline underline-offset-4">
          This product is out of stock. Add it to your whishlist and it might get restocked.
        </p>
      )}
    </div>
  );
}