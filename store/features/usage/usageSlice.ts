import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { UsageState, ProfileUsageResponse, ApiKeyUsageResponse } from './usageTypes';

const initialState: UsageState = {
  profileUsage: null,
  currentApiKeyUsage: null,
  isLoading: false,
  error: null,
  selectedMonth: null,
  selectedYear: null,
};

const usageSlice = createSlice({
  name: 'usage',
  initialState,
  reducers: {
    setProfileUsage: (state, action: PayloadAction<ProfileUsageResponse>) => {
      state.profileUsage = action.payload;
    },
    setCurrentApiKeyUsage: (state, action: PayloadAction<ApiKeyUsageResponse>) => {
      state.currentApiKeyUsage = action.payload;
    },
    setUsageLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUsageError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSelectedMonth: (state, action: PayloadAction<number | null>) => {
      state.selectedMonth = action.payload;
    },
    setSelectedYear: (state, action: PayloadAction<number | null>) => {
      state.selectedYear = action.payload;
    },
    clearUsageData: (state) => {
      state.profileUsage = null;
      state.currentApiKeyUsage = null;
      state.error = null;
    },
    clearCurrentApiKeyUsage: (state) => {
      state.currentApiKeyUsage = null;
    },
  },
});

export const {
  setProfileUsage,
  setCurrentApiKeyUsage,
  setUsageLoading,
  setUsageError,
  setSelectedMonth,
  setSelectedYear,
  clearUsageData,
  clearCurrentApiKeyUsage,
} = usageSlice.actions;

export const selectProfileUsage = (state: RootState) => state.usage.profileUsage;
export const selectCurrentApiKeyUsage = (state: RootState) => state.usage.currentApiKeyUsage;
export const selectUsageLoading = (state: RootState) => state.usage.isLoading;
export const selectUsageError = (state: RootState) => state.usage.error;
export const selectSelectedMonth = (state: RootState) => state.usage.selectedMonth;
export const selectSelectedYear = (state: RootState) => state.usage.selectedYear;

export default usageSlice.reducer;