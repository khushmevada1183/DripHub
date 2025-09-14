import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/solid';
import { m, staggerContainer, fadeIn, scaleIn, viewport } from '../../animation/motion';
import { ProductCard, Button, StarRating } from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeaturedProducts, getCurrentToken } from '../../api/Api';

const products = [];

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
  const [featured, setFeatured] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const navigate = useNavigate();

  // If route requires authentication behavior: redirect to login immediately when no token
  useEffect(() => {
    const token = getCurrentToken();
    if (!token) {
      navigate(`/login?redirect=${encodeURIComponent('/')}`);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadFeatured = async () => {
      setLoadingFeatured(true);
      try {
        const res = await getFeaturedProducts(0, 6);
        if (res && res.success && Array.isArray(res.data) && mounted) {
          const items = res.data.map((p) => ({
            id: p.id,
            title: p.product_name || p.name,
            name: p.product_name || p.name,
            price: p.current_price ?? p.real_price ?? 0,
            image: p.img_url || 'https://via.placeholder.com/300',
            description: p.description || '',
            rating: { rate: p.rating ?? 0, count: p.people_rated_count ?? 0 },
            reviews: p.people_rated_count ?? 0,
            category: p.category || '' ,
            createdAt: p.created_at
          }));
          setFeatured(items);
        }
      } catch (error) {
        console.error('Failed to load featured products', error);
      } finally {
        if (mounted) setLoadingFeatured(false);
      }
    };

    loadFeatured();
    return () => { mounted = false; };
  }, []);

  const renderStars = (rating) => {
    return <StarRating value={rating} readonly size="sm" />;
  };

  return (
    <div className="[width:100%] [display:flex] [flex-direction:column] [gap:48px]">
      {/* Hero Section */}
      <m.section
        className="relative [padding:80px_16px] sm:[padding:80px_24px] lg:[padding:80px_32px] [border-radius:16px] [background:linear-gradient(to_bottom_right,#2563eb,#9333ea)] [width:100%]"
        initial="hidden"
        whileInView="show"
        variants={staggerContainer(0.12, 0.1)}
        viewport={viewport}
      >
        <m.div className="[max-width:768px] [width:100%]" variants={fadeIn('up', 0, 0.6, 18)}>
          <h1 className="[font-size:2.25rem] md:[font-size:3.75rem] [font-weight:700] [margin-bottom:24px] [color:white]">
            Discover Amazing Deals
          </h1>
          <m.p className="[font-size:1.25rem] [margin-bottom:32px] [color:rgba(255,255,255,0.9)]" variants={fadeIn('up', 0.05)}>
            Shop the latest products at unbeatable prices. Free delivery on orders above ₹499!
          </m.p>
          <m.div className="[display:flex] [gap:16px]" variants={fadeIn('up', 0.1)}>
            <Button 
              variant="primary" 
              size="lg"
              className="[background-color:white] hover:[background-color:#f9fafb] [color:#2563eb]"
            >
              Shop Now
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              className="[background-color:#3b82f6] hover:[background-color:#2563eb] [color:white] [border:1px_solid_rgba(255,255,255,0.2)]"
            >
              View Deals
            </Button>
          </m.div>
        </m.div>
      </m.section>

      {/* Categories */}
      <section className="[background-color:white] [border-radius:16px] [padding:16px] sm:[padding:24px] lg:[padding:32px] [width:100%] [box-shadow:0_1px_3px_rgba(0,0,0,0.1)]" data-aos="fade-up">
        <h2 className="[font-size:1.5rem] [font-weight:700] [margin-bottom:32px] [color:#111827]">Shop by Category</h2>
        <div className="[display:grid] [grid-template-columns:repeat(2,1fr)] sm:[grid-template-columns:repeat(3,1fr)] md:[grid-template-columns:repeat(4,1fr)] lg:[grid-template-columns:repeat(6,1fr)] xl:[grid-template-columns:repeat(8,1fr)] [gap:16px]">
          {categories.map((category) => (
            <m.div
              key={category.name}
              className="[background-color:#f9fafb] [border-radius:12px] [padding:24px] [text-align:center] hover:[background-color:#eff6ff] hover:[box-shadow:0_4px_6px_rgba(0,0,0,0.1)] [transition:all_0.3s] [cursor:pointer] [border:1px_solid_#f3f4f6]"
              initial="hidden"
              whileInView="show"
              variants={scaleIn(0, 0.35, 0.95)}
              viewport={viewport}
            >
              <span className="[font-size:2.25rem] [margin-bottom:8px] [display:block]">{category.icon}</span>
              <h3 className="[font-size:0.875rem] [font-weight:500] [color:#374151]">{category.name}</h3>
            </m.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="[width:100%]">
        <div className="[display:flex] [justify-content:space-between] [align-items:center] [margin-bottom:32px]">
          <h2 className="[font-size:1.5rem] [font-weight:700] [color:#111827]">Featured Products</h2>
          <Link to="/products" className="[color:#2563eb] hover:[color:#3b82f6]">
            View All
          </Link>
        </div>
        <m.div className="[display:grid] [grid-template-columns:1fr] sm:[grid-template-columns:repeat(2,1fr)] lg:[grid-template-columns:repeat(3,1fr)] xl:[grid-template-columns:repeat(4,1fr)] 2xl:[grid-template-columns:repeat(5,1fr)] [gap:24px] [width:100%]" initial="hidden" whileInView="show" variants={staggerContainer(0.1)} viewport={viewport}>
          {loadingFeatured ? (
            <div className="col-span-full text-center py-6">Loading featured products...</div>
          ) : (
            (featured || []).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onToggleWishlist={addToWishlist}
                isInWishlist={false}
                className="[background-color:white] hover:[transform:scale(1.05)] [transition:all_0.3s] [box-shadow:0_1px_3px_rgba(0,0,0,0.1)] [border:1px_solid_#f3f4f6]"
              />
            ))
          )}
        </m.div>
      </section>

      {/* Deal of the Day */}
  <section className="[background:linear-gradient(to_right,#f97316,#ef4444)] [border-radius:16px] [padding:16px] sm:[padding:24px] lg:[padding:32px] [width:100%] [box-shadow:0_10px_25px_rgba(0,0,0,0.15)]" data-aos="fade-up">
        <div className="[display:flex] [flex-direction:column] lg:[flex-direction:row] [align-items:center] [gap:32px]">
          <div className="[flex:1] [width:100%]">
            <h2 className="[font-size:1.5rem] [font-weight:700] [margin-bottom:16px] [color:white]">Deal of the Day</h2>
            <h3 className="[font-size:1.25rem] [font-weight:600] [margin-bottom:8px] [color:#fef3c7]">50% OFF</h3>
            <p className="[color:rgba(255,255,255,0.9)] [margin-bottom:16px]">
              Limited time offer on selected electronics. Don't miss out on these amazing deals!
            </p>
            <Button 
              variant="primary"
              size="md"
              className="[background-color:white] hover:[background-color:#f9fafb] [color:#f97316]"
            >
              Shop Now
            </Button>
          </div>
          <div className="[flex:1] [display:flex] [justify-content:center] [width:100%]">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Deal of the Day"
              className="[border-radius:8px] [max-width:100%] [height:auto] [box-shadow:0_10px_25px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
