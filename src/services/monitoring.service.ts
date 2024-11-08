import { api } from '../lib/api';

interface CallMetrics {
  sentiment: string;
  talkRatio: {
    agent: number;
    customer: number;
  };
  engagement: number;
}

export const monitoringService = {
  async startMonitoring(callId: string) {
    const response = await api.post(`/calls/${callId}/monitor/start`);
    return response.data;
  },

  async stopMonitoring(callId: string) {
    const response = await api.post(`/calls/${callId}/monitor/stop`);
    return response.data;
  },

  async getCallMetrics(callId: string): Promise<CallMetrics> {
    const response = await api.get(`/calls/${callId}/metrics`);
    return response.data;
  },

  async updateCallStatus(callId: string, status: string) {
    const response = await api.patch(`/calls/${callId}/status`, { status });
    return response.data;
  }
};