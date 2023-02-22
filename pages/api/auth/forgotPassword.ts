import nc from 'next-connect';
import type { NextApiResponse } from 'next';
import type { OverrideNextReq } from 'types/general';
import { StatusCodes } from 'http-status-codes';

import { createResetToken } from '@lib/utils';
import sendEmail from '@services/email.service';

import db from '@services/db.service';
import User from '@models/User';

const handler = nc<OverrideNextReq<EmailPayload>, NextApiResponse>();

handler.post(async ({ body: { email } }, res) => {
  try {
    await db.connectToDb();

    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please enter an email!' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'User with that email does not exist.' });
    }

    const resetToken = createResetToken({ id: user._id.toString() });
    const url = `${process.env.BASE_URL}/auth/reset/${resetToken}`;

    await Promise.all([
      sendEmail(email, url, 'ShopPay - Password Reset Confirmation', 'resetPassword'),
      db.disconnectFromDb(),
    ]);

    res.status(StatusCodes.OK).json({ message: 'E-Mail has been sent! Check your inbox.' });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

export default handler;
