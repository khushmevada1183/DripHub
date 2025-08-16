import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    { id: 1, name: 'Electronics', slug: 'electronics', icon: '🔌', count: 156 },
    { id: 2, name: 'Fashion', slug: 'fashion', icon: '👕', count: 289 },
    { id: 3, name: 'Home & Kitchen', slug: 'home-kitchen', icon: '🏠', count: 203 },
    { id: 4, name: 'Books', slug: 'books', icon: '📚', count: 445 },
    { id: 5, name: 'Sports', slug: 'sports', icon: '⚽', count: 178 },
    { id: 6, name: 'Beauty', slug: 'beauty', icon: '💄', count: 167 },
    { id: 7, name: 'Toys', slug: 'toys', icon: '🎮', count: 234 },
    { id: 8, name: 'Automotive', slug: 'automotive', icon: '🚗', count: 89 }
  ];

  return (
    <div className="w-full space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Shop by Category
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our wide selection of products organized by category
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="p-8 text-center">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600">
                {category.count} products
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Categories */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Featured Collections</h2>
        <p className="text-blue-100 mb-6">
          Discover our curated collections of trending products
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">New Arrivals</span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Best Sellers</span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Limited Edition</span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Trending Now</span>
        </div>
      </div>
    </div>
  );
};

export default Categories;
