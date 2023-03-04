import ProductListEntry from './ProductListEntry';

interface ProductListProps {
  products: CartProductModel[];
  totalPrice: number;
}

export default function ProductList({ products, totalPrice }: ProductListProps) {
  return (
    <div className="border-greyish border p-4 mt-4">
      <div className="flex-between">
        <h1>Your Cart</h1>
        <span>
          {products.length} ${products.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      <div className="flex flex-wrap gap-4 pt-4">
        {products.map((product) => (
          <ProductListEntry product={product} />
        ))}
      </div>
      <div className="mt-4 p-2.5 border-t-greyish border-t">
        Total Price : <b>{totalPrice}$</b>
      </div>
    </div>
  );
}
