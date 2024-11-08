import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { callService } from '../services/call.service';

export function useCalls(filters?: {
  status?: string;
  sentiment?: string;
  startDate?: string;
  endDate?: string;
}) {
  const queryClient = useQueryClient();

  const { data: calls, isLoading } = useQuery({
    queryKey: ['calls', filters],
    queryFn: () => callService.getCalls(filters)
  });

  const createCallMutation = useMutation({
    mutationFn: callService.createCall,
    onSuccess: () => {
      queryClient.invalidateQueries(['calls']);
    }
  });

  const addNoteMutation = useMutation({
    mutationFn: ({ callId, content }: { callId: string; content: string }) =>
      callService.addNote(callId, content),
    onSuccess: () => {
      queryClient.invalidateQueries(['calls']);
    }
  });

  const addTagMutation = useMutation({
    mutationFn: ({ callId, name }: { callId: string; name: string }) =>
      callService.addTag(callId, name),
    onSuccess: () => {
      queryClient.invalidateQueries(['calls']);
    }
  });

  const deleteCallMutation = useMutation({
    mutationFn: callService.deleteCall,
    onSuccess: () => {
      queryClient.invalidateQueries(['calls']);
    }
  });

  return {
    calls,
    isLoading,
    createCall: createCallMutation.mutate,
    addNote: addNoteMutation.mutate,
    addTag: addTagMutation.mutate,
    deleteCall: deleteCallMutation.mutate
  };
}