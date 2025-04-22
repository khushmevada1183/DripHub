import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { UserIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const { cart, wishlist } = useCart();

  return (
    <nav className="bg-[#121212] border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wider text-white">
            ShopHub
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-16">
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg 
                         bg-[#1E1E1E] text-gray-200 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/deals" className="text-gray-300 hover:text-white font-medium">
              Today's Deals
            </Link>
            <Link to="/categories" className="text-gray-300 hover:text-white font-medium">
              Categories
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/wishlist" className="relative text-gray-300 hover:text-white">
                <HeartIcon className="h-6 w-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative text-gray-300 hover:text-white">
                <ShoppingCartIcon className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
              <Link to="/account" className="text-gray-300 hover:text-white">
                <UserIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search (visible only on mobile) */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg 
                     bg-[#1E1E1E] text-gray-200 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Search products..."
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 