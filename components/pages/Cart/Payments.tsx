import Image from 'next/image';
import Protection from '@assets/images/payments/protection.png';

import Mastercard from '@assets/images/payments/mastercard.webp';
import PayPal from '@assets/images/payments/paypal.webp';
import Visa from '@assets/images/payments/visa.webp';

export default function Payments() {
  return (
    <div className="card-base grid-in-payments">
      <h2 className="text-black-light text-xl italic font-medium">Payment methods</h2>
      <div className="flex flex-wrap gap-2 mt-4 pb-4 [&>img]:border-[1px] [&>img]:border-black">
        <Image
          src={Visa}
          className="w-14 rounded-md transition-[transform] duration-500 hover:scale-105 cursor-pointer"
          alt="Visa"
        />
        <Image
          src={Mastercard}
          className="w-14 rounded-md transition-[transform] duration-500 hover:scale-105 cursor-pointer"
          alt="MasterCard"
        />
        <Image
          src={PayPal}
          className="w-14 rounded-md transition-[transform] duration-500 hover:scale-105 cursor-pointer"
          alt="PayPal"
        />
      </div>
      <h2 className="text-black-light mt-2.5 text-sm">Buyer Protection</h2>
      <div className="mt-1.5 flex items-center gap-2.5 font-semibold text-black-light">
        <Image
          src={Protection}
          alt="Our Customer Protection"
          width={25}
          height={25}
          loading="lazy"
        />
        Get full refund if the item is received not as described or not delivered.
      </div>
    </div>
  );
}
