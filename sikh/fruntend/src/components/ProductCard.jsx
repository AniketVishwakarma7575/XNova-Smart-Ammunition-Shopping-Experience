import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/api'; // ✅ Import your API instance (axios configured)
// import { toast } from "react-toasticd fy"; // ✅ Import toast
import { toast, ToastContainer } from 'react-toastify';


const ProductCard = ({ p }) => {
  
  // ✅ Function to handle Add to Cart
  const handleAddToCart = async (e) => {
    e.preventDefault(); // prevent Link click
    try {
      const res = await API.post('/cart', {
        productId: p._id,
        qty: 1,
      });
      // alert('🛒 Product added to cart!');
      toast.success(`${p.name} added to cart!`, { position: 'top-right', autoClose: 3500 });

      console.log('Added:', res.data);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add to cart');
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border rounded-2xl overflow-hidden hover:shadow-2xl transition-all bg-white"
    >
       {/* Toastify container */}
      <ToastContainer />
      <Link to={`/products/${p._id}`}>
        {/* Product Image */}
        <div className="overflow-hidden">
          <motion.img
            src={p.images?.[0] || '/placeholder.png'}
            alt={p.name}
            className="w-full h-56 object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
          />
        </div>



        {/* Product Details */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 truncate">{p.name}</h3>
          <p className="text-gray-500 text-sm mt-1">{p.brand}</p>
          <div className="mt-3 text-xl font-bold text-gray-800">₹{p.price}</div>

          <div className="mt-3 flex justify-between items-center">
            {/* ✅ Add to Cart button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleAddToCart}
              className="px-3 py-1 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Add to Cart
            </motion.button>

            {/* Buy Now Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 text-sm border border-black rounded-md hover:bg-black hover:text-white transition"
            >
              Buy Now
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
