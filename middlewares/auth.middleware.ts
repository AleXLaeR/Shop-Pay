import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async (
  req: NextApiRequest & { userId?: string },
  res: NextApiResponse,
  next: () => void,
) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });
  if (token) {
    req.userId = token.sub;
    next();
  } else {
    res.status(401).json({ message: 'Not signed in :' });
    res.end();
  }
};
