import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Brain, BarChart2, Shield, MessageSquare, Gauge } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "Real-Time AI Assistant",
      description: "Get intelligent suggestions and insights during live calls to improve conversion rates and enhance your sales performance."
    },
    {
      icon: BarChart2,
      title: "Advanced Analytics",
      description: "Track performance metrics and gain actionable insights with customizable dashboards that help you make data-driven decisions."
    },
    {
      icon: MessageSquare,
      title: "Smart Call Transcription",
      description: "Automatic transcription with sentiment analysis and key topic identification to help you focus on meaningful conversations."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with industry security standards to keep your sensitive data protected at all times."
    },
    {
      icon: Gauge,
      title: "Performance Optimization",
      description: "AI-driven recommendations to improve sales techniques and outcomes based on successful patterns and best practices."
    },
    {
      icon: Zap,
      title: "Seamless Integration",
      description: "Easy integration with your existing CRM and sales tools to maintain a streamlined workflow and maximize productivity."
    }
  ];

  return (
    <section id="features" className="relative min-h-screen py-40 overflow-hidden bg-gradient-to-b from-gray-950 via-indigo-950 to-purple-950">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white rounded-full animate-float opacity-20 ${
                i % 2 === 0 ? 'animation-delay-2000' : 'animation-delay-4000'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 -right-1/4 w-[800px] h-[800px] bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/2 left-1/3 w-[800px] h-[800px] bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgMjAgMTAgTSAxMCAwIEwgMTAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Hero Content */}
        <div className="text-center mb-32">
          <div className="inline-flex items-center justify-center p-2 bg-white/5 backdrop-blur-sm rounded-full mb-8 border border-white/10 hover:border-white/20 transition-colors">
            <span className="px-4 py-1.5 text-sm font-medium text-indigo-200">
              Powered by Advanced AI Technology
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
            Transform Your Sales Process
          </h1>
          <p className="text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto mb-12 leading-relaxed">
            Everything you need to transform your sales team into a high-performing revenue engine
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              to="/get-started"
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg transition-all transform hover:-translate-y-0.5 duration-200 shadow-lg hover:shadow-indigo-500/25 text-lg font-semibold overflow-hidden"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 skew-x-[-20deg] animate-shimmer"></div>
              Get Started Free
            </Link>
            <Link
              to="/schedule-demo"
              className="group relative px-8 py-4 bg-white/10 text-white rounded-lg transition-all transform hover:-translate-y-0.5 duration-200 backdrop-blur-sm text-lg font-semibold border border-white/10 hover:border-white/20"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 skew-x-[-20deg] animate-shimmer"></div>
              Schedule a Demo
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm p-10 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-lg text-indigo-200 leading-relaxed">{feature.description}</p>
                
                {/* Hover Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/50 to-purple-500/50 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-950 to-transparent"></div>
      </div>
    </section>
  );
}