import nc from 'next-connect';
import { NextApiResponse } from 'next';

import { OverrideNextReq } from 'types/general';
import { StatusCodes } from 'http-status-codes';

import { Coupon } from '@models/index';
import db from '@services/db.service';

const handler = nc<OverrideNextReq<CouponModel>, NextApiResponse<BaseApiResponse>>();

handler.post(async ({ body }, res) => {
  try {
    await db.connectToDb();

    const existingCoupon = await Coupon.findById(body._id);
    if (existingCoupon) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'This coupon name already exists.' });
    }

    await Coupon.create(body);
    await db.disconnectFromDb();

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Coupon has been successfully added to db.' });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Fatal; Cannot add a coupon.' });
  }
});

export default handler;
