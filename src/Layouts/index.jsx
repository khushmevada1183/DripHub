import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header.jsx';
import Subheader from '../Components/Header/Subheader.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import { m, fadeIn, viewport } from '../animation/motion';

// 🏗️ Main Layout for most pages (with header, subheader, footer)
export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 w-full flex flex-col">
      <Header />
      <Subheader />
      
      <m.main
        className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8"
        initial="hidden"
        whileInView="show"
        variants={fadeIn('up', 0, 0.5, 12)}
        viewport={viewport}
      >
        {children || <Outlet />}
      </m.main>
      
      <Footer />
    </div>
  );
};

// 🔐 Auth Layout for login/signup pages (full screen design)
export const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full">
      {children || <Outlet />}
    </div>
  );
};

// 🛒 Checkout Layout (focused on conversion)
export const CheckoutLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 w-full flex flex-col">
      {/* Minimal header for checkout */}
      <header className="w-full bg-white border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">DripHub</span>
            </div>
            <div className="text-sm text-gray-500">
              Secure Checkout 🔒
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full">
        {children || <Outlet />}
      </main>
    </div>
  );
};

// 👤 Account Layout (with account sidebar)
export const AccountLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 w-full flex flex-col">
      <Header />
      <Subheader />
      
      <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Account Sidebar */}
            <aside className="lg:col-span-1">
              <AccountSidebar />
            </aside>
            
            {/* Main Content */}
            <main className="lg:col-span-3">
              {children || <Outlet />}
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// 🚨 Error Layout (for error pages)
export const ErrorLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple header */}
      <header className="w-full bg-white shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">DripHub</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {children || <Outlet />}
      </main>
    </div>
  );
};

// 📱 Account Sidebar Component
const AccountSidebar = () => {
  const menuItems = [
    { href: '/account', label: 'Dashboard', icon: '📊' },
    { href: '/account/profile', label: 'Profile', icon: '👤' },
    { href: '/account/orders', label: 'Orders', icon: '📦' },
    { href: '/account/addresses', label: 'Addresses', icon: '📍' },
    { href: '/account/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">My Account</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};
