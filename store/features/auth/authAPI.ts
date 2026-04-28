import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout as logoutAction,
  refreshToken as refreshTokenAction,
  updateProfile as updateProfileAction,
} from './authSlice';

interface User {
  id: string;
  email: string;
  name: string;
  role?: 'customer' | 'admin';
  isActive?: boolean;
  apiKey?: string;
  apiKeys?: Array<{
    key: string;
    name: string;
    createdAt: string;
    lastUsed?: string;
  }>;
  tier?: string;
  subscriptionStatus?: string;
  currentPeriodEnd?: string;
  createdAt?: string;
  updatedAt?: string;
  usage?: {
    requests: number;
    limit: number;
  };
}

interface Admin {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthResponse {
  token: string;
  user: User;
  admin?: Admin;
  message?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

interface UpdateProfilePayload {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

interface ApiKeyResponse {
  apiKey: string;
  message: string;
}

interface ApiKeysResponse {
  apiKeys: Array<{
    key: string;
    name: string;
    createdAt: string;
    lastUsed?: string;
  }>;
}

interface ProfileResponse {
  user: User;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.28-markets.com/api/auth',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state?.auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Profile', 'ApiKeys'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        dispatch(loginStart());
        try {
          const { data } = await queryFulfilled;
          dispatch(loginSuccess({
            accessToken: data.token,
            refreshToken: '',
            user: data.user,
            admin: data.admin
          }));

          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('auth_user', JSON.stringify(data.user));
          if (data.admin) {
            localStorage.setItem('auth_admin', JSON.stringify(data.admin));
          }
        } catch (error: any) {
          const message =
            error?.error ||
            error?.data?.message ||
            error?.data?.messages?.[0] ||
            'Login failed.';
          dispatch(loginFailure(message));
        }
      },
    }),

    register: builder.mutation<AuthResponse, RegisterPayload>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      async onQueryStarted(userData, { dispatch, queryFulfilled }) {
        dispatch(signupStart());
        try {
          const { data } = await queryFulfilled;
          dispatch(signupSuccess({
            user: data.user,
            token: data.token
          }));

          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('auth_user', JSON.stringify(data.user));
        } catch (error: any) {
          const message =
            error?.error ||
            error?.data?.message ||
            error?.data?.messages?.[0] ||
            'Registration failed.';
          dispatch(signupFailure(message));
        }
      },
    }),

    logout: builder.mutation<void, void>({
      queryFn: () => {
        return { data: undefined };
      },
      async onQueryStarted(_, { dispatch }) {
        dispatch(logoutAction());
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_admin');
        localStorage.removeItem('auth_refresh_token');
      },
    }),

    refreshToken: builder.query<{ token: string }, void>({
      query: () => '/refresh',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(refreshTokenAction(data.token));
          localStorage.setItem('auth_token', data.token);
        } catch (err) {
          console.error('Token refresh failed', err);
        }
      },
    }),

    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
      providesTags: ['Profile'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.user) {
            dispatch(updateProfileAction(data.user));
            const currentUser = JSON.parse(localStorage.getItem('auth_user') || '{}');
            localStorage.setItem('auth_user', JSON.stringify({
              ...currentUser,
              ...data.user
            }));
          }
        } catch (err) {
          console.error('Get profile failed', err);
        }
      },
    }),

    updateProfile: builder.mutation<ProfileResponse, UpdateProfilePayload>({
      query: (profileData) => ({
        url: '/profile',
        method: 'PUT',
        body: profileData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Profile'],
      async onQueryStarted(profileData, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.user) {
            dispatch(updateProfileAction(data.user));
            const currentUser = JSON.parse(localStorage.getItem('auth_user') || '{}');
            localStorage.setItem('auth_user', JSON.stringify({
              ...currentUser,
              ...data.user
            }));
          }
        } catch (err) {
          console.error('Update profile failed', err);
        }
      },
    }),

    generateApiKey: builder.mutation<ApiKeyResponse, { name?: string }>({
      query: (body) => ({
        url: '/api-key',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['ApiKeys'],
    }),

    getApiKeys: builder.query<ApiKeysResponse, void>({
      query: () => ({
        url: '/api-keys',
        method: 'GET',
      }),
      providesTags: ['ApiKeys'],
    }),

    deleteApiKey: builder.mutation<{ message: string }, { keyId: string }>({
      query: ({ keyId }) => ({
        url: `/api-key/${keyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ApiKeys'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGenerateApiKeyMutation,
  useGetApiKeysQuery,
  useDeleteApiKeyMutation,
} = authApi;