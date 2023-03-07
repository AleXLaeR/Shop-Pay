import nc from 'next-connect';
import { StatusCodes } from 'http-status-codes';

import { NextApiResponse } from 'next';
import { OverrideNextReqWithUser } from 'types/general';

import db from '@services/db.service';
import { Order, User } from '@models/index';
import authMiddleware from '@middlewares/auth.middleware';

const handler = nc<OverrideNextReqWithUser<OrderModel>, NextApiResponse<BaseApiResponse>>().use(
  authMiddleware,
);

handler.post(async ({ body: order, userId }, res) => {
  try {
    await db.connectToDb();
    const subTotal = order.products.reduce((acc, { quantity }) => acc + quantity, 0);

    const [newOrder] = await Promise.all([
      Order.create({ ...order, user: userId, subTotal }),
      User.updateOne({ user: userId }, { $unset: { cart: null } }),
    ]);
    await db.disconnectFromDb();

    return res.status(StatusCodes.OK).json({ orderId: newOrder._id.toString() });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Fatal; Cannot create an order.' });
  }
});

export default handler;
