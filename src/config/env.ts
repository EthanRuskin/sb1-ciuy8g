interface EnvConfig {
  apiUrl: string;
  apiKey: string;
  environment: string;
}

export const env: EnvConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  apiKey: import.meta.env.VITE_API_KEY || '',
  environment: import.meta.env.VITE_ENVIRONMENT || 'development'
};