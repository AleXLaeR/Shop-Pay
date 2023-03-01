import { useMemo } from 'react';
import { useRouter } from 'next/router';

interface ProductInfoHeaderProps {
  product: PageProduct;
}

export default function ProductInfoPricing({ product }: ProductInfoHeaderProps) {
  const { query } = useRouter();
  const { prices, discountedPrice, discount, shippingPrice, quantity, variants } = product;

  const totalQuantity = useMemo(
    () => variants.reduce((acc, va) => acc + va.quantity, 0),
    [variants],
  );

  const averagePrice =
    prices.length === 1 ? prices[0] : (prices[0] + prices[prices.length - 1]) / 2;

  return (
    <>
      <div className="flex flex-col gap-2 mt-2">
        <h2 className="text-xl font-bold underline underline-offset-[5px]">
          {prices.length !== 1
            ? `From ${prices[0]}$ to ${prices[prices.length - 1]}$ (Avg: ${averagePrice}$)`
            : `Current Price: ${discountedPrice}$`}
        </h2>
        {discount > 0 && (
          <h3 className="text-lg font-medium text-grey-dark flex items-center gap-1.5">
            Actual discount: {discount}% (Avg:{' '}
            <span className="line-through -mr-1 text-blue">${(averagePrice * discount) / 100}</span>
            )
          </h3>
        )}
      </div>
      <p className="text-blue font-semibold">
        {shippingPrice !== 0 ? `+${shippingPrice}$ Shipping fee` : 'Free Shipping'}
      </p>
      <span className="text-lg">{query.variant ? quantity : totalQuantity} pieces available.</span>{' '}
    </>
  );
}
