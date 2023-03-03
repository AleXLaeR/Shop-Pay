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
import { useClientPagination, useEventListener } from '@hooks/index';
import Pagination from '@mui/material/Pagination';

import { useAppSelector } from '@store/hooks';
import { selectProducts } from '@store/slices/cart.slice';

export default function CartPage() {
  const products = useAppSelector(selectProducts);
  const {
    pageCount,
    curPage,
    handlers: { goTo, getBatch, next, prev },
  } = useClientPagination(products, 3);

  useEventListener('keydown', ({ key }: KeyboardEvent) => {
    if (key === 'ArrowLeft') prev();
    else if (key === 'ArrowRight') next();
  });

  return (
    <div>
      <SEO title="Checkout | ShopPay" desc="User Checkout page" />
      <CheckoutHeader />
      <div className="py-4 min-h-[700px] shadow-sm bg-white-dark">
        {products.length !== 0 ? (
          <div className="p-4 text-black-light max-w-[1350px] grid mx-auto gap-4 grid-areas-cartMobile lg:grid-areas-cartDesktop lg:grid-cols-cartDesktop">
            <CartSummary />
            <div className="grid-in-products">
              <div className="shadow-sm">
                {getBatch().map((product) => (
                  <CartEntry key={product.itemId} product={product} />
                ))}
              </div>
              <Pagination
                count={pageCount}
                page={curPage}
                variant="outlined"
                shape="rounded"
                className="mt-4 pt-4 flex justify-end"
                onChange={(_, page) => goTo(page)}
              />
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
