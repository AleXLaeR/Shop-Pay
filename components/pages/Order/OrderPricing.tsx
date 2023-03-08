import { useMemo } from 'react';

interface OrderPricingProps {
  order: Omit<OrderModel, 'products'>;
}

export default function OrderPricing({ order }: OrderPricingProps) {
  const { appliedCoupon, totalPrice, shippingPrice, taxPrice, discount } = order;

  const priceBeforeDiscount = useMemo(
    () => totalPrice / (1 - discount / 100),
    [totalPrice, discount],
  );

  return (
    <div className="mt-4">
      {appliedCoupon && (
        <>
          <div className="flex-between py-1.5 px-4 text-lg font-semibold">
            <span>Total cost : {priceBeforeDiscount.toFixed(2)}$</span>
          </div>
          <div className="flex-between py-1.5 px-4 text-lg font-semibold">
            <span>
              Applied Coupon <em className="text-green-light">({appliedCoupon}) : </em>{' '}
            </span>
            <span>- {(priceBeforeDiscount - totalPrice).toFixed(2)}$</span>
          </div>
        </>
      )}
      <div className="flex-between py-1.5 px-4 font-semibold">
        <span>Shipping price : +{shippingPrice}$</span>
        <span>Tax price : +{taxPrice}$</span>
      </div>
      <div className="flex-between py-1.5 mt-2 px-4 border-t border-t-greyish">
        <span className="uppercase font-bold text-xl">To Pay : </span>
        <b className="text-2xl">{totalPrice.toFixed(2)}$</b>
      </div>
    </div>
  );
}
