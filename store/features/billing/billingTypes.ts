export type PlanTier = 'free' | 'pro' | 'business';

export interface UserSubscription {
  tier: PlanTier;
  subscriptionStatus: 'active' | 'past_due' | 'canceled' | 'incomplete';
  currentPeriodEnd?: string;
  stripeCustomerId?: string;
}

export interface CheckoutSessionRequest {
  tier: Exclude<PlanTier, 'free'>;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutSessionResponse {
  authorization_url: string;
  reference: string;
  access_code: string;
}

export interface PortalSessionResponse {
  url: string;
}

export interface SubscriptionResponse {
  tier: PlanTier;
  subscriptionStatus: string;
  currentPeriodEnd?: string;
  isActive: boolean;
}

export interface CancelSubscriptionResponse {
  message: string;
  tier: PlanTier;
  subscriptionStatus: string;
}

export interface BillingState {
  subscription: SubscriptionResponse | null;
  isLoading: boolean;
  error: string | null;
  checkoutUrl: string | null;
  portalUrl: string | null;
}

export interface PaystackCallbackParams {
  reference: string;
  trxref: string;
}

export interface VerifyPaymentRequest {
  reference: string;
}

export interface VerifyPaymentResponse {
  status: boolean;
  message: string;
  data?: {
    tier: PlanTier;
    subscriptionStatus: string;
    currentPeriodEnd: string;
  };
}