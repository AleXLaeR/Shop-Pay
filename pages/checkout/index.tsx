import SEO from '@common/SEO';
import { CheckoutHeader, Footer } from '@components/layout';
import {
  ShippingInfo,
  PaymentMethods,
  OrderSummary,
  ProductList,
} from '@components/pages/Checkout';

import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import db from '@services/db.service';
import { Cart, User } from '@models/index';

interface CheckoutProps {
  cart: CartModel;
  addresses: UserAddress[];
}

export default function Checkout({ cart, addresses }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState('');

  return (
    <>
      <SEO title="Checkout | ShopPay" desc="User Checkout page" />
      <CheckoutHeader />
      <div className="container max-w-[1400px] mt-8 overflow-x-hidden lg:grid grid-cols-[2fr,1fr] gap-8">
        <div>
          <ShippingInfo addresses={addresses} />
          <ProductList cart={cart} />
        </div>
        <div>
          <PaymentMethods paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
          <OrderSummary cart={cart} paymentMethod={paymentMethod} />
        </div>
      </div>
      <Footer bordered />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [session] = await Promise.all([getSession({ ctx }), db.connectToDb()]);

  const user = await User.findById(session?.user?.id).lean();
  const cart = await Cart.findOne({ user: user?._id }).lean();

  if (!cart) {
    return {
      redirect: {
        destination: '/cart',
        permanent: false,
      },
    };
  }

  await db.disconnectFromDb();

  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      addresses: JSON.parse(JSON.stringify(user!.addresses)),
    },
  };
};
