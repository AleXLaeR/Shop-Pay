import { useAppDispatch } from '@store/hooks';
import { clearCart } from '@store/slices/cart.slice';
import { MdOutlineArrowLeft, MdOutlineCancel } from 'react-icons/md';

export default function RemoveAllButton() {
  const dispatch = useAppDispatch();
  const onRemoveAllBtnClick = () => dispatch(clearCart());

  return (
    <button
      type="button"
      className="cursor-pointer flex items-center gap-0.5 [&>svg]:hover:fill-green-light"
      onClick={onRemoveAllBtnClick}
    >
      <span className="text-lg flex items-center">
        <MdOutlineCancel className="w-8 h-8 rounded-full fill-red transition-transform hover:scale-110" />
        <MdOutlineArrowLeft className="w-6 h-6" />
        Remove all items
      </span>
    </button>
  );
}
