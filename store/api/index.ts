import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.BASE_API_URL });

type HttpReqType = 'PUT' | 'POST' | 'GET' | 'DELETE';

function getQuery<Payload>(
  url: string,
  payload?: Payload,
  reqType: HttpReqType = 'POST',
): FetchArgs {
  return {
    url: `/api/${url}`,
    method: reqType,
    body: payload,
  };
}

const api = createApi({
  reducerPath: 'globalApi',
  tagTypes: ['Newsletter', 'Authentication', 'Passwords', 'Cart', 'User'],
  baseQuery,
  endpoints: (builder) => ({
    subscribeToNewsletter: builder.mutation<BaseApiResponse, EmailPayload>({
      query: (payload) => getQuery<EmailPayload>('newsletter', payload),
      invalidatesTags: ['Newsletter'],
    }),
    signUp: builder.mutation<BaseApiResponse, SignUpPayload>({
      query: (payload) => getQuery('auth/signup', payload),
      invalidatesTags: ['Authentication'],
    }),
    forgotPassword: builder.mutation<BaseApiResponse, EmailPayload>({
      query: (payload) => getQuery('auth/forgotPassword', payload),
      invalidatesTags: ['Authentication', 'Passwords'],
    }),
    resetPassword: builder.mutation<BaseApiResponse | EmailPayload, ResetPasswordPayload>({
      query: (payload) => getQuery('auth/resetPassword', payload, 'PUT'),
      invalidatesTags: ['Authentication', 'Passwords'],
    }),
    validateEmail: builder.mutation<BaseApiResponse, ValidateEmailPayload>({
      query: (payload) => getQuery('auth/validateEmail', payload, 'PUT'),
      invalidatesTags: ['Authentication'],
    }),
    updateCart: builder.mutation<CartProduct[], CartProduct[]>({
      query: (payload) => getQuery('cart/update', payload),
      invalidatesTags: ['Cart'],
    }),
    postCart: builder.mutation<BaseApiResponse, PostCartPayload>({
      query: (payload) => getQuery('cart/add', payload),
      invalidatesTags: ['Cart'],
    }),
    postAddress: builder.mutation<BaseApiResponse, PostAddressPayload>({
      query: (payload) => getQuery('user/addAddress', payload),
      invalidatesTags: ['User'],
    }),
    deleteAddress: builder.mutation<BaseApiResponse, DeleteAddressPayload>({
      query: (payload) => getQuery('user/deleteAddress', payload, 'DELETE'),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSubscribeToNewsletterMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useValidateEmailMutation,
  useUpdateCartMutation,
  usePostCartMutation,
  usePostAddressMutation,
  useDeleteAddressMutation,
  ...globalApi
} = api;
