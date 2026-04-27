import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { BillingState, SubscriptionResponse } from './billingTypes';

const initialState: BillingState = {
  subscription: null,
  isLoading: false,
  error: null,
  checkoutUrl: null,
  portalUrl: null,
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    setSubscription: (state, action: PayloadAction<SubscriptionResponse>) => {
      state.subscription = action.payload;
    },
    setBillingLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setBillingError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCheckoutUrl: (state, action: PayloadAction<string | null>) => {
      state.checkoutUrl = action.payload;
    },
    setPortalUrl: (state, action: PayloadAction<string | null>) => {
      state.portalUrl = action.payload;
    },
    clearBillingData: (state) => {
      state.subscription = null;
      state.checkoutUrl = null;
      state.portalUrl = null;
      state.error = null;
    },
    updateSubscriptionAfterPayment: (state, action: PayloadAction<SubscriptionResponse>) => {
      state.subscription = action.payload;
    },
  },
});

export const {
  setSubscription,
  setBillingLoading,
  setBillingError,
  setCheckoutUrl,
  setPortalUrl,
  clearBillingData,
  updateSubscriptionAfterPayment,
} = billingSlice.actions;

export const selectSubscription = (state: RootState) => state.billing.subscription;
export const selectBillingLoading = (state: RootState) => state.billing.isLoading;
export const selectBillingError = (state: RootState) => state.billing.error;
export const selectCheckoutUrl = (state: RootState) => state.billing.checkoutUrl;
export const selectPortalUrl = (state: RootState) => state.billing.portalUrl;
export const selectIsProOrBusiness = (state: RootState) => {
  const tier = state.billing.subscription?.tier;
  return tier === 'pro' || tier === 'business';
};
export const selectIsFree = (state: RootState) => {
  return state.billing.subscription?.tier === 'free';
};

export default billingSlice.reducer;