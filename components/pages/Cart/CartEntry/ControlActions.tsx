import { useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '@store/slices/cart.slice';

interface CartControlsProps {
  product: CartProduct;
}

export default function CartControls({ product }: CartControlsProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, quantity } = product;
  const dispatch = useDispatch();

  const onRemoveBtnClick = () => dispatch(removeProduct(_id));
  const onAddBtnClick = () => dispatch(addProduct(product));

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        className={`bg-grey w-9 h-9 rounded-full grid place-items-center cursor-pointer hover:bg-grey-light text-lg font-semibold ${
          quantity === 1 ? 'text-red pointer-events-none' : ''
        }`}
        disabled={quantity === 1}
        onClick={onRemoveBtnClick}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        className="bg-grey w-9 h-9 rounded-full grid place-items-center cursor-pointer hover:bg-grey-light text-lg font-semibold"
        onClick={onAddBtnClick}
      >
        +
      </button>
    </div>
  );
}
