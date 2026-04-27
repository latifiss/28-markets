import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
import {
  ProfileUsageResponse,
  ApiKeyUsageResponse,
  GetUsageParams,
  GetApiKeyUsageParams,
} from './usageTypes';
import {
  setProfileUsage,
  setCurrentApiKeyUsage,
  setUsageLoading,
  setUsageError,
} from './usageSlice';

export const usageApi = createApi({
  reducerPath: 'usageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:6060/api/usage',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state?.auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['ProfileUsage', 'ApiKeyUsage'],
  endpoints: (builder) => ({
    getProfileUsage: builder.query<ProfileUsageResponse, GetUsageParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.month) searchParams.append('month', params.month.toString());
        if (params.year) searchParams.append('year', params.year.toString());
        return {
          url: '/profile',
          method: 'GET',
          params: searchParams,
        };
      },
      providesTags: ['ProfileUsage'],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        dispatch(setUsageLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfileUsage(data));
          dispatch(setUsageError(null));
        } catch (error: any) {
          const message = error?.data?.error || error?.error || 'Failed to load profile usage';
          dispatch(setUsageError(message));
        } finally {
          dispatch(setUsageLoading(false));
        }
      },
    }),

    getApiKeyUsage: builder.query<ApiKeyUsageResponse, GetApiKeyUsageParams>({
      query: ({ key, month, year }) => {
        const searchParams = new URLSearchParams();
        if (month) searchParams.append('month', month.toString());
        if (year) searchParams.append('year', year.toString());
        return {
          url: `/api-key/${key}`,
          method: 'GET',
          params: searchParams,
        };
      },
      providesTags: (result, error, { key }) => [{ type: 'ApiKeyUsage', id: key }],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        dispatch(setUsageLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentApiKeyUsage(data));
          dispatch(setUsageError(null));
        } catch (error: any) {
          const message = error?.data?.error || error?.error || 'Failed to load API key usage';
          dispatch(setUsageError(message));
        } finally {
          dispatch(setUsageLoading(false));
        }
      },
    }),
  }),
});

export const {
  useGetProfileUsageQuery,
  useGetApiKeyUsageQuery,
  useLazyGetProfileUsageQuery,
  useLazyGetApiKeyUsageQuery,
} = usageApi;