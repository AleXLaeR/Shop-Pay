import Link from 'next/link';
import { useRouter } from 'next/router';

import { useMemo, useState } from 'react';
import Rating from '@mui/material/Rating';

import { TbMinus, TbPlus } from 'react-icons/tb';
import { BsHeart, BsHandbagFill } from 'react-icons/bs';

import SocialsShare from './SocialsShare';
import ProductAccordion from './ProductAccordion';

interface ProductInfoProps {
  product: PageProduct;
  setActiveImage: (img: ProductImage) => void;
}

export default function ProductInfo({ product, setActiveImage }: ProductInfoProps) {
  const {
    name,
    sku,
    slug,
    quantity,
    rating,
    reviews,
    discountedPrice,
    prices,
    discount,
    shippingPrice,
    variants,
    colors,
    subProducts,
    details,
    description,
    faq,
  } = product;

  const { query } = useRouter();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const variant = parseInt(query.variant as string, 10);
  // const querySize = parseInt(query.size as string, 10);

  const averagePrice =
    prices.length === 1 ? prices[0] : (prices[0] + prices[prices.length - 1]) / 2;

  const totalQuantity = useMemo(
    () => variants.reduce((acc, va) => acc + va.quantity, 0),
    [variants],
  );

  return (
    <div className="text-grey-dark bg-white pt-4 md:pt-0 sm:max-w-full rounded-lg">
      {/* <DialogModal /> */}
      <div className="container !min-h-0 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <h2 className="text-lg text-grey-lighter">#{sku}</h2>
        <div className="flex items-center gap-2">
          <Rating
            className="!text-yellow-light"
            title={`${name}'s Rating`}
            name="product-rating"
            defaultValue={rating}
            precision={0.5}
            readOnly
          />
          <span>
            {reviews
              ? `${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'}`
              : 'No reviews here yet!'}
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <h2 className="text-xl font-bold underline underline-offset-[5px]">
            {prices.length !== 1
              ? `From ${prices[0]}$ to ${prices[prices.length - 1]}$ (Avg: ${averagePrice}$)`
              : `Current Price: ${discountedPrice}$`}
          </h2>
          {discount > 0 && (
            <h3 className="text-lg font-medium text-grey-dark flex items-center gap-1.5">
              Actual discount: {discount}% (Avg:{' '}
              <span className="line-through -mr-1 text-blue">
                ${(averagePrice * discount) / 100}
              </span>
              )
            </h3>
          )}
        </div>
        <p className="text-blue font-semibold">
          {shippingPrice !== 0 ? `+${shippingPrice}$ Shipping fee` : 'Free Shipping'}
        </p>
        <span className="text-lg">{variant ? quantity : totalQuantity} pieces available.</span>
        <div className="mt-4">
          <h4 className="text-lg font-medium">Select a Size : </h4>
          <div className="mt-2.5 flex items-center flex-wrap gap-4">
            {variants.map(({ size }, idx) => (
              <Link
                key={size}
                href={`${slug}?variant=${variant}&size=${idx}`}
                className="p-2 rounded-full border border-dark-grey transition-transform hover:scale-110 duration-500 cursor-pointer hover:text-blue-dark"
                style={{
                  backgroundImage: 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
                }}
              >
                <button type="button" className="w-8 h-8">
                  {size}
                </button>
              </Link>
            ))}
          </div>
        </div>
        <h4 className="text-lg font-medium mt-4">Select a Color : </h4>
        <div className="mt-2.5 flex items-center gap-4">
          {colors.map((color, idx) => (
            <button
              key={color}
              type="button"
              className={`grid w-[50px] h-[50px] rounded-full transition-transform hover:scale-110 duration-500 cursor-pointer hover:text-blue-dark ${
                variant === idx ? 'activeColor' : ''
              }`}
              onClick={() => setActiveImage(subProducts[idx].images[0])}
            >
              <Link href={`${slug}?variant=${idx}`} className="w-full h-full">
                <p
                  className="w-full h-full rounded-full border border-grey-dark"
                  style={{ backgroundColor: color }}
                />
              </Link>
            </button>
          ))}
        </div>
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
            onClick={() => selectedQuantity < quantity && setSelectedQuantity((prev) => prev + 1)}
          >
            <TbPlus />
          </button>
        </div>
        <div className="xl:flex lg:gap-4">
          <button
            disabled={product.quantity < 1}
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
            onClick={() => {}}
          >
            <BsHeart className="w-8 h-8 -translate-x-1 mt-1" />
            WISHLIST
          </button>
        </div>
        <SocialsShare />
        <ProductAccordion desc={description} details={details} faq={faq} />
      </div>
    </div>
  );
}
