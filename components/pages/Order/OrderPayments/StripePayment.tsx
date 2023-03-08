import Image from 'next/image';
import { toast } from 'react-toastify';
import stripePromise from '@lib/stripe';

import { usePayWithStripeMutation } from '@store/api';
import PropagateLoader from 'react-spinners/PropagateLoader';

interface StripePaymentProps {
  order: OrderModel;
}

export default function StripePayment({ order }: StripePaymentProps) {
  const [putPayment, { isLoading, error }] = usePayWithStripeMutation();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const { data } = (await putPayment({
      orderId: order._id,
      email: order.user.email,
      products: order.products,
    })) as { data: StripeOrderResponse };

    const result = await stripe?.redirectToCheckout({
      sessionId: data?.id,
    });

    if (result?.error) {
      toast.error(result?.error.message ?? 'Payment error occurred!');
    }
  };

  return (
    <div className="min-h-[150px] flex-between flex-col gap-2">
      <Image
        src="/images/payments/stripe.png"
        className="rounded-md border-greyish border h-20"
        alt="Stripe Payment"
        width={400}
        height={100}
        loading="lazy"
      />
      <button
        type="submit"
        onClick={createCheckoutSession}
        className={`w-full h-12 p-3 transition-colors duration-300 bg-blue hover:bg-blue-dark text-white uppercase rounded-md ${
          error ? 'bg-error-secondary pointer-events-none' : ''
        } ${isLoading ? 'bg-grey-lighter pointer-events-none' : ''}`}
      >
        {isLoading ? (
          <PropagateLoader color="white" size={10} className="pb-[13px]" />
        ) : (
          'pay with credit card'
        )}
      </button>
    </div>
  );
}
