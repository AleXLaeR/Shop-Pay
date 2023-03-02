import SEO from '@common/SEO';
import { Footer } from '@components/layout';
import {
  CheckoutHeader,
  EmptyCart,
  CartSummary,
  Payments,
  CartEntry,
  Checkout,
} from '@components/pages/Cart';

import { useAppSelector } from '@store/hooks';
import { selectProducts } from '@store/slices/cart.slice';

export default function CartPage() {
  const products = useAppSelector(selectProducts);

  return (
    <div>
      <SEO title="Checkout | ShopPay" desc="User Checkout page" />
      <CheckoutHeader />
      <div className="py-4 min-h-[700px] shadow-sm bg-white-dark">
        {products.length !== 0 ? (
          <div className="p-4 text-black-light max-w-[1350px] grid mx-auto gap-4 grid-areas-cartMobile lg:grid-areas-cartDesktop lg:grid-cols-cartDesktop">
            <CartSummary />
            <div className="grid-in-products shadow-sm">
              {products.map((product) => (
                <CartEntry key={product._id} product={product} />
              ))}
            </div>
            <Checkout />
            <Payments />
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer />
    </div>
  );
}
