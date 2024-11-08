import React from 'react';
import { ArrowLeft, Rocket, Shield, Users, Brain } from 'lucide-react';

export function GetStartedPage() {
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
        <div className="max-w-7xl mx-auto">
          <a href="/" className="inline-flex items-center text-indigo-200 hover:text-white mb-12 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </a>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <Brain className="h-12 w-12 text-white relative" />
                </div>
                <h1 className="text-4xl font-bold text-white">
                  Get Started with SalesAI Pro
                </h1>
              </div>
              <p className="text-xl text-indigo-200 mb-8">
                Complete the form to start your free trial and transform your sales team with AI-powered intelligence.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mr-4">
                    <Rocket className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Quick Setup</h3>
                    <p className="text-indigo-200">Be up and running in less than 10 minutes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mr-4">
                    <Shield className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">No Credit Card Required</h3>
                    <p className="text-indigo-200">Try all features free for 14 days</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mr-4">
                    <Users className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Team Collaboration</h3>
                    <p className="text-indigo-200">Invite your entire sales team</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Create Your Account</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-indigo-200 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-indigo-200 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="workEmail" className="block text-sm font-medium text-indigo-200 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="workEmail"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-indigo-200 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-indigo-200 mb-1">
                    Team Size
                  </label>
                  <select
                    id="teamSize"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    required
                  >
                    <option value="" className="bg-gray-900">Select team size</option>
                    <option value="1-10" className="bg-gray-900">1-10 employees</option>
                    <option value="11-50" className="bg-gray-900">11-50 employees</option>
                    <option value="51-200" className="bg-gray-900">51-200 employees</option>
                    <option value="201+" className="bg-gray-900">201+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-indigo-300 rounded bg-white/10"
                    />
                    <span className="ml-2 text-sm text-indigo-200">
                      I agree to the Terms of Service and Privacy Policy
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all font-semibold transform hover:-translate-y-0.5 duration-200"
                >
                  Start Free Trial
                </button>

                <p className="text-sm text-center text-indigo-200">
                  Already have an account?{' '}
                  <a href="/login" className="font-medium text-white hover:text-indigo-300 transition-colors">
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}