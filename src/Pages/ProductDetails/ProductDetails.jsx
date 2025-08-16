import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { Button, StarRating, Badge } from '../../components';
import { m, fadeIn, slideIn, viewport } from '../../animation/motion';

// Mock product details - replace with API call
const getProductById = (id) => {
  const mockProduct = {
    id: parseInt(id),
    title: 'Premium Wireless Headphones',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 249.99,
    images: [
      'https://via.placeholder.com/500x500',
      'https://via.placeholder.com/500x500/FF0000',
      'https://via.placeholder.com/500x500/00FF00',
      'https://via.placeholder.com/500x500/0000FF'
    ],
    description: 'Experience premium sound quality with these wireless noise-cancelling headphones. Perfect for music lovers and professionals.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Quick charge technology',
      'Premium comfort design',
      'Bluetooth 5.0 connectivity'
    ],
    specifications: {
      'Brand': 'TechAudio',
      'Model': 'TA-WH1000',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.0, USB-C',
      'Battery Life': '30 hours',
      'Warranty': '2 years'
    },
    rating: { rate: 4.5, count: 1234 },
    reviews: 1234,
    category: 'Electronics',
    inStock: true,
    stockCount: 15,
    colors: ['Black', 'White', 'Silver'],
    sizes: null // Not applicable for headphones
  };
  
  return mockProduct;
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const productData = getProductById(id);
        setProduct(productData);
        setSelectedColor(productData.colors?.[0] || '');
        setSelectedSize(productData.sizes?.[0] || '');
      } catch (error) {
        console.error('Failed to fetch product:', error);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        ...product,
        quantity,
        selectedColor,
        selectedSize
      };
      addToCart(cartItem);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      addToWishlist(product);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <Button onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="w-full space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm">
        <ol className="flex space-x-2">
          <li><button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-700">Home</button></li>
          <li className="text-gray-500">/</li>
          <li><button onClick={() => navigate('/products')} className="text-blue-600 hover:text-blue-700">Products</button></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900">{product.category}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <m.div
          initial="hidden"
          whileInView="show"
          variants={slideIn('left', 0.2)}
          viewport={viewport}
          className="space-y-4"
        >
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-blue-600' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </m.div>

        {/* Product Info */}
        <m.div
          initial="hidden"
          whileInView="show"
          variants={slideIn('right', 0.2)}
          viewport={viewport}
          className="space-y-6"
        >
          {/* Title and Rating */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating.rate} />
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>
            
            {/* Stock Status */}
            {product.inStock ? (
              <Badge variant="success" className="mb-4">
                In Stock ({product.stockCount} available)
              </Badge>
            ) : (
              <Badge variant="error" className="mb-4">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                <Badge variant="warning">{discountPercentage}% OFF</Badge>
              </>
            )}
          </div>

          {/* Color Selection */}
          {product.colors && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedColor === color
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Size: {selectedSize}</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="lg"
              className="flex-1"
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleWishlistToggle}
              variant="outline"
              size="lg"
              className="px-6"
            >
              {isInWishlist(product.id) ? '❤️' : '🤍'}
            </Button>
          </div>
        </m.div>
      </div>

      {/* Product Details Tabs */}
      <m.div
        initial="hidden"
        whileInView="show"
        variants={fadeIn(0.3)}
        viewport={viewport}
        className="bg-white rounded-xl shadow-sm"
      >
        {/* Tab Navigation */}
        <div className="border-b">
          <nav className="flex">
            {[
              { id: 'description', label: 'Description' },
              { id: 'features', label: 'Features' },
              { id: 'specifications', label: 'Specifications' },
              { id: 'reviews', label: 'Reviews' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-2">
                    <dt className="font-semibold text-gray-900">{key}</dt>
                    <dd className="text-gray-700">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-8">
              <p className="text-gray-600">Customer reviews coming soon...</p>
            </div>
          )}
        </div>
      </m.div>
    </div>
  );
};

export default ProductDetails;
