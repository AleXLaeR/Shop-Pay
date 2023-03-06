import { useState } from 'react';
import CouponForm from './CouponForm';
import OrderPricing from './OrderPricing';
import PlaceOrderButton from './PlaceOrderButton';

interface SummaryProps {
  cart: CartModel;
  paymentMethod: string;
}

export default function OrderSummary({ cart, paymentMethod }: SummaryProps) {
  const [discountedPrice, setDiscountedPrice] = useState<DiscountedPrice>({
    discount: 0,
    priceAfterDiscount: cart.totalPrice,
    couponName: '',
  });

  return (
    <div className="mt-4">
      <div className="w-full pb-1.5 border-b border-b-white-darker">
        <h3>Order Summary</h3>
      </div>
      <div className="mt-2.5">
        <CouponForm
          wasCouponApplied={cart.wasCouponApplied}
          setDiscountedPrice={setDiscountedPrice}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <OrderPricing price={discountedPrice} beforeDiscount={cart.totalPrice} />
        <PlaceOrderButton cart={cart} paymentMethod={paymentMethod} price={discountedPrice} />
      </div>
    </div>
  );
}
