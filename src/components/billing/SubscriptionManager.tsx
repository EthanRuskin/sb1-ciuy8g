import React, { useState } from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { CreditCard, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  subscriptionId?: string;
  onSubscriptionCreated?: () => void;
}

export function SubscriptionManager({ subscriptionId, onSubscriptionCreated }: Props) {
  const [selectedPlan, setSelectedPlan] = useState('');
  const {
    subscription,
    isLoading,
    createSubscription,
    cancelSubscription,
    isCreating,
    isCancelling
  } = useSubscription(subscriptionId);

  const handleSubscribe = async () => {
    try {
      const stripe = await billingService.loadStripe();
      if (!stripe) throw new Error('Stripe failed to load');

      const { data } = await createSubscription(selectedPlan);
      
      const { error } = await stripe.confirmCardPayment(data.clientSecret);
      if (error) throw error;

      onSubscriptionCreated?.();
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  if (isLoading) {
    return <div>Loading subscription details...</div>;
  }

  return (
    <div className="space-y-6">
      {subscription ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">Current Subscription</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${
              subscription.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {subscription.status}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Current Period Ends</p>
                <p className="font-medium text-black">
                  {new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>

            <button
              onClick={() => cancelSubscription(subscriptionId)}
              disabled={isCancelling}
              className="text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                id: 'price_standard',
                name: 'Standard',
                price: '$25',
                features: ['Feature 1', 'Feature 2', 'Feature 3']
              },
              {
                id: 'price_pro',
                name: 'Professional',
                price: '$50',
                features: ['All Standard features', 'Feature 4', 'Feature 5']
              },
              {
                id: 'price_enterprise',
                name: 'Enterprise',
                price: '$100',
                features: ['All Pro features', 'Feature 6', 'Feature 7']
              }
            ].map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-lg p-6 border-2 transition-colors ${
                  selectedPlan === plan.id
                    ? 'border-indigo-600'
                    : 'border-gray-200'
                }`}
              >
                <h3 className="text-lg font-semibold text-black mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-black mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-black">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-2 rounded-lg transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>

          {selectedPlan && (
            <button
              onClick={handleSubscribe}
              disabled={isCreating}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isCreating ? 'Processing...' : 'Subscribe Now'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}