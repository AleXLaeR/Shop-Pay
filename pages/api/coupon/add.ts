import nc from 'next-connect';
import { NextApiResponse } from 'next';

import { OverrideNextReq } from 'types/general';
import { StatusCodes } from 'http-status-codes';

import { Coupon } from '@models/index';
import db from '@services/db.service';

const handler = nc<OverrideNextReq<CouponModel>, NextApiResponse<BaseApiResponse | CouponModel>>();

handler.post(async ({ body: coupon }, res) => {
  try {
    await db.connectToDb();

    const existingCoupon = await Coupon.findById(coupon._id);
    if (existingCoupon) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'This coupon name already exists.' });
    }

    const newCoupon = await Coupon.create(coupon);
    await db.disconnectFromDb();

    return res.status(StatusCodes.OK).json(newCoupon);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Fatal; Cannot add a coupon.' });
  }
});

export default handler;
