import { useDispatch } from 'react-redux';
import { onExisting } from '@store/slices/cart.slice';

interface CartControlsProps {
  product: CartProduct;
}

export default function CartControls({ product }: CartControlsProps) {
  const { itemId, quantity } = product;
  const dispatch = useDispatch();

  const onRemoveBtnClick = () => dispatch(onExisting({ itemId, action: 'remove' }));
  const onAddBtnClick = () => dispatch(onExisting({ itemId, action: 'add' }));

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
