import { Link } from 'react-router-dom';
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
import { useState } from 'react';

const Header = () => {
  const { cart, wishlist } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="[background-color:white] [box-shadow:0_1px_2px_rgba(0,0,0,0.05)] [border-bottom:1px_solid_#f3f4f6] [position:sticky] [top:0] [z-index:50] [width:100%]">
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
                <select className="[background-color:#f9fafb] [color:#374151] [padding:12px_12px] lg:[padding:12px_16px] [border-radius:16px_0_0_16px] [border-right:1px_solid_#e5e7eb] focus:[outline:none] focus:[background-color:white] [transition:all_0.2s] [cursor:pointer] [font-size:0.875rem] lg:[font-size:1rem]">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home & Kitchen</option>
                  <option>Books</option>
                  <option>Sports</option>
                  <option>Beauty</option>
                  <option>Toys</option>
                </select>
                
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
            <div className="[display:none] lg:[display:flex] [align-items:center] [gap:8px] [cursor:pointer] group">
              <div className="[width:32px] [height:24px] [background:linear-gradient(to_bottom_right,#2563eb,#1e3a8a)] [border-radius:6px] [display:flex] [align-items:center] [justify-content:center]">
                <span className="[color:white] [font-size:0.75rem] [font-weight:700]">EN</span>
              </div>
              <ChevronDownIcon className="[height:16px] [width:16px] [color:#6b7280] group-hover:[color:#f97316] [transition:color_0.2s]" />
            </div>

            {/* Account & Lists */}
            <div className="[display:none] xl:[display:block] [cursor:pointer] group">
              <div className="[font-size:0.75rem] [color:#6b7280] group-hover:[color:#f97316] [transition:color_0.2s]">Hello, sign in</div>
              <div className="[font-weight:600] [color:#111827] group-hover:[color:#f97316] [transition:color_0.2s] [white-space:nowrap]">Account & Lists</div>
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:[display:none] [border-top:1px_solid_#e5e7eb] [background-color:white] [box-shadow:0_4px_6px_rgba(0,0,0,0.1)]">
          <div className="[padding:16px] [display:flex] [flex-direction:column] [gap:16px]">
            <div className="[display:flex] [align-items:center] [gap:12px] [padding:12px] [border-radius:8px] hover:[background-color:#f9fafb] [transition:background-color_0.2s]">
              <UserIcon className="[height:20px] [width:20px] [color:#6b7280]" />
              <span className="[font-weight:500] [color:#111827]">Sign In</span>
            </div>
            <div className="[display:flex] [align-items:center] [gap:12px] [padding:12px] [border-radius:8px] hover:[background-color:#f9fafb] [transition:background-color_0.2s]">
              <MapPinIcon className="[height:20px] [width:20px] [color:#6b7280]" />
              <span className="[font-weight:500] [color:#111827]">Deliver to Ahmedabad</span>
            </div>
            <div className="[display:flex] [align-items:center] [gap:12px] [padding:12px] [border-radius:8px] hover:[background-color:#f9fafb] [transition:background-color_0.2s]">
              <FlagIcon className="[height:20px] [width:20px] [color:#6b7280]" />
              <span className="[font-weight:500] [color:#111827]">Language: EN</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;