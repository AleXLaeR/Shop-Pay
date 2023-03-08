import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { AiOutlineDollar } from 'react-icons/ai';

import PayPalPayment from './PayPalPayment';
import StripePayment from './StripePayment';

interface OrderPaymentsProps {
  order: OrderModel;
}

export default function OrderPayments({ order }: OrderPaymentsProps) {
  const { wasPaid, paymentMethod } = order;

  return (
    <PayPalScriptProvider
      options={{ 'client-id': process.env.PAYPAL_CLIENT_ID }}
      deferLoading={false}
    >
      {!wasPaid && (
        <div className="p-4 shadow-md">
          {paymentMethod === 'paypal' && <PayPalPayment order={order} />}
          {paymentMethod === 'credit_card' && <StripePayment order={order} />}
          {paymentMethod === 'cash' && (
            <div className="mt-2 flex flex-col items-center">
              <AiOutlineDollar className="w-8 h-8 -mb-3 fill-green" />
              <span className="font-semibold text-xl flex-center min-h-[70px]">
                You&apos;ve chosen <em className="mx-1">on-site</em> cash payment
              </span>
            </div>
          )}
        </div>
      )}
    </PayPalScriptProvider>
  );
}
