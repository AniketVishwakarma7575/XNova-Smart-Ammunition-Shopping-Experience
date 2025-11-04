import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product by ID
  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="border-4 border-gray-300 border-t-black w-10 h-10 rounded-full"
        />
        <span className="ml-3">Loading product...</span>
      </div>
    );
  }

  // 🚫 Product not found
  if (!product) {
    return (
      <div className="text-center text-lg py-20 text-gray-700">
        Product not found
      </div>
    );
  }

  // ✅ Product details
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 py-12 px-6"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
        
        {/* Product Image */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <motion.img
            src={product.images?.[0] || "https://via.placeholder.com/500"}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 p-8 flex flex-col justify-center"
        >
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-500 mb-3 capitalize">{product.category}</p>
          <p className="text-2xl font-bold text-gray-800 mb-4">
            ₹{product.price}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description ||
              "This premium product is designed with high-quality materials for comfort and durability."}
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border border-black rounded-md hover:bg-black hover:text-white transition"
            >
              Buy Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
