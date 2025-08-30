import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header.jsx';
import Subheader from '../Components/Header/Subheader.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import { m, fadeIn, viewport } from '../animation/motion';

// 🏗️ Main Layout for most pages (with header, subheader, footer)
export const MainLayout = ({ children }) => {
  return (
    <div className="[min-height:100vh] [background-color:#f9fafb] [color:#111827] [width:100%] [display:flex] [flex-direction:column]">
      <Header />
      <Subheader />
      
      <m.main
        className="[flex:1] [width:100%] [padding:32px_16px] sm:[padding:32px_24px] lg:[padding:32px_32px]"
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
    <div className="[min-height:100vh] [width:100%]">
      {children || <Outlet />}
    </div>
  );
};

// 🛒 Checkout Layout (focused on conversion)
export const CheckoutLayout = ({ children }) => {
  return (
    <div className="[min-height:100vh] [background-color:white] [color:#111827] [width:100%] [display:flex] [flex-direction:column]">
      {/* Minimal header for checkout */}
      <header className="[width:100%] [background-color:white] [border-bottom:1px_solid_#e5e7eb]">
        <div className="[width:100%] [padding:0_16px] sm:[padding:0_24px] lg:[padding:0_32px]">
          <div className="[display:flex] [align-items:center] [justify-content:space-between] [height:64px]">
            <div className="[display:flex] [align-items:center] [gap:12px]">
              <div className="[width:32px] [height:32px] [background-color:#2563eb] [border-radius:8px] [display:flex] [align-items:center] [justify-content:center]">
                <span className="[color:white] [font-weight:700] [font-size:0.875rem]">D</span>
              </div>
              <span className="[font-size:1.25rem] [font-weight:700] [color:#111827]">DripHub</span>
            </div>
            <div className="[font-size:0.875rem] [color:#6b7280]">
              Secure Checkout 🔒
            </div>
          </div>
        </div>
      </header>
      
      <main className="[flex:1] [width:100%]">
        {children || <Outlet />}
      </main>
    </div>
  );
};

// 👤 Account Layout (for profile, orders, etc.)
export const AccountLayout = ({ children }) => {
  return (
    <div className="[min-height:100vh] [background-color:#f9fafb] [color:#111827] [width:100%] [display:flex] [flex-direction:column]">
      <Header />
      <div className="[flex:1] [width:100%] [display:flex] [max-width:1280px] [margin:0_auto] [padding:24px_16px] sm:[padding:24px] lg:[padding:32px]">
        {/* Sidebar */}
        <AccountSidebar />
        
        {/* Main content */}
        <main className="[flex:1] [padding-left:32px]">
          {children || <Outlet />}
        </main>
      </div>
      <Footer />
    </div>
  );
};

// ❌ Error Layout (404, 500, etc.)
export const ErrorLayout = ({ children }) => {
  return (
    <div className="[min-height:100vh] [background:linear-gradient(135deg,#f3f4f6_0%,#e5e7eb_100%)] [color:#111827] [width:100%] [display:flex] [flex-direction:column] [align-items:center] [justify-content:center] [padding:24px]">
      {/* Minimal header */}
      <div className="[position:absolute] [top:24px] [left:24px] [display:flex] [align-items:center] [gap:12px]">
        <div className="[width:32px] [height:32px] [background-color:#2563eb] [border-radius:8px] [display:flex] [align-items:center] [justify-content:center]">
          <span className="[color:white] [font-weight:700] [font-size:0.875rem]">D</span>
        </div>
        <span className="[font-size:1.25rem] [font-weight:700] [color:#111827]">DripHub</span>
      </div>
      
      <main className="[max-width:512px] [width:100%] [text-align:center]">
        {children || <Outlet />}
      </main>
    </div>
  );
};

// 📱 Account Sidebar Component
const AccountSidebar = () => {
  const navigation = [
    { name: 'Profile', href: '/account/profile', icon: '�' },
    { name: 'Orders', href: '/account/orders', icon: '�' },
    { name: 'Wishlist', href: '/account/wishlist', icon: '❤️' },
    { name: 'Addresses', href: '/account/addresses', icon: '📍' },
    { name: 'Payment Methods', href: '/account/payments', icon: '💳' },
    { name: 'Settings', href: '/account/settings', icon: '⚙️' },
  ];

  return (
    <aside className="[width:256px] [background-color:white] [border-radius:12px] [padding:24px] [height:fit-content] [box-shadow:0_1px_3px_rgba(0,0,0,0.1)]">
      <h2 className="[font-size:1.125rem] [font-weight:600] [color:#111827] [margin-bottom:16px]">Account</h2>
      <nav className="[display:flex] [flex-direction:column] [gap:4px]">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="[display:flex] [align-items:center] [gap:12px] [padding:12px_16px] [border-radius:8px] [color:#6b7280] [text-decoration:none] [transition:all_0.2s] hover:[background-color:#f3f4f6] hover:[color:#111827]"
          >
            <span>{item.icon}</span>
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
};
