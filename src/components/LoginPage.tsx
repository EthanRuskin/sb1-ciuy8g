import React, { useState } from 'react';
import { ArrowLeft, Brain, Lock, Mail, Building2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, name: string, role: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('personal_sales');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      if (password.length < 6) {
        throw new Error('Invalid credentials');
      }

      // Extract name from email for demo
      const name = email.split('@')[0];
      onLogin(email, name, role);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 -right-1/4 w-[800px] h-[800px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/2 left-1/3 w-[800px] h-[800px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgMjAgMTAgTSAxMCAwIEwgMTAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      </div>

      <div className="relative py-16 px-6">
        <div className="max-w-md mx-auto">
          <a href="/" className="inline-flex items-center text-indigo-200 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </a>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <Brain className="h-12 w-12 text-white relative" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mt-4 mb-2 text-white">Welcome back</h1>
            <p className="text-indigo-200">Sign in to your SalesAI Pro account</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 text-red-200 rounded-lg text-sm border border-red-500/20">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-indigo-200 mb-1">
                  Account Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-indigo-300" />
                  </div>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="pl-10 w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                  >
                    <option value="personal_sales">Personal Sales (Standard Plan)</option>
                    <option value="sales_rep">Team Sales Representative</option>
                    <option value="team_leader">Team Leader</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-indigo-300" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                    placeholder="you@company.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-indigo-200 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-indigo-300" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-indigo-300 rounded bg-white/10"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-indigo-200">
                    Remember me
                  </label>
                </div>
                <button 
                  type="button"
                  onClick={() => alert('Reset password functionality would be implemented here')}
                  className="text-sm font-medium text-indigo-300 hover:text-white transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all font-semibold disabled:opacity-50 transform hover:-translate-y-0.5 duration-200"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-indigo-200">
                Don't have an account?{' '}
                <a href="/get-started" className="font-medium text-white hover:text-indigo-300 transition-colors">
                  Start your free trial
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}