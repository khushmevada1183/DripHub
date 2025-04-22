import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { StarIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/solid';

const products = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    price: 199.99,
    image: 'https://via.placeholder.com/300',
    description: 'Premium wireless headphones with active noise cancellation',
    rating: 4.5,
    reviews: 1234,
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 149.99,
    image: 'https://via.placeholder.com/300',
    description: 'Track your fitness goals with this advanced smartwatch',
    rating: 4.8,
    reviews: 856,
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Premium Coffee Maker',
    price: 89.99,
    image: 'https://via.placeholder.com/300',
    description: 'Brew perfect coffee with this programmable coffee maker',
    rating: 4.6,
    reviews: 2341,
    category: 'Home & Kitchen',
  },
  {
    id: 4,
    name: 'Ergonomic Office Chair',
    price: 299.99,
    image: 'https://via.placeholder.com/300',
    description: 'Comfortable office chair with lumbar support',
    rating: 4.7,
    reviews: 3421,
    category: 'Furniture',
  },
];

const categories = [
  { name: 'Electronics', icon: '🔌' },
  { name: 'Fashion', icon: '👕' },
  { name: 'Home & Kitchen', icon: '🏠' },
  { name: 'Books', icon: '📚' },
  { name: 'Sports', icon: '⚽' },
  { name: 'Beauty', icon: '💄' },
  { name: 'Toys', icon: '🎮' },
  { name: 'Automotive', icon: '🚗' },
];

const Home = () => {
  const { addToCart, addToWishlist } = useCart();

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400'
            : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative py-20 px-4 rounded-2xl bg-gradient-to-br from-[#121212] to-[#1E1E1E]">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Discover Amazing Deals
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Shop the latest products at unbeatable prices. Free shipping on orders over $50!
          </p>
          <div className="flex gap-4">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Shop Now
            </button>
            <button className="bg-[#1E1E1E] hover:bg-[#2E2E2E] text-white px-8 py-3 rounded-lg font-medium transition-colors">
              View Deals
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#1E1E1E] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-white">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-[#121212] rounded-xl p-6 text-center hover:bg-[#2E2E2E] transition-colors cursor-pointer"
            >
              <span className="text-4xl mb-2 block">{category.icon}</span>
              <h3 className="text-sm font-medium text-gray-200">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Featured Products</h2>
          <Link to="/products" className="text-teal-400 hover:text-teal-300">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#1E1E1E] rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 text-white">{product.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-gray-400 text-sm">({product.reviews})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-teal-400">${product.price}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToWishlist(product);
                        }}
                        className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-[#2E2E2E]"
                      >
                        <HeartIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-[#2E2E2E]"
                      >
                        <ShoppingCartIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Deal of the Day */}
      <section className="bg-[#1E1E1E] rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-white">Deal of the Day</h2>
            <h3 className="text-xl font-semibold mb-2 text-teal-400">50% OFF</h3>
            <p className="text-gray-300 mb-4">
              Limited time offer on selected electronics. Don't miss out on these amazing deals!
            </p>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Shop Now
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Deal of the Day"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 