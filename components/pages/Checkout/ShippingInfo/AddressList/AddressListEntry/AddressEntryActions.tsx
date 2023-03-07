import { useAppDispatch } from '@store/hooks';
import { useDeleteAddressMutation } from '@store/api';
import { deleteAddress, setActiveAddress } from '@store/slices/checkout.slice';

import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

interface AddressEntryActionsProps {
  addressId: string;
  activeAddressId?: string;
}

export default function AddressEntryActions({
  addressId,
  activeAddressId,
}: AddressEntryActionsProps) {
  const dispatch = useAppDispatch();
  const [delAddress] = useDeleteAddressMutation();

  const onSetActiveBtnClick = () => dispatch(setActiveAddress(addressId));
  const onDeleteAddressBtnClick = async () => {
    dispatch(deleteAddress(addressId));
    await delAddress(addressId);
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      <button
        type="button"
        className="w-8 h-8 [&>svg]:hover:stroke-green-light [&>svg]:hover:scale-110 text-xl fill-grey-dark"
        onClick={onSetActiveBtnClick}
      >
        <IoCheckmarkCircleOutline
          className={`w-full h-full transition-all duration-300 ${
            addressId === activeAddressId ? 'stroke-green-light' : ''
          }`}
        />
      </button>
      <button
        type="button"
        className="w-8 h-8 [&>svg]:hover:fill-error [&>svg]:hover:scale-110 text-xl fill-grey-dark"
        onClick={onDeleteAddressBtnClick}
      >
        <IoIosRemoveCircleOutline className="w-full h-full transition-all duration-300" />
      </button>
    </div>
  );
}
