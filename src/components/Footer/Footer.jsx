import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/products' },
  { name: 'Categories', href: '/products' },
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
    <footer className="[width:100%] [background-color:#111827] [color:white]">
      {/* Newsletter Signup */}
      <div className="[width:100%] [background-color:#2563eb]">
        <div className="[width:100%] [padding:32px_16px] sm:[padding:32px_24px] lg:[padding:32px_32px]">
          <div className="[max-width:1024px] [margin:0_auto] [text-align:center]">
            <h3 className="[font-size:1.5rem] [font-weight:700] [margin-bottom:8px]">Stay in the loop</h3>
            <p className="[color:#dbeafe] [margin-bottom:24px]">
              Subscribe to our newsletter for exclusive deals and updates
            </p>
            <form className="[display:flex] [flex-direction:column] sm:[flex-direction:row] [gap:16px] [max-width:448px] [margin:0_auto]">
              <input
                type="email"
                placeholder="Enter your email"
                className="[flex:1] [padding:12px_16px] [border-radius:8px] [color:#111827] focus:[outline:none] focus:[box-shadow:0_0_0_2px_white]"
                required
              />
              <button
                type="submit"
                className="[background-color:white] [color:#2563eb] [padding:12px_24px] [border-radius:8px] [font-weight:600] hover:[background-color:#f3f4f6] [transition:background-color_0.2s]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="[width:100%] [padding:48px_16px] sm:[padding:48px_24px] lg:[padding:48px_32px]">
        <div className="[max-width:1280px] [margin:0_auto]">
          <div className="[display:grid] [grid-template-columns:1fr] md:[grid-template-columns:1fr_1fr] lg:[grid-template-columns:repeat(5,1fr)] [gap:32px]">
            {/* Company Info */}
            <div className="lg:[grid-column:span_1]">
              <Link to="/" className="[display:flex] [align-items:center] [gap:12px] [margin-bottom:16px]">
                <div className="[width:32px] [height:32px] [background-color:#2563eb] [border-radius:8px] [display:flex] [align-items:center] [justify-content:center]">
                  <span className="[color:white] [font-weight:700] [font-size:0.875rem]">S</span>
                </div>
                <span className="[font-size:1.25rem] [font-weight:700]">DripHub</span>
              </Link>
              <p className="[color:#9ca3af] [margin-bottom:24px] [line-height:1.6]">
                Your one-stop destination for quality products at unbeatable prices. 
                Shop with confidence and discover amazing deals every day.
              </p>
              
              {/* Social Links */}
              <div className="[display:flex] [gap:16px]">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="[width:40px] [height:40px] [background-color:#1f2937] [border-radius:8px] [display:flex] [align-items:center] [justify-content:center] hover:[background-color:#2563eb] [transition:background-color_0.2s]"
                    aria-label={social.name}
                  >
                    <span className="[font-size:1.125rem]">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="lg:[grid-column:span_1]">
                <h4 className="[font-size:1.125rem] [font-weight:600] [margin-bottom:16px]">{section.title}</h4>
                <ul className="[display:flex] [flex-direction:column] [gap:12px]">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="[color:#9ca3af] hover:[color:white] [transition:color_0.2s]"
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
          <div className="[border-top:1px_solid_#1f2937] [margin-top:48px] [padding-top:32px]">
            <div className="[display:flex] [flex-direction:column] lg:[flex-direction:row] [align-items:center] [justify-content:space-between] [gap:24px]">
              {/* Copyright */}
              <div className="[color:#9ca3af] [font-size:0.875rem]">
                © 2024 DripHub. All rights reserved.
              </div>

              {/* Legal Links */}
              <div className="[display:flex] [flex-wrap:wrap] [align-items:center] [gap:24px] [font-size:0.875rem]">
                <Link to="/privacy" className="[color:#9ca3af] hover:[color:white] [transition:color_0.2s]">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="[color:#9ca3af] hover:[color:white] [transition:color_0.2s]">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="[color:#9ca3af] hover:[color:white] [transition:color_0.2s]">
                  Cookie Policy
                </Link>
              </div>

              {/* Payment Methods */}
              <div className="[display:flex] [align-items:center] [gap:8px]">
                <span className="[color:#9ca3af] [font-size:0.875rem] [margin-right:8px]">We accept:</span>
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="[width:32px] [height:32px] [background-color:#1f2937] [border-radius:4px] [display:flex] [align-items:center] [justify-content:center]"
                    title={method.name}
                  >
                    <span className="[font-size:0.875rem]">{method.icon}</span>
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
