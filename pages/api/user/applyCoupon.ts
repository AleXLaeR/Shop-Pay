import nc from 'next-connect';
import { StatusCodes } from 'http-status-codes';

import type { NextApiResponse } from 'next';
import type { OverrideNextReqWithUser } from 'types/general';

import { Cart, Coupon } from '@models/index';
import db from '@services/db.service';

import authMiddleware from '@middlewares/auth.middleware';

const handler = nc<
  OverrideNextReqWithUser,
  NextApiResponse<ApplyCouponResponse | BaseApiResponse>
>().use(authMiddleware);

handler.put(async ({ body: couponName, userId }, res) => {
  try {
    await db.connectToDb();

    const existingCoupon = await Coupon.findOne({ name: couponName });
    if (!existingCoupon) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Coupon is invalid.' });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Checkout session no longer exists.' });
    }

    const priceAfterDiscount =
      cart.totalPrice - (cart.totalPrice * existingCoupon.actualDiscount) / 100;

    await cart.updateOne({ $set: { totalPrice: priceAfterDiscount, wasCouponApplied: true } });

    await db.disconnectFromDb();

    return res.status(StatusCodes.OK).json({
      discount: existingCoupon.actualDiscount,
      priceAfterDiscount,
    });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Fatal; Cannot add a coupon.' });
  }
});

export default handler;
