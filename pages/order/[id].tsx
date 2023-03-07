import { GetServerSideProps } from 'next';

import {
  OrderStatus,
  OrderProductEntry,
  OrderPricing,
  CustomerOrderData,
} from '@components/pages/Order';
import { CheckoutHeader, Footer } from '@components/layout';

import db from '@services/db.service';
import { Order } from '@models/index';

interface OrderProps {
  order: OrderModel;
}

export default function OrderPage({ order }: OrderProps) {
  const { products, ...orderData } = order;

  return (
    <>
      <CheckoutHeader />
      <div className="max-w-[1350px] mx-auto grid grid-cols-1 lg:grid-cols-[2.4fr,1fr] my-8 px-4 gap-4">
        <div className="flex flex-col shadow-md">
          <OrderStatus order={orderData} />
          <div className="p-4">
            {products
              .flatMap((p) => [p, p, p, p, p])
              .map((product: CartProductModel) => (
                <OrderProductEntry key={product._id} product={product} />
              ))}
            <OrderPricing order={orderData} />
          </div>
        </div>
        <div className="h-fit flex flex-col gap-4">
          <CustomerOrderData shippingAddress={orderData.shippingAddress} />
          {orderData.wasPaid && <div className="p-4 shadow-md" />}
        </div>
      </div>
      <Footer bordered />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  await db.connectToDb();

  const order = await Order.findById(query.id).lean();
  if (!order) {
    return { notFound: true };
  }

  await db.disconnectFromDb();

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
};
