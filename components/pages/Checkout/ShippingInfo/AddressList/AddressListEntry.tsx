/* eslint-disable @typescript-eslint/naming-convention */
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { useDeleteAddressMutation } from '@store/api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectActiveAddress, setActiveAddress, deleteAddress } from '@store/slices/checkout.slice';

import { GiPhone, GiPostStamp } from 'react-icons/gi';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { FaIdCard, FaMapMarkerAlt } from 'react-icons/fa';

interface AddressListEntryProps {
  address: UserAddress & { _id: string };
}

export default function AddressListEntry({ address }: AddressListEntryProps) {
  const {
    _id,
    firstName,
    lastName,
    contactNumber,
    country,
    city,
    state,
    zipCode,
    primaryAddress,
    secondaryAddress,
  } = address;
  const { data: session } = useSession();

  const dispatch = useAppDispatch();
  const activeAddress = useAppSelector(selectActiveAddress);
  const [delAddress, { isLoading, error }] = useDeleteAddressMutation();

  const onSetActiveBtnClick = () => dispatch(setActiveAddress(_id));
  const onDeleteAddressBtnClick = async () => {
    await delAddress({ userId: session?.user?.id!, addressId: _id });
    dispatch(deleteAddress(_id));
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="w-7 h-7 [&>svg]:hover:fill-error [&>svg]:hover:scale-110 absolute top-4 right-4 text-xl fill-grey-dark z-10"
        onClick={onDeleteAddressBtnClick}
      >
        <IoIosRemoveCircleOutline className="w-full h-full transition-transform duration-300" />
      </button>
      <div
        role="presentation"
        className={`relative rounded-md grid grid-cols-1 sm:grid-cols-2 transition-[background-color] duration-300 hover:bg-white-light shadow-md cursor-pointer h-full ${
          _id === activeAddress ? 'border-2 border-dashed border-green' : ''
        }`}
        onClick={onSetActiveBtnClick}
      >
        <div className="h-24 w-24 p-2 rounded-br-lg bg-white-light grid place-items-center">
          <Image
            src={session?.user?.image!}
            alt={session?.user?.name! ?? 'user'}
            loading="lazy"
            width={100}
            height={100}
            className="rounded-full shadow-md"
          />
        </div>
        <div className="pr-2 md:pr-4 pl-4 sm:pl-0 flex flex-col py-2.5">
          <span className="flex items-center gap-1.5 uppercase font-semibold italic">
            <FaIdCard className="fill-grey-dark" />
            {firstName} {lastName}
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <GiPhone className="fill-grey-dark" />
            {contactNumber}
          </span>
          <span className="flex items-center gap-1.5 italic underline underline-offset-2">
            <GiPostStamp className="fill-grey-dark" />
            {zipCode}
          </span>
        </div>
        <div className="pl-4 flex flex-col py-2.5">
          <span className="flex items-center gap-1.5 text-lg">
            <FaMapMarkerAlt className="fill-grey-dark text-black-lighter" />
            {primaryAddress}
          </span>
          {secondaryAddress && <span>{secondaryAddress}</span>}
          <span className="flex items-center gap-1.5 text-black-lighter">
            {city}, {state}, {country}
          </span>
        </div>
        {_id === activeAddress && (
          <span className="absolute bottom-4 right-4 text-green-light text-base">Active</span>
        )}
      </div>
    </div>
  );
}
