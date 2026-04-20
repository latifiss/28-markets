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
} from './authSlice';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  token: string;
  user: User;
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
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:6060/api/auth',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state?.auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
            user: data.user
          }));

          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('auth_user', JSON.stringify(data.user));
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
      },
    }),

    refreshToken: builder.query<{ token: string }, void>({
      query: () => 'refresh',
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
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenQuery,
} = authApi;
