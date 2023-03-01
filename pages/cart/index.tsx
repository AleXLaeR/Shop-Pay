import SEO from '@common/SEO';
import { CheckoutHeader, EmptyCart } from '@components/pages/Cart';

import { useAppSelector } from '@store/hooks';
import { selectProducts } from '@store/slices/cart.slice';

export default function Checkout() {
  const cartProducts = useAppSelector(selectProducts);

  return (
    <div>
      <SEO title="Checkout | ShopPay" desc="User Checkout page" />
      <CheckoutHeader />
      <div className="cart">
        {cartProducts.length > 1 ? (
          <div className="cartContainer">
            <h1>1234</h1>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
}
