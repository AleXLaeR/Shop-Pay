import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch } from '@store/hooks';
import { addProduct } from '@store/slices/cart.slice';

import { BsHandbagFill } from 'react-icons/bs';

const gradientBtnStyle = {
  backgroundImage: 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
};

interface AddToCartButtonProps {
  product: PageProduct;
  quantity: number;
}

export default function AddToCartButton({ product, quantity }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const [isSizeSelected, setIsSizeSelected] = useState(false);

  const { query } = useRouter();
  const variant = parseInt(query.variant as string, 10) || 0;
  const size = parseInt(query.size as string, 10);

  const onCartAddBtnClick = () => {
    if (!size) {
      setIsSizeSelected(true);
      return;
    }

    const selectedProductSize = product.variants[size].size;

    dispatch(
      addProduct({
        ...product,
        quantity,
        size: selectedProductSize,
        itemId: `${product._id}_${variant}_${size}`,
      }),
    );
  };

  return (
    <button
      disabled={product.quantity < 1}
      onClick={onCartAddBtnClick}
      className={`mt-4 flex-center gap-2.5 h-16 hover:text-black-lighter text-grey-dark font-semibold text-lg cursor-pointer w-full transition-all duration-200 ${
        isSizeSelected ? '!bg-error-secondary' : ''
      }`}
      style={!isSizeSelected ? gradientBtnStyle : undefined}
    >
      <BsHandbagFill className="w-8 h-8 -translate-x-1" />
      <b>{isSizeSelected ? 'SELECT THE SIZE FIRST' : 'ADD TO CART'}</b>
    </button>
  );
}
