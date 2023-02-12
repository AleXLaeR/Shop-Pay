// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDb, { disconnectFromDb } from '@services/db.service';

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await connectToDb();
  await disconnectFromDb();
  res.status(200).json({ name: 'John Doe' });
}
