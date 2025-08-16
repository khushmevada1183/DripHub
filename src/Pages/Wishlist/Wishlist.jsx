import { useCart } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import { Button, ProductCard } from '../../components';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-8">Your Wishlist</h2>
        <div className="bg-white rounded-lg shadow-md p-8 text-center w-full max-w-2xl mx-auto">
          <p className="text-xl mb-4">Your wishlist is empty</p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold mb-8">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
        {wishlist.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onAddToCart={addToCart}
            onToggleWishlist={() => removeFromWishlist(item.id)}
            isInWishlist={true}
            showWishlistAsRemove={true}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 