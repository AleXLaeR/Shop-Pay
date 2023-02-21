import useSWR, { SWRResponse, Fetcher } from 'swr';
import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL,
});

export default function useAxios<Data = any>(
  key: string,
  { method = 'get', ...opts }: AxiosRequestConfig = {},
  payload?: Record<string, any>,
): SWRResponse<Data, Error> {
  if (!['get', 'post'].includes(method)) {
    throw new Error('Method is not allowed. Only GET and POST are supported.');
  }

  const fetcher: Fetcher<Data, typeof key> = async (url) => {
    const { data } = await axiosInstance({
      url,
      method,
      ...opts,
      data: payload,
    });
    return data;
  };

  return useSWR<Data, Error>(key, fetcher);
}
