import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { 
  UserIcon, 
  ShoppingCartIcon, 
  HeartIcon, 
  MapPinIcon,
  ChevronDownIcon,
  FlagIcon,
  MagnifyingGlassIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { ROUTE_PATHS } from '../../Routes/routes.config';

const Header = () => {
  const { cart, wishlist } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMobileCategoryDropdownOpen, setIsMobileCategoryDropdownOpen] = useState(false);
  
  const accountDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const mobileCategoryDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
      if (mobileCategoryDropdownRef.current && !mobileCategoryDropdownRef.current.contains(event.target)) {
        setIsMobileCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
  <header className="[background-color:white] [box-shadow:0_1px_2px_rgba(0,0,0,0.05)] [border-bottom:1px_solid_#f3f4f6] [position:sticky] [top:0] [z-index:50] [width:100%] [overflow:visible]">
      {/* Top Header Bar */}
      <div className="[width:100%] [padding:0_16px] sm:[padding:0_24px] lg:[padding:0_32px]">
        <div className="[display:flex] [align-items:center] [justify-content:space-between] [height:80px]">
          {/* Logo */}
          <Link to="/" className="[display:flex] [align-items:center] [gap:12px] group">
            <img 
              src="/src/assets/svg/DripHublogo.svg" 
              alt="DripHub Logo" 
              className="
              [height:50px]
              [width:auto]"
            />
          </Link>

          {/* Desktop Search Bar */}
          <div className="[display:none] lg:[display:flex] [flex:1] [max-width:1024px] [margin:0_16px] xl:[margin:0_32px]">
            <div className="[position:relative] [width:100%]">
              <div className="[display:flex] [border-radius:16px] [box-shadow:0_4px_6px_rgba(0,0,0,0.1)] [border:1px_solid_#e5e7eb] hover:[border-color:#fed7aa] focus-within:[border-color:#f97316] focus-within:[box-shadow:0_0_0_4px_rgba(249,115,22,0.1)] [transition:all_0.3s]">
                {/* Category Dropdown */}
                <div ref={categoryDropdownRef} className="[position:relative]">
                  <button 
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="[display:flex] [align-items:center] [gap:8px] [background-color:#f9fafb] [color:#374151] [padding:12px_12px] lg:[padding:12px_16px] [border-radius:16px_0_0_16px] [border-right:1px_solid_#e5e7eb] focus:[outline:none] focus:[background-color:white] [transition:all_0.2s] [cursor:pointer] [font-size:0.875rem] lg:[font-size:1rem]"
                  >
                    <span>All Categories</span>
                    <ChevronDownIcon className={`[height:16px] [width:16px] [color:#6b7280] [transition:all_0.2s] ${isCategoryDropdownOpen ? '[transform:rotate(180deg)]' : ''}`} />
                  </button>

                  {/* Category Dropdown Menu */}
                  {isCategoryDropdownOpen && (
                    <div className="[position:absolute] [top:100%] [left:0] [margin-top:8px] [width:220px] [background-color:#ef4444] [border-radius:20px] [box-shadow:0_8px_25px_rgba(0,0,0,0.15)] [z-index:1000] [padding:20px] [animation:fadeIn_0.2s_ease-out]">
                      {/* Header */}
                      <div className="[background-color:white] [border-radius:20px] [padding:16px] [margin-bottom:16px]">
                        <div className="[color:#ef4444] [font-weight:700] [font-size:1.125rem] [text-align:center]">
                          Categories
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="[display:flex] [flex-direction:column] [gap:4px]">
                        {['All Categories', 'Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports', 'Beauty', 'Toys'].map((category, index) => (
                          <button 
                            key={index}
                            onClick={() => {setIsCategoryDropdownOpen(false)}}
                            className="[color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-align:left] [border:none] [background:transparent] [cursor:pointer]"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Search Input */}
                <input
                  type="text"
                  className="[flex:1] [padding:12px_16px] lg:[padding:12px_24px] focus:[outline:none] [color:#374151] [placeholder-color:#9ca3af] [font-size:0.875rem] lg:[font-size:1rem] [min-width:0]"
                  placeholder="Search for products, brands and more..."
                />
                
                {/* Search Button */}
                <button className="[background:linear-gradient(to_right,#f97316,#ef4444)] hover:[background:linear-gradient(to_right,#ea580c,#dc2626)] [padding:12px_24px] lg:[padding:12px_32px] [border-radius:0_16px_16px_0] [color:white] [font-weight:500] [transition:all_0.3s] [transform:scale(1)] hover:[transform:scale(1.05)] [box-shadow:0_4px_6px_rgba(0,0,0,0.1)] hover:[box-shadow:0_8px_25px_rgba(0,0,0,0.15)] [flex-shrink:0]">
                  <MagnifyingGlassIcon className="[height:20px] [width:20px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Elements */}
          <div className="[display:flex] [align-items:center] [gap:12px] lg:[gap:16px] xl:[gap:24px] [flex-shrink:0]">
            {/* Language Selector */}
            <div ref={languageDropdownRef} className="[position:relative] [display:none] lg:[display:flex] [align-items:center] [gap:8px] [cursor:pointer] group">
              <div 
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="[display:flex] [align-items:center] [gap:8px] [padding:8px_12px] [border-radius:8px] hover:[background-color:#f9fafb] [transition:background-color_0.2s]"
              >
                <div className="[width:32px] [height:24px] [background:linear-gradient(to_bottom_right,#2563eb,#1e3a8a)] [border-radius:6px] [display:flex] [align-items:center] [justify-content:center]">
                  <span className="[color:white] [font-size:0.75rem] [font-weight:700]">EN</span>
                </div>
                <ChevronDownIcon className={`[height:16px] [width:16px] [color:#6b7280] group-hover:[color:#f97316] [transition:all_0.2s] ${isLanguageDropdownOpen ? '[transform:rotate(180deg)]' : ''}`} />
              </div>

              {/* Language Dropdown */}
              {isLanguageDropdownOpen && (
                <div className="[position:absolute] [top:100%] [right:0] [margin-top:8px] [width:200px] [background-color:#ef4444] [border-radius:20px] [box-shadow:0_8px_25px_rgba(0,0,0,0.15)] [z-index:1000] [padding:20px] [animation:fadeIn_0.2s_ease-out]">
                  {/* Header */}
                  <div className="[background-color:white] [border-radius:20px] [padding:16px] [margin-bottom:16px]">
                    <div className="[color:#ef4444] [font-weight:700] [font-size:1.125rem] [text-align:center]">
                      Language
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="[display:flex] [flex-direction:column] [gap:4px]">
                    {[
                      { code: 'EN', name: 'English', flag: '🇺🇸' },
                      { code: 'ES', name: 'Español', flag: '🇪🇸' },
                      { code: 'FR', name: 'Français', flag: '🇫🇷' },
                      { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
                      { code: 'HI', name: 'हिंदी', flag: '🇮🇳' }
                    ].map((lang, index) => (
                      <button 
                        key={index}
                        onClick={() => {setIsLanguageDropdownOpen(false)}}
                        className="[display:flex] [align-items:center] [gap:12px] [color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-align:left] [border:none] [background:transparent] [cursor:pointer]"
                      >
                        <span className="[font-size:1.25rem]">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Account & Lists */}
            <div ref={accountDropdownRef} className="[position:relative] [display:none] xl:[display:block] [cursor:pointer] group">
              <div 
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="[display:flex] [align-items:center] [gap:4px] [padding:8px_12px] [border-radius:8px] hover:[background-color:#f9fafb] [transition:background-color_0.2s]"
              >
                <div>
                    <div className="[font-size:0.75rem] [color:#6b7280] group-hover:[color:#f97316] [transition:color_0.2s]">{isAuthenticated ? `Hello, ${user?.name || user?.email || 'User'}` : 'Hello, sign in'}</div>
                    <div className="[font-weight:600] [color:#111827] group-hover:[color:#f97316] [transition:color_0.2s] [white-space:nowrap]">Account & Lists</div>
                  </div>
                <ChevronDownIcon className={`[height:16px] [width:16px] [color:#6b7280] group-hover:[color:#f97316] [transition:all_0.2s] ${isAccountDropdownOpen ? '[transform:rotate(180deg)]' : ''}`} />
              </div>

              {/* Account Dropdown */}
              {isAccountDropdownOpen && (
                <div className="[position:absolute] [top:100%] [right:0] [margin-top:8px] [width:240px] [background-color:#ef4444] [border-radius:20px] [box-shadow:0_8px_25px_rgba(0,0,0,0.15)] [z-index:1000] [padding:20px] [animation:fadeIn_0.2s_ease-out]">
                  {/* Top section with rounded white background */}
                  <div className="[background-color:white] [border-radius:20px] [padding:16px] [margin-bottom:16px]">
                    <div className="[color:#ef4444] [font-weight:700] [font-size:1.125rem] [text-align:center]">
                      Account
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="[display:flex] [flex-direction:column] [gap:4px]">
                    {isAuthenticated ? (
                      <button
                        onClick={async () => {
                          setIsAccountDropdownOpen(false);
                          try {
                            await logout();
                          } catch (e) {
                            console.error('Error during logout', e);
                          }
                          // Ensure local tokens cleared and navigate to home/login
                          navigate(ROUTE_PATHS.HOME);
                        }}
                        className="[color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-align:left] [border:none] [background:transparent] [cursor:pointer]"
                      >
                        Sign out
                      </button>
                    ) : (
                      <Link 
                        to="/account/profile"
                        className="[color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-decoration:none]"
                        onClick={() => setIsAccountDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                    )}
                    <Link 
                      to="/account/orders"
                      className="[color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-decoration:none]"
                      onClick={() => setIsAccountDropdownOpen(false)}
                    >
                      Your Orders
                    </Link>
                    <Link 
                      to="/wishlist"
                      className="[color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-decoration:none]"
                      onClick={() => setIsAccountDropdownOpen(false)}
                    >
                      Your Wishlist
                    </Link>
                    <Link 
                      to="/account/addresses"
                      className="[color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-decoration:none]"
                      onClick={() => setIsAccountDropdownOpen(false)}
                    >
                      Your Addresses
                    </Link>
                    <Link 
                      to="/account/settings"
                      className="[color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-decoration:none]"
                      onClick={() => setIsAccountDropdownOpen(false)}
                    >
                      Account Settings
                    </Link>
                    <Link 
                      to="/contact"
                      className="[color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-decoration:none]"
                      onClick={() => setIsAccountDropdownOpen(false)}
                    >
                      Get in touch
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Returns & Orders */}
            <div className="[display:none] xl:[display:block] [cursor:pointer] group">
              <div className="[font-size:0.75rem] [color:#6b7280] group-hover:[color:#f97316] [transition:color_0.2s]">Returns</div>
              <div className="[font-weight:600] [color:#111827] group-hover:[color:#f97316] [transition:color_0.2s] [white-space:nowrap]">& Orders</div>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="[position:relative] group">
              <div className="[padding:8px] [border-radius:50%] hover:[background-color:#fff7ed] [transition:background-color_0.2s]">
                <HeartIcon className="[height:24px] [width:24px] [color:#374151] group-hover:[color:#f97316] [transition:color_0.2s]" />
                {wishlist.length > 0 && (
                  <span className="[position:absolute] [top:-4px] [right:-4px] [background-color:#ef4444] [color:white] [font-size:0.75rem] [border-radius:50%] [height:20px] [width:20px] [display:flex] [align-items:center] [justify-content:center] [font-weight:500] [animation:pulse_2s_infinite]">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="[position:relative] group">
              <div className="[padding:8px] [border-radius:50%] hover:[background-color:#fff7ed] [transition:background-color_0.2s]">
                <ShoppingCartIcon className="[height:24px] [width:24px] [color:#374151] group-hover:[color:#f97316] [transition:color_0.2s]" />
                {cart.length > 0 && (
                  <span className="[position:absolute] [top:-4px] [right:-4px] [background-color:#f97316] [color:white] [font-size:0.75rem] [border-radius:50%] [height:20px] [width:20px] [display:flex] [align-items:center] [justify-content:center] [font-weight:500] [animation:pulse_2s_infinite]">
                    {cart.length}
                  </span>
                )}
              </div>
              <span className="[display:none] lg:[display:block] [font-size:0.875rem] [font-weight:500] [color:#374151] group-hover:[color:#f97316] [transition:color_0.2s]">Cart</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:[display:none] [padding:8px] [border-radius:8px] hover:[background-color:#f3f4f6] [transition:background-color_0.2s]"
            >
              <Bars3Icon className="[height:24px] [width:24px] [color:#374151]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:[display:none] [padding:0_16px_16px_16px]">
        <div className="[position:relative]">
          <div className="[display:flex] [border-radius:16px] [box-shadow:0_4px_6px_rgba(0,0,0,0.1)] [border:1px_solid_#e5e7eb]">
            <select className="[background-color:#f9fafb] [color:#374151] [padding:12px] [border-radius:16px_0_0_16px] [border-right:1px_solid_#e5e7eb] focus:[outline:none]">
              <option>All</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home</option>
            </select>
            <input
              type="text"
              className="[flex:1] [padding:12px_16px] focus:[outline:none] [color:#374151] [placeholder-color:#9ca3af]"
              placeholder="Search DripHub"
            />
            <button className="[background:linear-gradient(to_right,#f97316,#ef4444)] [padding:12px_16px] [border-radius:0_16px_16px_0] [color:white]">
              <MagnifyingGlassIcon className="[height:20px] [width:20px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (anchored dropdown) */}
      {isMobileMenuOpen && (
        <div
          ref={mobileCategoryDropdownRef}
          className="lg:[display:none] [position:absolute] [top:56px] sm:[top:60px] [right:12px] [width:300px] [max-width:calc(100%-24px)] [background-color:#ef4444] [border-radius:20px] [box-shadow:0_8px_25px_rgba(0,0,0,0.18)] [z-index:60] [padding:20px] [animation:fadeIn_0.18s_ease-out] [border:1px_solid_rgba(255,255,255,0.15)]">
          {/* Header */}
          <div className="[background-color:white] [border-radius:20px] [padding:16px] [margin-bottom:16px]">
            <div className="[color:#ef4444] [font-weight:700] [font-size:1.125rem] [text-align:center]">
              Menu
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="[display:flex] [flex-direction:column] [gap:4px]">
            {isAuthenticated ? (
              <button
                onClick={async () => {
                  setIsMobileMenuOpen(false);
                  try {
                    await logout();
                  } catch (e) {
                    console.error('Logout error', e);
                  }
                  navigate(ROUTE_PATHS.HOME);
                }}
                className="[display:flex] [align-items:center] [gap:12px] [color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-align:left] [border:none] [background:transparent] [cursor:pointer]"
              >
                <UserIcon className="[height:20px] [width:20px] [color:white]" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button 
                onClick={() => {setIsMobileMenuOpen(false)}}
                className="[display:flex] [align-items:center] [gap:12px] [color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-align:left] [border:none] [background:transparent] [cursor:pointer]"
              >
                <UserIcon className="[height:20px] [width:20px] [color:white]" />
                <span>Sign In</span>
              </button>
            )}
            
            <button 
              onClick={() => {setIsMobileMenuOpen(false)}}
              className="[display:flex] [align-items:center] [gap:12px] [color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-align:left] [border:none] [background:transparent] [cursor:pointer]"
            >
              <MapPinIcon className="[height:20px] [width:20px] [color:white]" />
              <span>Deliver to Ahmedabad</span>
            </button>

            {/* Mobile Language Selector */}
      <div className="[margin-top:8px] [padding-top:8px] [border-top:1px_solid_rgba(255,255,255,0.2)]">
              <div 
                onClick={() => setIsMobileCategoryDropdownOpen(!isMobileCategoryDropdownOpen)}
                className="[display:flex] [align-items:center] [justify-content:between] [color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [cursor:pointer] [border:none] [background:transparent] [width:100%]"
              >
                <div className="[display:flex] [align-items:center] [gap:12px]">
                  <FlagIcon className="[height:20px] [width:20px] [color:white]" />
                  <span>Language: EN</span>
                </div>
                <ChevronDownIcon className={`[height:16px] [width:16px] [color:white] [transition:all_0.2s] ${isMobileCategoryDropdownOpen ? '[transform:rotate(180deg)]' : ''}`} />
              </div>

              {/* Mobile Language Options */}
              {isMobileCategoryDropdownOpen && (
        <div className="[margin-top:4px] [display:flex] [flex-direction:column] [gap:4px] [background-color:rgba(255,255,255,0.06)] [border-radius:12px] [padding:6px]">
                  {[
                    { code: 'EN', name: 'English', flag: '🇺🇸' },
                    { code: 'ES', name: 'Español', flag: '🇪🇸' },
                    { code: 'FR', name: 'Français', flag: '🇫🇷' },
                    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
                    { code: 'HI', name: 'हिंदी', flag: '🇮🇳' }
                  ].map((lang, index) => (
                    <button 
                      key={index}
                      onClick={() => {setIsMobileCategoryDropdownOpen(false); setIsMobileMenuOpen(false);}}
            className="[display:flex] [align-items:center] [gap:10px] [color:white] [font-weight:500] [font-size:0.85rem] [padding:8px_10px] [border-radius:8px] hover:[background-color:rgba(255,255,255,0.12)] [transition:background-color_0.18s] [text-align:left] [border:none] [background:transparent] [cursor:pointer]"
                    >
                      <span className="[font-size:1rem]">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;