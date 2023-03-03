import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectIsAllSelected, setSelection } from '@store/slices/cart.slice';

import { MdOutlineArrowLeft } from 'react-icons/md';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';

export default function SelectAllButton() {
  const dispatch = useAppDispatch();
  const isAllSelected = useAppSelector(selectIsAllSelected);
  const onSelectAllBtnClick = () => dispatch(setSelection(isAllSelected ? 'unselect' : 'select'));

  return (
    <button
      type="button"
      className="cursor-pointer flex items-center gap-0.5 [&>svg]:hover:fill-green-light"
      onClick={onSelectAllBtnClick}
    >
      {isAllSelected ? (
        <RiCheckboxCircleLine className="w-8 h-8 rounded-full fill-green-light transition-transform hover:scale-110" />
      ) : (
        <RiCheckboxBlankCircleLine className="w-8 h-8 rounded-full fill-grey-lighter transition-transform hover:scale-110" />
      )}
      <span className="text-lg flex items-center">
        <MdOutlineArrowLeft className="w-6 h-6" />
        Select all items
      </span>
    </button>
  );
}
