import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamService } from '../services/team.service';

export function useTeam() {
  const queryClient = useQueryClient();

  const { data: members, isLoading } = useQuery({
    queryKey: ['team', 'members'],
    queryFn: teamService.getTeamMembers
  });

  const inviteMembersMutation = useMutation({
    mutationFn: ({ emails, role }: { emails: string[]; role: string }) =>
      teamService.inviteMembers(emails, role),
    onSuccess: () => {
      queryClient.invalidateQueries(['team', 'members']);
    }
  });

  const updateMemberRoleMutation = useMutation({
    mutationFn: ({ memberId, role }: { memberId: string; role: string }) =>
      teamService.updateMemberRole(memberId, role),
    onSuccess: () => {
      queryClient.invalidateQueries(['team', 'members']);
    }
  });

  const removeMemberMutation = useMutation({
    mutationFn: teamService.removeMember,
    onSuccess: () => {
      queryClient.invalidateQueries(['team', 'members']);
    }
  });

  return {
    members,
    isLoading,
    inviteMembers: inviteMembersMutation.mutate,
    updateMemberRole: updateMemberRoleMutation.mutate,
    removeMember: removeMemberMutation.mutate
  };
}