import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPostResponse } from 'types/api';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.BASE_URL });

const api = createApi({
  reducerPath: 'appApi',
  tagTypes: ['Newsletter'],
  baseQuery,
  endpoints: (builder) => ({
    subscribeToNewsletter: builder.mutation<IPostResponse, string>({
      query: (payload) => ({
        url: `/newsletter`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Newsletter'],
    }),
  }),
});

export const { useSubscribeToNewsletterMutation, reducerPath, reducer, middleware } = api;
