import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/products' },
        { name: 'Categories', href: '/categories' },
        { name: 'Best Sellers', href: '/deals/best-sellers' },
        { name: 'New Arrivals', href: '/deals/new-arrivals' },
        { name: 'Sale', href: '/deals/sale' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'Size Guide', href: '/size-guide' }
      ]
    },
    {
      title: 'Account',
      links: [
        { name: 'My Account', href: '/account' },
        { name: 'Order History', href: '/account/orders' },
        { name: 'Wishlist', href: '/wishlist' },
        { name: 'Track Order', href: '/track-order' },
        { name: 'Settings', href: '/account/settings' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Investors', href: '/investors' },
        { name: 'Sustainability', href: '/sustainability' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Instagram', href: '#', icon: '📸' },
    { name: 'YouTube', href: '#', icon: '📺' },
    { name: 'LinkedIn', href: '#', icon: '💼' }
  ];

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'American Express', icon: '💳' },
    { name: 'PayPal', icon: '🏛️' },
    { name: 'Apple Pay', icon: '📱' },
    { name: 'Google Pay', icon: '🔍' }
  ];

  return (
    <footer className="w-full bg-gray-900 text-white">
      {/* Newsletter Signup */}
      <div className="w-full bg-blue-600">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Stay in the loop</h3>
            <p className="text-blue-100 mb-6">
              Subscribe to our newsletter for exclusive deals and updates
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold">ShopHub</span>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your one-stop destination for quality products at unbeatable prices. 
                Shop with confidence and discover amazing deals every day.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                    aria-label={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <div className="text-gray-400 text-sm">
                © 2024 ShopHub. All rights reserved.
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm mr-2">We accept:</span>
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center"
                    title={method.name}
                  >
                    <span className="text-sm">{method.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
