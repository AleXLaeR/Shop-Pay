import nc from 'next-connect';
import type { NextApiResponse, NextApiRequest } from 'next';

import { StatusCodes } from 'http-status-codes';

import db from '@services/db.service';
import { Product, Category } from '@models/index';

const handler = nc<NextApiRequest, NextApiResponse<SuggestionsResponse | BaseApiResponse>>();

type QuerySort = {
  readonly field: string;
  sort?: string | null;
};

type MongoSort = { [sort: string]: 1 | -1 | 'asc' | 'desc' };

type QueryParams = {
  page: number;
  limit: number;
  search: string;
  sort: string;
};

const generateSort = (sort: string | null): MongoSort => {
  if (!sort) return {};

  const { field, sort: parsedSort } = JSON.parse(sort) as QuerySort;
  return { [field]: parsedSort === 'asc' ? 1 : -1 };
};

handler.get(async ({ query }, res) => {
  const { page = 0, limit = 10, sort = null, search = '' } = query as Partial<QueryParams>;

  try {
    await db.connectToDb();

    const products = await Product.find({
      $or: [
        { name: { $regex: new RegExp(search, 'i') } },
        { brand: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .sort(generateSort(sort))
      .skip(page * limit)
      .limit(limit);

    console.log(search, products);
    await db.disconnectFromDb();

    return res.status(StatusCodes.OK).json({
      products,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

export default handler;
