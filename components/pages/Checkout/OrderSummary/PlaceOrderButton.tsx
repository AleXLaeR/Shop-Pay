import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { useAddOrderMutation } from '@store/api';
import { clearCart } from '@store/slices/cart.slice';

import { selectActiveAddress } from '@store/slices/checkout.slice';
import PropagateLoader from 'react-spinners/PropagateLoader';

interface PlaceOrderButtonProps {
  cart: CartModel;
  paymentMethod: string;
  price: DiscountedPrice;
}

export default function PlaceOrderButton({ cart, paymentMethod, price }: PlaceOrderButtonProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [postOrder, { isLoading }] = useAddOrderMutation();
  const activeAddress = useAppSelector(selectActiveAddress);

  const onBtnClick = async () => {
    const res: any = await postOrder({
      products: cart.products,
      totalPrice: price.priceAfterDiscount || cart.totalPrice,
      shippingAddress: activeAddress,
      paymentMethod: paymentMethod as PaymentMethod,
      appliedCoupon: price.couponName,
    });
    dispatch(clearCart());
    router.push(`order/${res.data.orderId}`);
  };

  return (
    <button
      type="button"
      className={`mt-4 w-full rounded-sm hover:bg-blue-dark uppercase shadow-sm h-11 bg-blue text-white font-semibold transition-colors duration-300 ${
        !activeAddress || !paymentMethod ? 'bg-error-secondary pointer-events-none' : ''
      }`}
      onClick={onBtnClick}
    >
      {isLoading ? (
        <PropagateLoader color="white" size={10} className="pb-[13px]" />
      ) : (
        <span>
          {!paymentMethod
            ? 'To proceed choose a payment method above'
            : !activeAddress
            ? 'To proceed select a shipping address'
            : 'Place Order'}
        </span>
      )}
    </button>
  );
}
