import { useQuery, useMutation } from '@tanstack/react-query';
import { billingService } from '../services/billing.service';

export function useSubscription(subscriptionId?: string) {
  const { data: subscription, isLoading } = useQuery({
    queryKey: ['subscription', subscriptionId],
    queryFn: () => subscriptionId ? billingService.getSubscriptionStatus(subscriptionId) : null,
    enabled: !!subscriptionId
  });

  const createSubscriptionMutation = useMutation({
    mutationFn: billingService.createSubscription
  });

  const cancelSubscriptionMutation = useMutation({
    mutationFn: billingService.cancelSubscription
  });

  return {
    subscription,
    isLoading,
    createSubscription: createSubscriptionMutation.mutate,
    cancelSubscription: cancelSubscriptionMutation.mutate,
    isCreating: createSubscriptionMutation.isPending,
    isCancelling: cancelSubscriptionMutation.isPending
  };
}