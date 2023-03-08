import { GetServerSideProps } from 'next';
import {
  OrderStatus,
  OrderPricing,
  CustomerOrderData,
  OrderProductList,
  OrderPayments,
} from '@components/pages/Order';

import SEO from '@common/SEO';
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
      <SEO title="Order Page | ShopPay" desc={`Order Page ${orderData._id} | ShopPay`} />
      <CheckoutHeader />
      <div className="max-w-[1350px] mx-auto grid grid-cols-1 lg:grid-cols-[2.4fr,1fr] my-8 px-4 gap-4">
        <div className="flex flex-col shadow-md">
          <OrderStatus order={orderData} />
          <div className="p-4">
            <OrderProductList products={products} />
            <OrderPricing order={orderData} />
          </div>
        </div>
        <div className="h-fit flex flex-col gap-4">
          <CustomerOrderData shippingAddress={orderData.shippingAddress} />
          <OrderPayments order={orderData} />
        </div>
      </div>
      <Footer bordered />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  await db.connectToDb();

  const order = await Order.findById(query.id).populate({ path: 'user', model: 'User' }).lean();
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
