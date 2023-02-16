import Image from 'next/image';
import styles from '@styles/footer.module.scss';

import Mastercard from '@assets/images/payments/mastercard.webp';
import Visa from '@assets/images/payments/visa.webp';
import PayPal from '@assets/images/payments/paypal.webp';

export default function Payments() {
  return (
    <div className={styles.payments}>
      <b className="uppercase">We accept</b>
      <div className="flex flex-wrap gap-1.5 mt-4 [&>img]:border-[1px] [&>img]:border-black">
        <Image
          src={Visa}
          className="w-[4.75rem] h-12 rounded-md transition-[transform] duration-500 hover:scale-105 cursor-pointer"
          alt="Visa"
        />
        <Image
          src={Mastercard}
          className="w-[4.75rem] h-12 rounded-md transition-[transform] duration-500 hover:scale-105 cursor-pointer"
          alt="MasterCard"
        />
        <Image
          src={PayPal}
          className="w-[4.75rem] h-12 rounded-md transition-[transform] duration-500 hover:scale-105 cursor-pointer"
          alt="PayPal"
        />
      </div>
    </div>
  );
}
