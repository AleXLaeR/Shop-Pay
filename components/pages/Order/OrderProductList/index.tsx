import { useClientPagination, useEventListener } from '@hooks/index';
import Pagination from '@mui/material/Pagination';
import ProductListEntry from './ProductListEntry';

interface OrderProductListProps {
  products: CartProductModel[];
  perPage?: number;
}

export default function OrderProductList({ products, perPage = 3 }: OrderProductListProps) {
  const {
    pageCount,
    curPage,
    handlers: { goTo, getBatch, prev, next },
  } = useClientPagination(products, perPage);

  useEventListener('keydown', ({ key }: KeyboardEvent) => {
    if (key === 'ArrowLeft') prev();
    else if (key === 'ArrowRight') next();
  });

  return (
    <>
      {getBatch().map((product: CartProductModel) => (
        <ProductListEntry key={product._id} product={product} />
      ))}
      {products.length > perPage && (
        <Pagination
          count={pageCount}
          page={curPage}
          variant="outlined"
          shape="rounded"
          className="mt-4 pt-4 flex justify-end"
          onChange={(_, page) => goTo(page)}
        />
      )}
    </>
  );
}
