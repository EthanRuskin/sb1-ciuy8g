import { api } from '../lib/api';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const teamService = {
  async getTeamMembers() {
    const response = await api.get('/team/members');
    return response.data;
  },

  async inviteMembers(emails: string[], role: string) {
    const response = await api.post('/team/invite', { emails, role });
    return response.data;
  },

  async updateMemberRole(memberId: string, role: string) {
    const response = await api.patch(`/team/members/${memberId}`, { role });
    return response.data;
  },

  async removeMember(memberId: string) {
    await api.delete(`/team/members/${memberId}`);
  },

  async getTeamAnalytics(startDate: string, endDate: string) {
    const response = await api.get('/team/analytics', {
      params: { startDate, endDate }
    });
    return response.data;
  }
};