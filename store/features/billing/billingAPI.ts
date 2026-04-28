import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
import {
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  PortalSessionResponse,
  SubscriptionResponse,
  CancelSubscriptionResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
} from './billingTypes';
import {
  setSubscription,
  setBillingLoading,
  setBillingError,
  setCheckoutUrl,
  setPortalUrl,
} from './billingSlice';

const asRecord = (v: unknown): Record<string, unknown> | null =>
  v && typeof v === 'object' ? (v as Record<string, unknown>) : null;

const getString = (v: unknown): string | null => (typeof v === 'string' && v.length ? v : null);

const pickFirstString = (...values: unknown[]): string | null => {
  for (const v of values) {
    const s = getString(v);
    if (s) return s;
  }
  return null;
};

const normalizeCheckoutSessionResponse = (raw: unknown): CheckoutSessionResponse => {
  // Support common backend shapes:
  // - { authorization_url, reference, access_code }
  // - { url } (some backends return a direct url field)
  // - { data: { authorization_url, reference, access_code } }
  // - { data: { data: { authorization_url, ... }}} (Paystack raw response)
  const r1 = asRecord(raw);
  const data1 = r1 ? asRecord(r1.data) : null;
  const data2 = data1 ? asRecord(data1.data) : null;

  const authorization_url = pickFirstString(
    r1?.authorization_url,
    r1?.authorizationUrl,
    r1?.url,
    data1?.authorization_url,
    data1?.authorizationUrl,
    data1?.url,
    data2?.authorization_url,
    data2?.authorizationUrl,
    data2?.url,
  );
  const reference = pickFirstString(r1?.reference, data1?.reference, data2?.reference) ?? '';
  const access_code = pickFirstString(r1?.access_code, r1?.accessCode, data1?.access_code, data1?.accessCode, data2?.access_code, data2?.accessCode) ?? '';

  return {
    authorization_url: authorization_url ?? '',
    reference,
    access_code,
  };
};

const normalizePortalSessionResponse = (raw: unknown): PortalSessionResponse => {
  const r1 = asRecord(raw);
  const data1 = r1 ? asRecord(r1.data) : null;
  const url = pickFirstString(r1?.url, r1?.portalUrl, data1?.url, data1?.portalUrl) ?? '';
  return { url };
};

export const billingApi = createApi({
  reducerPath: 'billingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.28-markets.com/api/billing',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state?.auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Subscription'],
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<CheckoutSessionResponse, CheckoutSessionRequest>({
      query: (data) => ({
        url: '/checkout-session',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse: (raw: unknown) => normalizeCheckoutSessionResponse(raw),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        dispatch(setBillingLoading(true));
        try {
          const { data: response } = await queryFulfilled;
          dispatch(setCheckoutUrl(response.authorization_url || null));
          dispatch(setBillingError(null));
        } catch (error: any) {
          const message = error?.data?.error || error?.error || 'Failed to create checkout session';
          dispatch(setBillingError(message));
        } finally {
          dispatch(setBillingLoading(false));
        }
      },
    }),

    createPortalSession: builder.mutation<PortalSessionResponse, void>({
      query: () => ({
        url: '/portal-session',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse: (raw: unknown) => normalizePortalSessionResponse(raw),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setBillingLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setPortalUrl(data.url || null));
          dispatch(setBillingError(null));
        } catch (error: any) {
          const message = error?.data?.error || error?.error || 'Failed to create portal session';
          dispatch(setBillingError(message));
        } finally {
          dispatch(setBillingLoading(false));
        }
      },
    }),

    getSubscription: builder.query<SubscriptionResponse, void>({
      query: () => ({
        url: '/subscription',
        method: 'GET',
      }),
      providesTags: ['Subscription'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setBillingLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setSubscription(data));
          dispatch(setBillingError(null));
        } catch (error: any) {
          const message = error?.data?.error || error?.error || 'Failed to load subscription';
          dispatch(setBillingError(message));
        } finally {
          dispatch(setBillingLoading(false));
        }
      },
    }),

    cancelSubscription: builder.mutation<CancelSubscriptionResponse, void>({
      query: () => ({
        url: '/cancel',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Subscription'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setBillingLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setSubscription({
            tier: data.tier,
            subscriptionStatus: data.subscriptionStatus,
            isActive: data.subscriptionStatus === 'active',
          }));
          dispatch(setBillingError(null));
        } catch (error: any) {
          const message = error?.data?.error || error?.error || 'Failed to cancel subscription';
          dispatch(setBillingError(message));
        } finally {
          dispatch(setBillingLoading(false));
        }
      },
    }),

    verifyPayment: builder.query<VerifyPaymentResponse, VerifyPaymentRequest>({
      query: ({ reference }) => ({
        url: `/paystack/callback?reference=${reference}&trxref=${reference}`,
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setBillingLoading(true));
        try {
          const { data } = await queryFulfilled;
          if (data.status && data.data) {
            dispatch(setSubscription({
              tier: data.data.tier,
              subscriptionStatus: data.data.subscriptionStatus,
              isActive: data.data.subscriptionStatus === 'active',
              currentPeriodEnd: data.data.currentPeriodEnd,
            }));
          }
          dispatch(setBillingError(null));
        } catch (error: any) {
          const message = error?.data?.error || error?.error || 'Payment verification failed';
          dispatch(setBillingError(message));
        } finally {
          dispatch(setBillingLoading(false));
        }
      },
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useCreatePortalSessionMutation,
  useGetSubscriptionQuery,
  useCancelSubscriptionMutation,
  useLazyGetSubscriptionQuery,
  useVerifyPaymentQuery,
  useLazyVerifyPaymentQuery,
} = billingApi;