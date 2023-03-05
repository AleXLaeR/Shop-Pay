import nc from 'next-connect';
import { NextApiResponse } from 'next';

import { StatusCodes } from 'http-status-codes';
import { OverrideNextReq } from 'types/general';

import db from '@services/db.service';
import { User } from '@models/index';

const handler = nc<OverrideNextReq<PostAddressPayload>, NextApiResponse>();

handler.post(async ({ body: { userId, address } }, res) => {
  try {
    await db.connectToDb();

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Associated user has not been found.' });
    }

    await user.updateOne({ $push: { addresses: address } });
    await db.disconnectFromDb();

    return res.status(StatusCodes.OK).json({ message: 'Address has been added successfully.' });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Cannot add an address to the associated user.' });
  }
});

export default handler;
