import nc from 'next-connect';
import type { NextApiResponse } from 'next';
import type { OverrideNextReq } from 'types/general';

import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

import db from '@services/db.service';
import User from '@models/User';

const handler = nc<OverrideNextReq<ResetPasswordPayload>, NextApiResponse>();

handler.put(async ({ body: { userId, password } }, res) => {
  try {
    await db.connectToDb();

    if (!password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please enter a new password!' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'This Account does not exist.' });
    }

    if (await bcrypt.compare(password, user.password)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password is the same.' });
    }
    const encryptedPassword = await bcrypt.hash(password, 12);

    await user.updateOne({ password: encryptedPassword });
    await db.disconnectFromDb();

    return res.status(StatusCodes.OK).json({ email: user.email });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

export default handler;
