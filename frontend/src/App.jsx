import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/header';
import Footer from './components/footer';
import HeroSection from './components/sections/HeroSection';
import ExploreCryptoSection from './components/sections/ExploreCryptoSection';
import AdvancedTraderSection from './components/sections/AdvancedTraderSection';
import BaseAppSection from './components/sections/BaseAppSection';
import LearnSection from './components/sections/LearnSection';
import TakeControlSection from './components/sections/TakeControlSection';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AccountTypeSelect from './pages/AccountTypeSelect';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
import ExplorePage from './pages/ExplorePage';
import MarketStatsPage from './pages/MarketStatsPage';
import LearnPage from './pages/LearnPage';
import CryptoBasicsPage from './pages/CryptoBasicsPage';
import Dashboard from './pages/Dashboard';
import Loader from './components/ui/Loader';

const GuestRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loader />;
  return user ? <Navigate to="/dashboard" replace /> : children;
};

const Home = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <HeroSection />
      <ExploreCryptoSection />
      <AdvancedTraderSection />
      <BaseAppSection />
      <LearnSection />
      <TakeControlSection />
    </main>
    <Footer />
  </div>
);

const DisclaimerBanner = () => (
  <div className="bg-yellow-500 text-black text-center py-2 text-sm font-bold z-50 relative">
    ⚠️ STUDENT PROJECT DEMO - NOT AFFILIATED WITH COINBASE ⚠️
  </div>
);

const FooterDisclaimer = () => (
  <div className="bg-[#0a0b0d] text-gray-400 text-center py-3 text-xs z-50 relative mt-auto border-t border-gray-800">
    This is a student demo project. Do not enter real personal information or real passwords.
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <DisclaimerBanner />
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/market-stats" element={<MarketStatsPage />} />
            <Route path="/signin" element={<GuestRoute><SignIn /></GuestRoute>} />
            <Route path="/account-type" element={<GuestRoute><AccountTypeSelect /></GuestRoute>} />
            <Route path="/signup" element={<GuestRoute><SignUp /></GuestRoute>} />
            <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
            <Route path="/verify" element={<GuestRoute><VerifyCode /></GuestRoute>} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/crypto-basics" element={<CryptoBasicsPage />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute><Dashboard /></PrivateRoute>}
            />
          </Routes>
        </div>
        <FooterDisclaimer />
      </div>
    </AuthProvider>
  );
};

export default App;
