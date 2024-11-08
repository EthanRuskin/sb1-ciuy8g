import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FeaturesSection } from './components/FeaturesSection';
import { BenefitsSection } from './components/BenefitsSection';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';
import { GetStartedPage } from './components/GetStartedPage';
import { ScheduleDemoPage } from './components/ScheduleDemoPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { LoginPage } from './components/LoginPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { EnterpriseContactForm } from './components/enterprise/EnterpriseContactForm';
import { TeamLeaderDashboard } from './components/dashboard/TeamLeaderDashboard';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  const handleLogin = (email: string, name: string, role: string) => {
    setIsAuthenticated(true);
    setUser({ email, name, role });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
          <Navbar 
            onGetStarted={() => {}} 
            onLogin={() => {}} 
            isAuthenticated={isAuthenticated} 
          />
          <FeaturesSection />
          <BenefitsSection />
          <PricingSection onPricingAction={() => {}} />
          <Footer />
        </div>
      } />
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />
      } />
      <Route path="/get-started" element={<GetStartedPage />} />
      <Route path="/schedule-demo" element={<ScheduleDemoPage />} />
      <Route path="/enterprise" element={<EnterpriseContactForm />} />
      <Route path="/checkout" element={<CheckoutPage plan="" price="" />} />

      {/* Protected Routes */}
      <Route path="/dashboard/*" element={
        isAuthenticated ? (
          user?.role === 'team_leader' ? (
            <TeamLeaderDashboard onLogout={handleLogout} user={user} />
          ) : (
            <DashboardLayout onLogout={handleLogout} user={user} onPageChange={() => {}}>
              {/* Dashboard content will be rendered here */}
            </DashboardLayout>
          )
        ) : (
          <Navigate to="/login" />
        )
      } />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}