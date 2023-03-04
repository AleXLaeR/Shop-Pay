import SEO from '@common/SEO';
import { Footer, CheckoutHeader } from '@components/layout';
import { EmptyCart, CartSummary, Payments, CartEntry, Checkout } from '@components/pages/Cart';

import Pagination from '@mui/material/Pagination';
import { useUpdateCartMutation } from '@store/api';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectProducts, updateCart } from '@store/slices/cart.slice';

import { useClientPagination, useEventListener } from '@hooks/index';
import { useEffect } from 'react';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [postCart] = useUpdateCartMutation();
  const {
    pageCount,
    curPage,
    handlers: { goTo, getBatch, next, prev },
  } = useClientPagination(products, 3);

  useEffect(() => {
    postCart(products).then((data) => {
      const prods: CartProduct[] = (data as any).data;
      dispatch(updateCart(prods ?? []));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
