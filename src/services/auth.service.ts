import { api } from '../lib/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
  role?: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  async logout() {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  }
};