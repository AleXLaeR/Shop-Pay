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
  tagTypes: ['Newsletter', 'Authentication', 'Passwords', 'Cart', 'User', 'Checkout', 'Payment'],
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
    postCart: builder.mutation<BaseApiResponse, CartProduct[]>({
      query: (payload) => getQuery('cart/add', payload),
      invalidatesTags: ['Cart'],
    }),
    postAddress: builder.mutation<BaseApiResponse, UserAddress>({
      query: (payload) => getQuery('user/addAddress', payload),
      invalidatesTags: ['User'],
    }),
    deleteAddress: builder.mutation<BaseApiResponse, string>({
      query: (payload) => getQuery('user/deleteAddress', payload, 'DELETE'),
      invalidatesTags: ['User'],
    }),
    addCoupon: builder.mutation<BaseApiResponse, CouponModel>({
      query: (payload) => getQuery('coupon/add', payload),
      invalidatesTags: ['Checkout'],
    }),
    applyCoupon: builder.mutation<ApplyCouponResponse, string>({
      query: (payload) => getQuery('user/applyCoupon', payload, 'PUT'),
      invalidatesTags: ['Checkout'],
    }),
    addOrder: builder.mutation<BaseApiResponse, Partial<OrderModel>>({
      query: (payload) => getQuery('order/add', payload),
      invalidatesTags: ['Checkout'],
    }),
    payWithPayPal: builder.mutation<BaseApiResponse, PayPalOrderPayload & { orderId: string }>({
      query: (payload) => getQuery(`order/${payload.orderId}/payWithPayPal`, payload, 'PUT'),
      invalidatesTags: ['Payment'],
    }),
    payWithStripe: builder.mutation<StripeOrderResponse, StripeOrderPayload & { orderId: string }>({
      query: (payload) => getQuery(`order/${payload.orderId}/payWithStripe`, payload, 'PUT'),
      invalidatesTags: ['Payment'],
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
  usePayWithStripeMutation,
  useAddCouponMutation,
  usePayWithPayPalMutation,
  useAddOrderMutation,
  useApplyCouponMutation,
  ...globalApi
} = api;
