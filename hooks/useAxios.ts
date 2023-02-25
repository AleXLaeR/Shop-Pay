import useSWR, { SWRResponse, Fetcher } from 'swr';
import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL,
});

export default function useAxios<Data = any>(
  key: string | null,
  { method = 'GET', ...opts }: AxiosRequestConfig = {},
  payload?: Record<string, any>,
): SWRResponse<Data, Error> {
  if (!['GET', 'POST'].includes(method)) {
    throw new Error('Method is not allowed. Only GET and POST are supported.');
  }

  const fetcher: Fetcher<Data, typeof key> = async (url) => {
    const { data } = await axiosInstance({
      url: `/api/${url}`,
      method,
      ...opts,
      data: payload,
    });
    console.log(123);
    return data;
  };

  return useSWR<Data, Error>(key, fetcher);
}
