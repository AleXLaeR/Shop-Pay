import { useState } from 'react';
import { useRouter } from 'next/router';

import { TbMinus, TbPlus } from 'react-icons/tb';
import { BsHandbagFill, BsHeart } from 'react-icons/bs';

interface ProductInfoButtonsProps {
  productQuantity: number;
}

export default function ProductInfoButtons({ productQuantity }: ProductInfoButtonsProps) {
  const { query } = useRouter();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const size = parseInt(query.size as string, 10);

  const onCartAddBtnClick = async () => {};

  return (
    <>
      <div className="mt-4 py-4 flex items-center gap-1.5 border border-greyish rounded-xl w-fit px-1">
        <button
          className="w-9 h-9 bg-grey hover:bg-grey-light rounded-full grid place-items-center cursor-pointer"
          onClick={() =>
            selectedQuantity > 1 && selectedQuantity < 99 && setSelectedQuantity((prev) => prev - 1)
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
            selectedQuantity < productQuantity && setSelectedQuantity((prev) => prev + 1)
          }
        >
          <TbPlus />
        </button>
      </div>
      <div className="xl:flex lg:gap-4">
        <button
          disabled={productQuantity < 1}
          className="mt-4 flex-center gap-2.5 h-16 hover:text-black-lighter text-grey-dark font-semibold text-lg cursor-pointer w-full transition-all duration-200"
          style={{
            backgroundImage: 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
          }}
        >
          <BsHandbagFill className="w-8 h-8 -translate-x-1" />
          <b>ADD TO CART</b>
        </button>
        <button
          className="hover:bg-transparent hover:border-black-lighter hover:text-black-lighter border border-black text-white bg-black-light mt-4 flex-center gap-2.5 h-16 text-grey-dark font-semibold text-lg cursor-pointer w-full transition-all duration-200"
          onClick={onCartAddBtnClick}
        >
          <BsHeart className="w-8 h-8 -translate-x-1 mt-1" />
          WISHLIST
        </button>
      </div>
    </>
  );
}
