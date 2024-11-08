import React, { useState } from 'react';
import { ArrowLeft, Building2, Users, MessageSquare, Send } from 'lucide-react';

export function EnterpriseContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    teamSize: '',
    requirements: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Thank you for your interest! Our sales team will contact you shortly.');
      window.location.href = '/';
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-indigo-950 to-purple-950 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="inline-flex items-center text-gray-300 hover:text-white mb-12">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Plans
        </a>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Information */}
          <div>
            <h1 className="text-3xl font-bold mb-6 text-white">Enterprise Solutions</h1>
            <p className="text-xl text-indigo-200 mb-8">
              Get a custom solution tailored to your organization's specific needs.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">Custom Implementation</h3>
                  <p className="text-indigo-200">Tailored solution designed for your specific workflow</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">Dedicated Support</h3>
                  <p className="text-indigo-200">Personal account manager and priority support</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">Custom Training</h3>
                  <p className="text-indigo-200">Personalized onboarding and training sessions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Team Size
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                  required
                >
                  <option value="">Select team size</option>
                  <option value="50-100">50-100 employees</option>
                  <option value="101-500">101-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Requirements & Notes
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Contact Sales Team
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}