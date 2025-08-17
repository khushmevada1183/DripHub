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
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 w-full">
      {/* Top Header Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              DripHub
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-4xl mx-4 xl:mx-8">
            <div className="relative w-full">
              <div className="flex rounded-2xl shadow-lg border border-gray-200 hover:border-orange-300 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 transition-all duration-300">
                {/* Category Dropdown */}
                <select className="bg-gray-50 text-gray-700 px-3 lg:px-4 py-3 rounded-l-2xl border-r border-gray-200 focus:outline-none focus:bg-white transition-colors duration-200 cursor-pointer text-sm lg:text-base">
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
                  className="flex-1 px-4 lg:px-6 py-3 focus:outline-none text-gray-700 placeholder-gray-400 text-sm lg:text-base min-w-0"
                  placeholder="Search for products, brands and more..."
                />
                
                {/* Search Button */}
                <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 lg:px-8 py-3 rounded-r-2xl text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex-shrink-0">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Elements */}
          <div className="flex items-center gap-3 lg:gap-4 xl:gap-6 flex-shrink-0">
            {/* Language Selector */}
            <div className="hidden lg:flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">EN</span>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-gray-600 group-hover:text-orange-500 transition-colors" />
            </div>

            {/* Account & Lists */}
            <div className="hidden xl:block cursor-pointer group">
              <div className="text-xs text-gray-500 group-hover:text-orange-500 transition-colors">Hello, sign in</div>
              <div className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors whitespace-nowrap">Account & Lists</div>
            </div>

            {/* Returns & Orders */}
            <div className="hidden xl:block cursor-pointer group">
              <div className="text-xs text-gray-500 group-hover:text-orange-500 transition-colors">Returns</div>
              <div className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors whitespace-nowrap">& Orders</div>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative group">
              <div className="p-2 rounded-full hover:bg-orange-50 transition-colors duration-200">
                <HeartIcon className="h-6 w-6 text-gray-700 group-hover:text-orange-500 transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <div className="p-2 rounded-full hover:bg-orange-50 transition-colors duration-200">
                <ShoppingCartIcon className="h-6 w-6 text-gray-700 group-hover:text-orange-500 transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                    {cart.length}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors">Cart</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-4">
        <div className="relative">
          <div className="flex rounded-2xl shadow-lg border border-gray-200">
            <select className="bg-gray-50 text-gray-700 px-3 py-3 rounded-l-2xl border-r border-gray-200 focus:outline-none">
              <option>All</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home</option>
            </select>
            <input
              type="text"
              className="flex-1 px-4 py-3 focus:outline-none text-gray-700 placeholder-gray-400"
              placeholder="Search DripHub"
            />
            <button className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 rounded-r-2xl text-white">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <UserIcon className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Sign In</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <MapPinIcon className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Deliver to Ahmedabad</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <FlagIcon className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Language: EN</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;