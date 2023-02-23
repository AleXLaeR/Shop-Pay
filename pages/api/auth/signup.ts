import nc from 'next-connect';
import type { NextApiResponse } from 'next';
import type { OverrideNextReq } from 'types/general';

import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { createJwtToken } from '@lib/utils';
import sendEmail from '@services/email.service';

import db from '@services/db.service';
import User from '@models/User';

const handler = nc<OverrideNextReq<SignUpPayload>, NextApiResponse>();

handler.post(async ({ body: { name, email, password } }, res) => {
  try {
    await db.connectToDb();

    if (!name || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please fill in all fields!' });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `User with that email already exists.` });
    }

    const addedUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });

    const activationToken = createJwtToken({ id: addedUser.id.toString() });
    const url = `${process.env.BASE_URL}/auth/validate/${activationToken}`;

    await Promise.all([
      sendEmail(email, url, 'ShopPay - Verify your E-Mail address', 'verifyEmail'),
      db.disconnectFromDb(),
    ]);

    res
      .status(StatusCodes.OK)
      .json({ message: 'Registration was successful! Please verify your email!' });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

export default handler;
