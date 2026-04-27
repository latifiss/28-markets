 "use client";

import React from 'react';
import {
  useGetSubscriptionQuery,
  useCreateCheckoutSessionMutation,
  useCancelSubscriptionMutation,
} from '@/store/features/billing/billingAPI';
import { selectIsProOrBusiness, selectIsFree } from '@/store/features/billing/billingSlice';
import { useSelector } from 'react-redux';

const BillingComponent = () => {
  const { data: subscription, isLoading, refetch } = useGetSubscriptionQuery();
  const [createCheckoutSession, { isLoading: checkoutLoading }] = useCreateCheckoutSessionMutation();
  const [cancelSubscription, { isLoading: cancelLoading }] = useCancelSubscriptionMutation();
  
  const isProOrBusiness = useSelector(selectIsProOrBusiness);
  const isFree = useSelector(selectIsFree);
  
  const handleUpgrade = async (tier: 'pro' | 'business') => {
    try {
      const result = await createCheckoutSession({ tier }).unwrap();
      if (result.authorization_url) {
        window.location.href = result.authorization_url;
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error);
    }
  };
  
  const handleCancel = async () => {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      try {
        await cancelSubscription().unwrap();
        await refetch();
      } catch (error) {
        console.error('Failed to cancel subscription:', error);
      }
    }
  };
  
  if (isLoading) return <div>Loading subscription data...</div>;
  
  return (
    <div>
      <h3>Current Plan: {subscription?.tier || 'free'}</h3>
      <p>Status: {subscription?.subscriptionStatus}</p>
      {subscription?.currentPeriodEnd && (
        <p>Current period ends: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>
      )}
      
      {isFree && (
        <div>
          <button onClick={() => handleUpgrade('pro')} disabled={checkoutLoading}>
            Upgrade to Pro
          </button>
          <button onClick={() => handleUpgrade('business')} disabled={checkoutLoading}>
            Upgrade to Business
          </button>
        </div>
      )}
      
      {isProOrBusiness && (
        <button onClick={handleCancel} disabled={cancelLoading}>
          Cancel Subscription
        </button>
      )}
    </div>
  );
};

export default BillingComponent;