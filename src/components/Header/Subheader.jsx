import { Link } from 'react-router-dom';
import { 
  Bars3Icon,
  SparklesIcon,
  PlayCircleIcon,
  TagIcon,
  StarIcon,
  GiftIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
  QuestionMarkCircleIcon,
  HeartIcon,
  HomeIcon,
  CreditCardIcon,
  ComputerDesktopIcon,
  BookOpenIcon,
  FaceSmileIcon,
  FireIcon,
  ShoppingBagIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const Subheader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const categories = [
    { 
      name: 'All', 
      icon: Bars3Icon, 
      path: '/products',
      hasDropdown: true,
      subcategories: ['Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Beauty']
    },
    { name: 'Fresh', icon: SparklesIcon, path: '/fresh' },
    { name: 'MX Player', icon: PlayCircleIcon, path: '/mx-player' },
    { name: 'Sell', icon: TagIcon, path: '/sell' },
    { name: 'Bestsellers', icon: StarIcon, path: '/bestsellers' },
    { name: 'Today\'s Deals', icon: GiftIcon, path: '/deals' },
    { name: 'Mobiles', icon: DevicePhoneMobileIcon, path: '/mobiles' },
    { 
      name: 'Prime', 
      icon: FireIcon, 
      path: '/prime',
      hasDropdown: true,
      subcategories: ['Prime Video', 'Prime Music', 'Prime Gaming', 'Prime Delivery']
    },
    { name: 'Customer Service', icon: QuestionMarkCircleIcon, path: '/customer-service' },
    { name: 'Electronics', icon: BoltIcon, path: '/electronics' },
    { name: 'Fashion', icon: HeartIcon, path: '/fashion' },
    { name: 'New Releases', icon: ShoppingBagIcon, path: '/new-releases' },
    { name: 'Home & Kitchen', icon: HomeIcon, path: '/home-kitchen' },
    { name: 'Amazon Pay', icon: CreditCardIcon, path: '/amazon-pay' },
    { name: 'Computers', icon: ComputerDesktopIcon, path: '/computers' },
    { name: 'Books', icon: BookOpenIcon, path: '/books' },
    { name: 'Beauty & Personal Care', icon: FaceSmileIcon, path: '/beauty' }
  ];

  const toggleDropdown = (categoryName) => {
    setActiveDropdown(activeDropdown === categoryName ? null : categoryName);
  };

  return (
    <>
      {/* Desktop Subheader */}
      <nav className="hidden lg:block bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 xl:gap-6 2xl:gap-8 overflow-x-auto scrollbar-hide">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="relative group flex-shrink-0">
                  <Link
                    to={category.path}
                    className="flex items-center gap-2 py-4 px-3 hover:text-orange-600 transition-colors duration-200 group whitespace-nowrap"
                    onClick={() => category.hasDropdown && toggleDropdown(category.name)}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {category.name}
                    </span>
                    {category.hasDropdown && (
                      <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {category.hasDropdown && activeDropdown === category.name && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <Link
                          key={subIndex}
                          to={`${category.path}?category=${encodeURIComponent(subcategory)}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>
      {/* Mobile Subheader */}
      <div className="lg:hidden bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center space-x-3 w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Bars3Icon className="h-5 w-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-900">All Categories</span>
            <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Mobile Categories Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2">
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <Link
                      key={index}
                      to={category.path}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <IconComponent className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-orange-50 border-b border-orange-200 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 gap-4">
            <div className="flex items-center gap-4 lg:gap-6 text-sm overflow-x-auto scrollbar-hide">
              <span className="text-orange-800 font-medium whitespace-nowrap">Free delivery on orders above ₹499</span>
              <span className="text-orange-700 hidden sm:inline">•</span>
              <span className="text-orange-800 whitespace-nowrap hidden sm:inline">Easy returns</span>
              <span className="text-orange-700 hidden md:inline">•</span>
              <span className="text-orange-800 whitespace-nowrap hidden md:inline">24/7 customer support</span>
            </div>
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
              <Link to="/deals" className="text-orange-800 hover:text-orange-900 text-sm font-medium">
                Today's Deals
              </Link>
              <Link to="/prime" className="text-orange-800 hover:text-orange-900 text-sm font-medium">
                Prime Membership
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subheader;
