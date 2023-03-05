import { useEffect } from 'react';
import { useToggle } from '@hooks/index';

import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdArrowDropupCircle } from 'react-icons/io';

import { updateAddresses } from '@store/slices/checkout.slice';
import { useAppDispatch } from '@store/hooks';

import AddressList from './AddressList';
import ShippingForm from './ShippingForm';

interface ShippingProps {
  addresses: (UserAddress & { _id: string })[];
}

export default function ShippingInfo({ addresses }: ShippingProps) {
  const {
    toggleState: isFormVisible,
    handlers: { toggle },
  } = useToggle(addresses.length === 0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateAddresses(addresses));
  }, [addresses, dispatch]);

  return (
    <div className="relative p-1 flex flex-col items-center gap-4 overflow-hidden">
      <div className="w-full pb-1.5 border-b border-b-white-darker font-bold text-lg">
        <h3>Shipping information</h3>
      </div>
      <AddressList />
      <button
        className="h-12 w-full mt-6 hover:bg-white-darker block bg-transparent cursor-pointer border-black-lighter border"
        onClick={toggle}
      >
        {isFormVisible ? (
          <span className="flex-center gap-1.5">
            <IoMdArrowDropupCircle className="text-3xl fill-black-light" />
          </span>
        ) : (
          <span className="flex-center gap-1.5 underline underline-offset-4">
            ADD NEW ADDRESS <AiOutlinePlus className="w-5 h-5 rounded-full p-1 bg-grey-light" />
          </span>
        )}
      </button>
      <ShippingForm
        className={
          isFormVisible
            ? 'opacity-100 duration-500 transition-all translate-y-0'
            : 'pointer-events-none opacity-0 absolute -translate-y-[100px]'
        }
      />
    </div>
  );
}
