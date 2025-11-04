import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/api';
import { toast, ToastContainer } from 'react-toastify';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // ✅ Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await API.get('/cart');
      setItems(res.data);
      const totalAmount = res.data.reduce(
        (sum, i) => sum + i.product.price * i.qty,
        0
      );
      setTotal(totalAmount);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Increase quantity
  const increaseQty = async (id) => {
    await API.put(`/cart/increase/${id}`);
    toast.info('Quantity increased', { position: 'top-right', autoClose: 1500 });
    fetchCart();
  };

  // ✅ Decrease quantity
  const decreaseQty = async (id) => {
    await API.put(`/cart/decrease/${id}`);
    toast.info('Quantity decreased', { position: 'top-right', autoClose: 1500 });
    fetchCart();
  };

  // ✅ Remove item
  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`);
    toast.error('Item removed from cart', { position: 'top-right', autoClose: 1500 });
    fetchCart();
  };

  // ✅ Proceed to payment
  const handleCheckout = () => {
    toast.success('Redirecting to payment...', { position: 'top-right', autoClose: 1500 });
    setTimeout(() => navigate('/checkout'), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 relative">
      {/* Toastify container */}
      <ToastContainer />

      <h2 className="text-3xl font-bold mb-8 text-center">🛒 Your Cart</h2>

      {items.length === 0 ? (
        // 🌟 EMPTY CART DESIGN
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center py-20"
        >
          <img
            src="https://www.bing.com/th/id/OIP.Y4AJxhLsIdjwvUCUpfw6DQHaHa?w=212&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            alt="Empty Cart"
            className="w-48 mb-6 opacity-90"
          />
          <h3 className="text-2xl font-semibold mb-2 text-gray-700">
            Your Cart is Empty
          </h3>
          <p className="text-gray-500 mb-6 max-w-md">
            Looks like you haven’t added anything yet. Discover our latest
            collections and find something you’ll love.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </motion.div>
      ) : (
        // 🧺 CART ITEMS + SUMMARY
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map((i) => (
              <motion.div
                key={i._id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center gap-4 border p-4 rounded-lg shadow-sm bg-white"
              >
                <img
                  src={i.product.images?.[0] || '/placeholder.png'}
                  alt={i.product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                <div className="flex-grow">
                  <h4 className="font-semibold text-lg">{i.product.name}</h4>
                  <div className="text-gray-500 text-sm">
                    ₹{i.product.price} × {i.qty}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(i._id)}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-3 font-medium">{i.qty}</span>
                    <button
                      onClick={() => increaseQty(i._id)}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="font-semibold">
                    ₹{(i.product.price * i.qty).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeItem(i._id)}
                    className="px-3 py-1 text-sm border border-gray-700 rounded-md hover:bg-black hover:text-white transition"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="border p-6 rounded-lg shadow-md bg-white"
          >
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-500">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Proceed to Payment
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Cart;
