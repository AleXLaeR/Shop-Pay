import nc from 'next-connect';
import { StatusCodes } from 'http-status-codes';

import type { NextApiResponse } from 'next';
import type { OverrideNextReqWithUser } from 'types/general';

import authMiddleware from '@middlewares/auth.middleware';
import db from '@services/db.service';
import { User } from '@models/index';

const handler = nc<OverrideNextReqWithUser, NextApiResponse>().use(authMiddleware);

handler.delete(async ({ body: addressId, userId }, res) => {
  try {
    await db.connectToDb();

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Associated user has not been found.' });
    }

    await user.updateOne({ $pull: { addresses: { _id: addressId } } });
    await db.disconnectFromDb();

    return res.status(StatusCodes.OK).json({ message: 'Address has been deleted successfully.' });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Cannot delete an address from the associated user.' });
  }
});

export default handler;
