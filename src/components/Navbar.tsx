import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';

interface NavbarProps {
  onGetStarted: () => void;
  onLogin: () => void;
  isAuthenticated: boolean;
}

export function Navbar({ onGetStarted, onLogin, isAuthenticated }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleGetStarted = () => {
    navigate('/get-started');
    onGetStarted();
  };

  const handleLogin = () => {
    navigate('/login');
    onLogin();
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 shadow-lg backdrop-blur-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <Brain className="h-8 w-8 text-white relative" />
            </div>
            <span className="text-xl font-bold text-white transition-colors">
              SalesAI Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-200 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-gray-200 hover:text-white transition-colors"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-200 hover:text-white transition-colors"
            >
              Pricing
            </button>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated && (
              <>
                <button
                  onClick={handleLogin}
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 shadow-lg rounded-b-2xl border-t border-white/10 p-4">
            <div className="space-y-4">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-4 py-2 text-gray-200 hover:text-white hover:bg-white/5 rounded-lg"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="block w-full text-left px-4 py-2 text-gray-200 hover:text-white hover:bg-white/5 rounded-lg"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left px-4 py-2 text-gray-200 hover:text-white hover:bg-white/5 rounded-lg"
              >
                Pricing
              </button>
              {!isAuthenticated && (
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <button
                    onClick={handleLogin}
                    className="block w-full px-4 py-2 text-gray-200 hover:text-white hover:bg-white/5 rounded-lg"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleGetStarted}
                    className="block w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}