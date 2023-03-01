import nc from 'next-connect';
import type { NextApiResponse, NextApiRequest } from 'next';

import { StatusCodes } from 'http-status-codes';

import db from '@services/db.service';
import { Product } from '@models/index';

const handler = nc<NextApiRequest, NextApiResponse<SuggestionsResponse | BaseApiResponse>>();
