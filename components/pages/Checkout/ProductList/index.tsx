import ProductListEntry from './ProductListEntry';

interface ProductListProps {
  cart: CartModel;
}

export default function ProductList({ cart }: ProductListProps) {
  const { products, totalPrice, subTotal } = cart;

  return (
    <div className="border-greyish border p-4 mt-4">
      <div className="font-bold text-lg relative flex-between">
        <h1>Your Cart</h1>
        <p className="absolute right-0 -top-3.5 flex flex-col">
          <span>
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </span>
          <span>
            {subTotal} {subTotal === 1 ? 'items' : 'items'} total
          </span>
        </p>
      </div>
      <div className="max-w-full lg:max-w-[680px] xl:max-w-[885px] overflow-x-auto flex gap-4 pt-4">
        {products.map((product) => (
          <ProductListEntry key={product.name} product={product} />
        ))}
      </div>
      <div className="total mt-4 p-2.5 border-t-greyish border-t">
        Total Price : <b>{totalPrice.toFixed(2)}$</b>
      </div>
    </div>
  );
}
