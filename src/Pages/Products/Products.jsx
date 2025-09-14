import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components';
import { useCart } from '../../Context/CartContext';
import { m, staggerContainer, fadeIn, viewport } from '../../animation/motion';
import { getProducts } from '../../api/Api';

const Products = () => {
  const [searchParams] = useSearchParams();
  const { addToCart, addToWishlist } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sort') || 'featured',
  });

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const apiFilters = {};
        if (filters.category) apiFilters.category = filters.category;
        if (filters.minPrice) apiFilters.min_price = filters.minPrice;
        if (filters.maxPrice) apiFilters.max_price = filters.maxPrice;

        const response = await getProducts(apiFilters);

        if (!mounted) return;

        if (response && response.success && Array.isArray(response.data)) {
          let items = response.data.map((p) => ({
            id: p.id,
            title: p.title || p.name,
            name: p.title || p.name,
            price: p.price,
            image: p.image || p.thumbnail || 'https://via.placeholder.com/300',
            description: p.description,
            rating: p.rating || { rate: p.avg_rating || 0, count: p.reviews || 0 },
            reviews: p.reviews || 0,
            category: p.category || p.category_name || ''
          }));

          // Client-side filtering for any unsupported fields
          if (filters.category) {
            items = items.filter(item => (item.category || '').toLowerCase() === filters.category.toLowerCase());
          }
          if (filters.minPrice) {
            items = items.filter(item => item.price >= parseFloat(filters.minPrice));
          }
          if (filters.maxPrice) {
            items = items.filter(item => item.price <= parseFloat(filters.maxPrice));
          }

          // Sorting
          switch (filters.sortBy) {
            case 'price-low':
              items.sort((a, b) => a.price - b.price);
              break;
            case 'price-high':
              items.sort((a, b) => b.price - a.price);
              break;
            case 'rating':
              items.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
              break;
            default:
              // featured - keep API order
              break;
          }

          setProducts(items);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => { mounted = false; };
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          All Products
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our complete collection of amazing products at unbeatable prices
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Furniture">Furniture</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price
            </label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              placeholder="₹0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price
            </label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              placeholder="₹999"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <m.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full"
          initial="hidden"
          whileInView="show"
          variants={staggerContainer(0.1)}
          viewport={viewport}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleWishlist={addToWishlist}
              isInWishlist={false}
              className="bg-white hover:transform hover:scale-105 transition-all duration-300"
            />
          ))}
        </m.div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters to find what you're looking for.
          </p>
          <button
            onClick={() => setFilters({ category: '', minPrice: '', maxPrice: '', sortBy: 'featured' })}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Results Summary */}
      {products.length > 0 && (
        <div className="text-center text-gray-600">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default Products;
