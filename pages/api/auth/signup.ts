import sendEmail from '@services/email.service';
import nc from 'next-connect';
import type { NextApiResponse } from 'next';
import type { OverrideNextReq } from 'types/general';

import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { createJwtToken } from '@lib/utils';

import connectToDb from '@services/db.service';
import User from '@models/User';

type RequestPayload = {
  name: string;
  email: string;
  password: string;
};

function signUpHandler(email: string) {}

const handler = nc<OverrideNextReq<RequestPayload>, NextApiResponse>();

handler.post(async ({ body: { name, email, password } }, res) => {
  try {
    await connectToDb();

    if (!name || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please fill in all fields!' });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `User with the ${email} email already exists.` });
    }

    const addedUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });

    const activationToken = createJwtToken({ id: addedUser.id.toString() });
    const url = `${process.env.BASE_URL}/activate/${activationToken}`;

    await sendEmail(email, url, 'ShopPay - Verify your E-Mail address');
    res.status(StatusCodes.OK).json({ message: 'User successfully added!' });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

export default handler;
