import { useToggle } from '@hooks/index';
import { useAppSelector } from '@store/hooks';
import { selectSubTotal } from '@store/slices/cart.slice';

import { MdOutlineArrowLeft } from 'react-icons/md';
import { RiCheckboxCircleLine, RiCheckboxBlankCircleLine } from 'react-icons/ri';

export default function CartSummary() {
  const {
    toggleState: isSelectAllActive,
    handlers: { toggle },
  } = useToggle();
  const totalQuantity = useAppSelector(selectSubTotal);
  const selected = [];

  const handleSelect = () => {
    if (selected.length !== [].length) {
      // setSelected(cartItems);
    } else {
      // setSelected([]);
    }
  };

  return (
    <div className="grid-in-summary card-base lg:h-[140px]">
      <h1 className="text-3xl font-semibold mb-4">Item summary ({totalQuantity})</h1>
      <button
        type="button"
        className="cursor-pointer flex items-center gap-0.5 [&>svg]:hover:fill-green-light"
        onClick={toggle}
      >
        {isSelectAllActive ? (
          <RiCheckboxCircleLine className="w-8 h-8 rounded-full fill-green-light transition-transform hover:scale-110" />
        ) : (
          <RiCheckboxBlankCircleLine className="w-8 h-8 rounded-full fill-grey-lighter transition-transform hover:scale-110" />
        )}
        <span className="text-lg flex items-center">
          <MdOutlineArrowLeft className="w-6 h-6" />
          Select all items
        </span>
      </button>
    </div>
  );
}
