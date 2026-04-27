import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usageReducer from '../features/usage/usageSlice';
import billingReducer from '../features/billing/billingSlice';
import themeReducer from '../themeSlice';
import { authApi } from '../features/auth/authAPI';
import { usageApi } from '../features/usage/usageAPI';
import { billingApi } from '../features/billing/billingAPI';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  usage: usageReducer,
  billing: billingReducer,
  [authApi.reducerPath]: authApi.reducer,
  [usageApi.reducerPath]: usageApi.reducer,
  [billingApi.reducerPath]: billingApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;