import nc from 'next-connect';
import type { NextApiResponse } from 'next';
import type { OverrideNextReq } from 'types/general';

import { StatusCodes } from 'http-status-codes';
import db from '@services/db.service';
import User from '@models/User';

const handler = nc<OverrideNextReq<ValidateEmailPayload>, NextApiResponse>();

handler.put(async ({ body: { userId } }, res) => {
  try {
    await db.connectToDb();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'This Account does not exist.' });
    }

    await user.updateOne({ isEmailVerified: true });
    await db.disconnectFromDb();

    return res.status(StatusCodes.OK).json({ email: 'Email was successfully verified!' });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

export default handler;
