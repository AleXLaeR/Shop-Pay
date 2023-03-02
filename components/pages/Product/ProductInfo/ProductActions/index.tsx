import Link from 'next/link';
import { useState } from 'react';

import { useAppSelector } from '@store/hooks';
import { selectQuantity } from '@store/slices/cart.slice';

import { GiCheckMark } from 'react-icons/gi';
import { TbMinus, TbPlus } from 'react-icons/tb';
import { BsHeart } from 'react-icons/bs';

import AddToCartButton from './AddToCartButton';

interface ProductInfoButtonsProps {
  product: PageProduct;
}

export default function ProductInfoButtons({ product }: ProductInfoButtonsProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const isInCart = useAppSelector((s) => selectQuantity(s, product._id)) !== 0;

  return (
    <>
      {!isInCart && (
        <div className="mt-4 py-4 flex items-center gap-1.5 border border-greyish rounded-xl w-fit px-1">
          <button
            className="w-9 h-9 bg-grey hover:bg-grey-light rounded-full grid place-items-center cursor-pointer"
            onClick={() =>
              selectedQuantity > 1 &&
              selectedQuantity < 99 &&
              setSelectedQuantity((prev) => prev - 1)
            }
          >
            <TbMinus className="scale-90" />
          </button>
          <span className="min-w-[1.75rem] text-lg text-center font-semibold">
            {selectedQuantity}
          </span>
          <button
            className="w-9 h-9 bg-grey hover:bg-grey-light rounded-full grid place-items-center cursor-pointer"
            onClick={() =>
              selectedQuantity < product.quantity && setSelectedQuantity((prev) => prev + 1)
            }
          >
            <TbPlus />
          </button>
        </div>
      )}
      <div className="xl:flex lg:gap-4">
        {isInCart ? (
          <Link
            href="/cart"
            target="_blank"
            className="mt-4 flex-center bg-green-lighter gap-2.5 h-16 hover:bg-green-light text-white-darker font-semibold text-lg cursor-pointer w-full transition-all duration-200"
          >
            <GiCheckMark />
            GO TO CART
          </Link>
        ) : (
          <AddToCartButton product={product} quantity={selectedQuantity} />
        )}
        <button className="hover:bg-transparent hover:border-black-lighter hover:text-black-lighter border border-black text-white bg-black-light mt-4 flex-center gap-2.5 h-16 text-grey-dark font-semibold text-lg cursor-pointer w-full transition-all duration-200">
          <BsHeart className="w-8 h-8 -translate-x-1 mt-1" />
          WISHLIST
        </button>
      </div>
    </>
  );
}
