import { NextApiRequest } from 'next';

type OrArray<T> = T | T[];
type OrDefaultArray<T> = T | Array<T, undefined>;

type OverrideWith<T1, T2> = Omit<T1, keyof T2> & T2;
type OverrideNextReq<T> = OverrideWith<NextApiRequest, { body: T }>;

export type MyCustomRequest = OverrideWith<NextApiRequest, { body: MyCustomRequestBody }>;
