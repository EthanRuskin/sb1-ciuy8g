import React, { useState } from 'react';
import { ArrowLeft, Lock, CreditCard, Calendar, Shield, Brain } from 'lucide-react';

interface CheckoutPageProps {
  plan: string;
  price: string;
}

export function CheckoutPage({ plan, price }: CheckoutPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
    company: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // In a real app, this would handle payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Payment processing error:', error);
    } finally {
      setIsProcessing(false);
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
        <div className="max-w-4xl mx-auto">
          <a href="/" className="inline-flex items-center text-indigo-200 hover:text-white mb-12 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Plans
          </a>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Plan Details */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <Brain className="h-12 w-12 text-white relative" />
                </div>
                <h1 className="text-3xl font-bold text-white">Start Your Free Trial</h1>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">{plan} Plan</h2>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-white">${price}</span>
                  <span className="text-indigo-200 ml-2">/month</span>
                </div>
                <p className="text-indigo-200 mb-4">
                  14-day free trial, cancel anytime. No charges during trial period.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-indigo-200">
                    <Shield className="h-5 w-5 mr-2 text-indigo-400" />
                    Secure payment processing
                  </li>
                  <li className="flex items-center text-indigo-200">
                    <Lock className="h-5 w-5 mr-2 text-indigo-400" />
                    No commitment required
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Payment Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 h-5 w-5" />
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      className="pl-10 w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 h-5 w-5" />
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        placeholder="MM/YY"
                        className="pl-10 w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      placeholder="123"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all font-semibold transform hover:-translate-y-0.5 duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:translate-y-0"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Start Free Trial'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}