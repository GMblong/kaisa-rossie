
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PackageDetail } from './pages/PackageDetail';
import { AIAssistant } from './pages/AIAssistant';
import { BookingFlow } from './pages/BookingFlow';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import { Tours } from './pages/Tours';
import { BusRental } from './pages/BusRental';
import { Umrah } from './pages/Umrah';
import { Haji } from './pages/Haji';
import { PACKAGES } from './constants';
import { User, UserRole } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setSelectedPackageId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectPackage = (id: string) => {
    setSelectedPackageId(id);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBook = (id: string) => {
    if (!user) {
      setCurrentPage('auth');
    } else {
      setSelectedPackageId(id);
      setCurrentPage('booking');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (selectedRole: UserRole) => {
    const mockUser: User = {
      id: 'u-123',
      name: selectedRole === UserRole.SUPER_ADMIN ? 'Kaisa Admin' : 'Abdullah Ahmad',
      email: selectedRole === UserRole.SUPER_ADMIN ? 'admin@kaisarossie.com' : 'customer@kaisarossie.com',
      role: selectedRole,
    };
    setUser(mockUser);
    navigateTo('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    navigateTo('home');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateTo} />;
      case 'detail':
        const pkg = PACKAGES.find(p => p.id === selectedPackageId);
        return pkg ? <PackageDetail item={pkg} onBack={() => navigateTo('home')} onBook={handleBook} /> : <Home onNavigate={navigateTo} />;
      case 'assistant':
        return <AIAssistant />;
      case 'dashboard':
        return user ? <Dashboard user={user} /> : <Auth onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'auth':
        return <Auth onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'booking':
        const bookingPkg = PACKAGES.find(p => p.id === selectedPackageId);
        return bookingPkg ? <BookingFlow pkg={bookingPkg} onComplete={() => navigateTo('dashboard')} /> : <Home onNavigate={navigateTo} />;
      case 'umrah':
        return <Umrah onSelectPackage={selectPackage} />;
      case 'haji':
        return <Haji onSelectPackage={selectPackage} />;
      case 'tours':
        return <Tours onSelectPackage={selectPackage} />;
      case 'bus':
        return <BusRental onSelectPackage={selectPackage} />;
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <Layout onNavigate={navigateTo} currentPage={currentPage} isLoggedIn={!!user} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
