import React from 'react';
import { TrendingUp, Clock, Users, DollarSign } from 'lucide-react';

export function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-32 overflow-hidden bg-gradient-to-b from-purple-950 via-indigo-950 to-gray-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_-20%,rgba(99,102,241,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_-20%,rgba(139,92,246,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Why Choose SalesAI Pro
          </h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Transform your sales process and drive better results with AI-powered intelligence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "45%", label: "Increase in conversion rates" },
              { value: "3x", label: "Faster deal closure" },
              { value: "60%", label: "Time saved on call analysis" },
              { value: "92%", label: "Customer satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="group relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
                <div className="relative">
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-indigo-200">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Key Benefits */}
          <div className="space-y-8">
            {[
              {
                icon: TrendingUp,
                title: "Increased Revenue",
                description: "Drive more sales and boost revenue with AI-powered insights and real-time assistance during calls."
              },
              {
                icon: Clock,
                title: "Time Efficiency",
                description: "Automate call analysis and get instant insights, allowing your team to focus on what matters most."
              },
              {
                icon: Users,
                title: "Team Enhancement",
                description: "Improve team performance with personalized coaching and data-driven training recommendations."
              },
              {
                icon: DollarSign,
                title: "ROI Optimization",
                description: "Maximize your return on investment with improved conversion rates and operational efficiency."
              }
            ].map((benefit, index) => (
              <div key={index} className="flex gap-4 group">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-indigo-500 to-purple-500 transform group-hover:scale-110 transition-transform">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{benefit.title}</h3>
                  <p className="text-indigo-200">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}