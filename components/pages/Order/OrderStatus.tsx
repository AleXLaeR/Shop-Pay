import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

interface OrderStatusProps {
  order: Omit<OrderModel, 'products'>;
}

export default function OrderStatus({ order }: OrderStatusProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, wasPaid, status } = order;

  return (
    <div className="flex flex-col gap-2.5 p-4 border border-greyish">
      <div className="flex items-center gap-1.5 text-grey-dark">
        <Link href="/" className="link">
          Home
        </Link>{' '}
        <IoIosArrowForward /> Orders <IoIosArrowForward /> ID {_id}
      </div>
      <div className="flex items-center gap-2.5">
        Payment Status :{' '}
        <Image
          src={`/images/payments/${wasPaid ? 'verified' : 'unverified'}.png`}
          alt="payment status"
          width={30}
          height={40}
          loading="lazy"
        />
      </div>
      <div className="flex items-center gap-2.5">
        Order Status : <span className="processed">{status}</span>
      </div>
    </div>
  );
}
