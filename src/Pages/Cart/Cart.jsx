import { useCart } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import { Button } from '../../components';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-8">Your Cart</h2>
        <div className="bg-white rounded-lg shadow-md p-8 text-center w-full max-w-2xl mx-auto">
          <p className="text-xl mb-4">Your cart is empty</p>
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
      <h2 className="text-3xl font-bold mb-8">Your Cart</h2>
      <div className="grid grid-cols-1 xl:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <div className="xl:col-span-2 w-full">
          <div className="gap-2 md:gap-3 lg:gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full"
              >
                <img
                  src={item.image}
                  alt={item.name || item.title}
                  className="w-24 h-24 object-cover rounded flex-shrink-0"
                />
                <div className="flex-grow min-w-0 w-full">
                  <h3 className="text-lg font-semibold truncate">{item.name || item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      -
                    </Button>
                    <span className="px-3 py-1 bg-gray-100 rounded min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 border-red-200 hover:border-red-300 flex-shrink-0"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="xl:col-span-1 w-full">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button variant="primary" size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 