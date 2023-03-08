import SEO from '@common/SEO';
import { CheckoutHeader } from '@components/layout';
import NewsLetter from '@components/layout/Footer/NewsLetter';

import Link from 'next/link';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

export default function OrderSuccess() {
  return (
    <>
      <SEO title="Thank You | ShopPay" desc="Order Success pager | ShopPay" />
      <CheckoutHeader />
      <div className="container min-h-[600px] flex-center flex-col my-12 gap-4">
        <IoCheckmarkCircleOutline className="w-20 h-20 stroke-green-light" />
        <h2 className="text-4xl font-semibold text-grey-dark uppercase">
          Thank You for your purchase!
        </h2>
        <div className="mt-2 flex-center flex-col text-grey-lighter gap-1">
          <span>
            You can now check your orders statuses at{' '}
            <Link href="user/orders" className="text-black-lighter uppercase link font-bold">
              My Orders
            </Link>{' '}
            page.
          </span>
          <span className="text-grey-dark">
            We&apos;ll email you an order confirmation with details and tracking info.
          </span>
        </div>
        <Link
          href="/"
          className="mt-4 mb-24 min-w-[200px] text-center text-lg p-3 bg-black-lighter text-white transition-colors duration-300 hover:bg-white hover:text-black-lighter border border-black-lighter"
        >
          Continue Shopping
        </Link>
        <NewsLetter />
      </div>
    </>
  );
}
