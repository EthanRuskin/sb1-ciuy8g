import { api } from '../lib/api';

export const billingService = {
  async createSubscription(priceId: string) {
    const response = await api.post('/billing/subscriptions', { priceId });
    return response.data;
  },

  async getSubscriptionStatus(subscriptionId: string) {
    const response = await api.get(`/billing/subscriptions/${subscriptionId}`);
    return response.data;
  },

  async cancelSubscription(subscriptionId: string) {
    const response = await api.post(`/billing/subscriptions/${subscriptionId}/cancel`);
    return response.data;
  },

  loadStripe() {
    return import('@stripe/stripe-js').then(module => module.loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY));
  }
};