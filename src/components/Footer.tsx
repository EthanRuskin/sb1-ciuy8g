import React from 'react';
import { Brain, Mail, Phone, Star } from 'lucide-react';

export function Footer() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      setIsScrolled(scrollPosition > pageHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={`relative transition-all duration-300 ${
      isScrolled 
        ? 'bg-gradient-to-b from-gray-900 to-indigo-900'
        : 'bg-gradient-to-b from-indigo-950 to-purple-950'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_-20%,rgba(99,102,241,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_-20%,rgba(139,92,246,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <Brain className="h-8 w-8 text-white relative" />
              </div>
              <span className="text-xl font-bold text-white">SalesAI Pro</span>
            </div>
            <p className="text-indigo-200">
              Transform your sales process with AI-powered intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6 text-white/90">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { id: 'features', label: 'Features' },
                { id: 'benefits', label: 'Benefits' },
                { id: 'pricing', label: 'Pricing' }
              ].map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className="text-indigo-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-6 text-white/90">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:support@salesai.pro" 
                  className="flex items-center gap-2 text-indigo-200 hover:text-white transition-colors group"
                >
                  <Mail className="h-4 w-4 group-hover:text-purple-400 transition-colors" />
                  support@salesai.pro
                </a>
              </li>
              <li>
                <a 
                  href="tel:+1-647-922-5436" 
                  className="flex items-center gap-2 text-indigo-200 hover:text-white transition-colors group"
                >
                  <Phone className="h-4 w-4 group-hover:text-purple-400 transition-colors" />
                  +1 (647) 922-5436
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-semibold mb-6 text-white/90">Get in Touch</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/5 border border-indigo-200/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-indigo-200/60 transition-colors"
              />
              <textarea
                placeholder="Your message"
                rows={3}
                className="w-full px-4 py-2 bg-white/5 border border-indigo-200/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-indigo-200/60 transition-colors"
              />
              <button
                type="submit"
                className="w-full px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-indigo-200/60 border-t border-white/10">
          © {currentYear} SalesAI Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}