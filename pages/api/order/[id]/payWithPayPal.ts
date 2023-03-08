import nc from 'next-connect';
import { StatusCodes } from 'http-status-codes';

import type { NextApiResponse } from 'next';
import type { OverrideNextReq } from 'types/general';

import db from '@services/db.service';
import { Order } from '@models/index';

const handler = nc<OverrideNextReq<PayPalOrderPayload>, NextApiResponse>();

handler.put(async ({ query, body: result }, res) => {
  try {
    await db.connectToDb();

    const order = await Order.findById(query.id);
    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Order was not found.' });
    }

    await order.updateOne({
      paymentResult: result,
      paidAt: Date.now(),
      wasPaid: true,
      status: 'In Process',
    });

    await db.disconnectFromDb();

    return res.status(StatusCodes.OK).json({ message: 'Order was successfully paid for.' });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
});

export default handler;
