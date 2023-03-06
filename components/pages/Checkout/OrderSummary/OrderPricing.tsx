interface OrderPricingProps {
  price: DiscountedPrice;
  beforeDiscount: number;
}

export default function OrderPricing({ price, beforeDiscount }: OrderPricingProps) {
  const { discount, priceAfterDiscount, couponName } = price;

  return (
    <div className="mt-10 flex flex-col gap-1.5">
      <span className="bg-white-darker rounded-sm p-1.5 text-lg border border-greyish">
        Total: <b>{beforeDiscount.toFixed(2)}$</b>
      </span>{' '}
      {discount !== 0 && (
        <>
          <span className="bg-green-light rounded-sm text-white-light p-1.5 text-lg border border-greyish">
            Coupon &quot;{couponName}&quot; applied: <b>-{discount}%</b>
          </span>
          <span className="mt-2 text-lg font-semibold">
            New price:{' '}
            <b className="text-xl rounded-md font-medium p-1.5 text-lg border border-greyish">
              {priceAfterDiscount.toFixed(2)}$
            </b>
          </span>
        </>
      )}
    </div>
  );
}
