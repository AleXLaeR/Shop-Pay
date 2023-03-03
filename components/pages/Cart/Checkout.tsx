import { useAppSelector } from '@store/hooks';
import { selectTotalPrice, selectTotalShippingPrice } from '@store/slices/cart.slice';

export default function Checkout() {
  const totalPrice = useAppSelector(selectTotalPrice);
  const totalShippingPrice = useAppSelector(selectTotalShippingPrice);

  return (
    <div className="card-base grid-in-checkout max-h-[300px]">
      <h2 className="font-semibold text-2xl mb-2">Order Summary</h2>
      <div className="w-full flex-between">
        <span className="font-medium">Subtotal: </span>
        <span className="font-medium">USD {totalPrice.toFixed(1)}$</span>
      </div>
      <div className="flex-between">
        <span className="font-medium">Shipping: </span>
        <span className="font-medium">USD {totalShippingPrice}$</span>
      </div>
      <div className="flex-between font-bold text-lg border-t-greyish border-t-2 py-4 mt-4">
        <span className="font-medium">Total: </span>
        <span className="font-medium text-lg underline decoration-dotted decoration-2 underline-offset-4">
          USD {(totalPrice + totalShippingPrice).toFixed(1)}$
        </span>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          disabled={[''].length === 0}
          className={`bg-blue rounded-md hover:bg-blue-dark transition-colors shadow-md w-full text-white h-12 text-xl ${
            [''].length === 0 ? 'bg-white-dark cursor-not-allowed' : ''
          }`}
          onClick={() => {}}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
