import nc from 'next-connect';
import { StatusCodes } from 'http-status-codes';

import type { NextApiResponse } from 'next';
import type { OverrideNextReq } from 'types/general';

import db from '@services/db.service';
import { Order } from '@models/index';
import { checkout } from '@lib/stripe';

const handler = nc<OverrideNextReq<StripeOrderPayload>, NextApiResponse>();

handler.put(async ({ query, body }, res) => {
  const { products, email } = body;

  try {
    await db.connectToDb();

    const order = await Order.findById(query.id);
    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Order was not found.' });
    }

    const mappedProducts = products.map(({ imageUri, quantity, name, price }) => ({
      quantity,
      price_data: {
        currency: 'usd',
        unit_amount: +price.toFixed(1) * 100,
        product_data: {
          name,
          images: [imageUri ?? 'public/images/default-product.png'],
        },
      },
    }));

    const { id } = await checkout.sessions.create({
      success_url: `${process.env.BASE_URL}/order/success`,
      cancel_url: `${process.env.BASE_URL}/order/failure`,
      payment_method_types: ['card'],
      line_items: mappedProducts,
      mode: 'payment',
      metadata: {
        images: JSON.stringify(products.map(({ imageUri }) => imageUri)),
        email,
      },
    });

    await order.updateOne({
      paymentResult: {
        id,
        email,
        status: 'Paid',
      },
      paidAt: Date.now(),
      status: 'In Process',
      wasPaid: true,
    });

    await db.disconnectFromDb();

    return res.status(StatusCodes.OK).json({ id });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

export default handler;
