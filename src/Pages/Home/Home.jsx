import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/solid';
import { m, staggerContainer, fadeIn, scaleIn, viewport } from '../../animation/motion';
import { ProductCard, Button, StarRating } from '../../components';

const products = [
  {
    id: 1,
    title: 'Wireless Noise-Cancelling Headphones',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 199.99,
    image: 'https://via.placeholder.com/300',
    description: 'Premium wireless headphones with active noise cancellation',
    rating: { rate: 4.5, count: 1234 },
    reviews: 1234,
    category: 'Electronics',
  },
  {
    id: 2,
    title: 'Smart Fitness Watch',
    name: 'Smart Fitness Watch',
    price: 149.99,
    image: 'https://via.placeholder.com/300',
    description: 'Track your fitness goals with this advanced smartwatch',
    rating: { rate: 4.8, count: 856 },
    reviews: 856,
    category: 'Electronics',
  },
  {
    id: 3,
    title: 'Premium Coffee Maker',
    name: 'Premium Coffee Maker',
    price: 89.99,
    image: 'https://via.placeholder.com/300',
    description: 'Brew perfect coffee with this programmable coffee maker',
    rating: { rate: 4.6, count: 2341 },
    reviews: 2341,
    category: 'Home & Kitchen',
  },
  {
    id: 4,
    title: 'Ergonomic Office Chair',
    name: 'Ergonomic Office Chair',
    price: 299.99,
    image: 'https://via.placeholder.com/300',
    description: 'Comfortable office chair with lumbar support',
    rating: { rate: 4.7, count: 3421 },
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
    return <StarRating value={rating} readonly size="sm" />;
  };

  return (
    <div className="w-full space-y-12">
      {/* Hero Section */}
      <m.section
        className="relative py-20 px-4 sm:px-6 lg:px-8 rounded-2xl bg-gradient-to-br from-[#121212] to-[#1E1E1E] w-full"
        initial="hidden"
        whileInView="show"
        variants={staggerContainer(0.12, 0.1)}
        viewport={viewport}
      >
        <m.div className="max-w-3xl w-full" variants={fadeIn('up', 0, 0.6, 18)}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Discover Amazing Deals
          </h1>
          <m.p className="text-xl mb-8 text-gray-300" variants={fadeIn('up', 0.05)}>
            Shop the latest products at unbeatable prices. Free shipping on orders over $50!
          </m.p>
          <m.div className="flex gap-4" variants={fadeIn('up', 0.1)}>
            <Button 
              variant="primary" 
              size="lg"
              className="bg-teal-500 hover:bg-teal-600"
            >
              Shop Now
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-[#1E1E1E] hover:bg-[#2E2E2E] text-white"
            >
              View Deals
            </Button>
          </m.div>
        </m.div>
      </m.section>

      {/* Categories */}
      <section className="bg-[#1E1E1E] rounded-2xl p-4 sm:p-6 lg:p-8 w-full" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-8 text-white">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {categories.map((category) => (
            <m.div
              key={category.name}
              className="bg-[#121212] rounded-xl p-6 text-center hover:bg-[#2E2E2E] transition-colors cursor-pointer"
              initial="hidden"
              whileInView="show"
              variants={scaleIn(0, 0.35, 0.95)}
              viewport={viewport}
            >
              <span className="text-4xl mb-2 block">{category.icon}</span>
              <h3 className="text-sm font-medium text-gray-200">{category.name}</h3>
            </m.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Featured Products</h2>
          <Link to="/products" className="text-teal-400 hover:text-teal-300">
            View All
          </Link>
        </div>
        <m.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full" initial="hidden" whileInView="show" variants={staggerContainer(0.1)} viewport={viewport}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleWishlist={addToWishlist}
              isInWishlist={false}
              className="bg-[#1E1E1E] hover:transform hover:scale-105 transition-all duration-300"
              theme="dark"
            />
          ))}
        </m.div>
      </section>

      {/* Deal of the Day */}
  <section className="bg-[#1E1E1E] rounded-2xl p-4 sm:p-6 lg:p-8 w-full" data-aos="fade-up">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-bold mb-4 text-white">Deal of the Day</h2>
            <h3 className="text-xl font-semibold mb-2 text-teal-400">50% OFF</h3>
            <p className="text-gray-300 mb-4">
              Limited time offer on selected electronics. Don't miss out on these amazing deals!
            </p>
            <Button 
              variant="primary"
              size="md"
              className="bg-teal-500 hover:bg-teal-600"
            >
              Shop Now
            </Button>
          </div>
          <div className="flex-1 flex justify-center w-full">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Deal of the Day"
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
