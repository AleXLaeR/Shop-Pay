import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.BASE_API_URL });

const api = createApi({
  reducerPath: 'globalApi',
  tagTypes: ['Newsletter', 'Authentication'],
  baseQuery,
  endpoints: (builder) => ({
    subscribeToNewsletter: builder.mutation<BaseApiResponse, string>({
      query: (payload) => ({
        url: `api/newsletter`,
        method: 'POST',
        body: { email: payload },
      }),
      invalidatesTags: ['Newsletter'],
    }),
    signUp: builder.mutation<BaseApiResponse, SignUpPayload>({
      query: (payload) => ({
        url: `api/auth/signup`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Authentication'],
    }),
  }),
});

export const { useSubscribeToNewsletterMutation, useSignUpMutation, ...globalApi } = api;
