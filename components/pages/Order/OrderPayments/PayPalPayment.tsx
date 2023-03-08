/* eslint-disable react/jsx-no-useless-fragment */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CircleLoader } from 'react-spinners';
import { usePayWithPayPalMutation } from '@store/api';

import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

interface PayPalPaymentProps {
  order: Omit<OrderModel, 'products'>;
}

export default function PayPalPayment({ order }: PayPalPaymentProps) {
  const { user, shippingAddress, totalPrice } = order;
  const router = useRouter();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [putPayment, { isLoading, error }] = usePayWithPayPalMutation();

  useEffect(() => {
    if (!order._id) return;

    paypalDispatch({
      type: 'resetOptions',
      value: {
        'client-id': process.env.PAYPAL_CLIENT_ID,
        currency: 'USD',
      },
    });
    paypalDispatch({
      type: 'setLoadingStatus',
      value: 'pending' as any,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()!;
    const status: PaymentStatus =
      details.status !== 'VOIDED' && details.status !== 'PAYER_ACTION_REQUIRED' ? 'Paid' : 'Unpaid';

    await putPayment({
      status,
      id: details.id,
      email: details.payer.email_address!,
      orderId: order._id,
    });
    router.push('/order/success');
  };

  const onOrderCreation = async (data: CreateOrderData, actions: CreateOrderActions) => {
    console.log(user);
    const payPalOrderId = await actions.order.create({
      purchase_units: [
        {
          amount: { value: totalPrice.toFixed(2), currency_code: 'USD' },
          shipping: {
            name: {
              full_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
            },
            address: {
              address_line_1: shippingAddress.primaryAddress,
              address_line_2: shippingAddress.secondaryAddress,
              admin_area_1: shippingAddress.state || shippingAddress.country,
              admin_area_2: shippingAddress.city,
              country_code: 'UA',
              postal_code: shippingAddress.zipCode,
            },
            options: [
              {
                id: 'standard',
                label: 'Standard shipping',
                selected: true,
              },
              {
                id: 'express',
                label: 'Express shipping',
                selected: false,
              },
            ],
            email_address: user.email,
            phone_number: { national_number: shippingAddress.contactNumber },
          },
        },
      ],
    });
    return payPalOrderId;
  };

  return (
    <>
      {isPending || isLoading ? (
        <CircleLoader className="mx-auto mt-10" size={24} />
      ) : (
        <PayPalButtons
          className="grid place-items-center"
          createOrder={onOrderCreation}
          onApprove={onApprove}
          onError={console.warn}
        />
      )}
    </>
  );
}
