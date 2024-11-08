import { api } from '../lib/api';

interface CallFilters {
  status?: string;
  sentiment?: string;
  startDate?: string;
  endDate?: string;
}

export const callService = {
  async createCall(formData: FormData) {
    const response = await api.post('/calls', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async getCalls(filters?: CallFilters) {
    const response = await api.get('/calls', { params: filters });
    return response.data;
  },

  async getCall(id: string) {
    const response = await api.get(`/calls/${id}`);
    return response.data;
  },

  async addNote(callId: string, content: string) {
    const response = await api.post(`/calls/${callId}/notes`, { content });
    return response.data;
  },

  async addTag(callId: string, name: string) {
    const response = await api.post(`/calls/${callId}/tags`, { name });
    return response.data;
  },

  async deleteCall(id: string) {
    await api.delete(`/calls/${id}`);
  }
};