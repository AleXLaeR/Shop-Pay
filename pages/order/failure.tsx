import SEO from '@common/SEO';
import { CheckoutHeader } from '@components/layout';
import NewsLetter from '@components/layout/Footer/NewsLetter';

import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';

export default function OrderFailure() {
  return (
    <>
      <SEO title="Thank You | ShopPay" desc="Order Success pager | ShopPay" />
      <CheckoutHeader />
      <div className="container min-h-[600px] flex-center flex-col my-12 gap-4">
        <MdOutlineCancel className="w-20 h-20 fill-error-secondary" />
        <h2 className="text-4xl font-semibold text-grey-dark uppercase">
          OOPS... something went wrong!
        </h2>
        <div className="mt-2 flex-center flex-col text-black-lighter gap-1">
          <span>It seems your your order session has been cancelled.</span>
          <span className="text-grey-dark text-lg font-bold">
            If you believe it&apos;s on our side, please reach us via the button below :
          </span>
        </div>
        <Link
          href="/contact"
          className="mt-4 mb-24 uppercase min-w-[200px] text-center text-lg p-3 bg-black-lighter text-white transition-colors duration-300 hover:bg-white hover:text-black-lighter border border-black-lighter"
        >
          Contact Us
        </Link>
        <NewsLetter />
      </div>
    </>
  );
}
