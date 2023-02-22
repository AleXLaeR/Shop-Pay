import nc from 'next-connect';
import type { NextApiResponse } from 'next';
import type { OverrideNextReq } from 'types/general';

import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

type RequestPayload = { email: string };

type RequestData = {
  email_address: string;
  status: 'subscribed' | 'unsubscribed';
};

type RequestMeta = {
  url: string;
  data: RequestData;
  headers: Record<string, string>;
};

function mailchimpHandler(email: string): RequestMeta {
  const { MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID } = process.env;
  const DATACENTER = MAILCHIMP_API_KEY.split('-')[1];

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: 'subscribed',
  } as RequestData;

  const base64ApiKey = Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64ApiKey}`,
  };

  return { url, data, headers };
}

const handler = nc<OverrideNextReq<RequestPayload>, NextApiResponse>();

handler.post(async ({ body: { email } }, res) => {
  try {
    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please add an email address!' });
    }

    const { url, data, headers } = mailchimpHandler(email);
    try {
      await axios.post(url, data, { headers });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email is already subscribed!' });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: 'You have been added to our newsletter successfully!' });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

export default handler;
