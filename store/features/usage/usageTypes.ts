export interface ApiKey {
  id: string;
  key: string;
  createdAt: string;
  description?: string;
  revoked?: boolean;
}

export interface UsageRecord {
  apiKey: string;
  apiKeyCreatedAt: string;
  endpoint: string;
  method: string;
  month: number;
  year: number;
  count: number;
}

export interface ApiKeyUsageRecord {
  _id: string;
  apiKeyId: string;
  endpoint: string;
  method: string;
  month: number;
  year: number;
  count: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileUsageResponse {
  userId: string;
  keys: ApiKey[];
  usage: UsageRecord[];
}

export interface ApiKeyUsageResponse {
  apiKey: string;
  apiKeyId: string;
  createdAt: string;
  usage: ApiKeyUsageRecord[];
}

export interface GetUsageParams {
  month?: number;
  year?: number;
}

export interface GetApiKeyUsageParams {
  key: string;
  month?: number;
  year?: number;
}

export interface UsageState {
  profileUsage: ProfileUsageResponse | null;
  currentApiKeyUsage: ApiKeyUsageResponse | null;
  isLoading: boolean;
  error: string | null;
  selectedMonth: number | null;
  selectedYear: number | null;
}