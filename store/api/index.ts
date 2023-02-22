import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.BASE_API_URL });

function getQuery<T>(url: string, payload: T): FetchArgs {
  return {
    url: `/api/${url}`,
    method: 'POST',
    body: payload,
  };
}

const api = createApi({
  reducerPath: 'globalApi',
  tagTypes: ['Newsletter', 'Authentication'],
  baseQuery,
  endpoints: (builder) => ({
    subscribeToNewsletter: builder.mutation<BaseApiResponse, EmailPayload>({
      query: (payload) => getQuery<EmailPayload>('newsletter', payload),
      invalidatesTags: ['Newsletter'],
    }),
    signUp: builder.mutation<BaseApiResponse, SignUpPayload>({
      query: (payload) => getQuery<SignUpPayload>('auth/signup', payload),
      invalidatesTags: ['Authentication'],
    }),
    forgotPassword: builder.mutation<BaseApiResponse, EmailPayload>({
      query: (payload) => getQuery<EmailPayload>('auth/forgotPassword', payload),
      invalidatesTags: ['Authentication'],
    }),
    resetPassword: builder.mutation<BaseApiResponse, any>({
      query: (payload) => getQuery<any>('auth/resetPassword', payload),
      invalidatesTags: ['Authentication'],
    }),
  }),
});

export const {
  useSubscribeToNewsletterMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  ...globalApi
} = api;
