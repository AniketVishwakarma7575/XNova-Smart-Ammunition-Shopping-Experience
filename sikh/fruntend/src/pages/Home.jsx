import React, { useEffect, useState } from "react";
import API from "../api/api";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import Placholder from "./placholder";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 🌟 Hero Section */}
      <Header
        title="Just Do It — New Drops"
        subtitle="Arm yourself with the finest selection of tactical weapons and defense gear."
        cta="Shop Now"
        image="https://images.pexels.com/photos/18858931/pexels-photo-18858931.jpeg"
        onCtaClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
      />

      {/* 🛍️ Product Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900 text-center sm:text-left"
        >
          🔥 Trending Now
        </motion.h2>

        {/* Loader / Empty / Product Grid */}
        {loading ? (
          <>
            <p className="text-gray-500 text-center mb-6">Loading products...</p>
            <Placholder />
          </>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
              alt="No Products"
              className="w-28 mb-4 opacity-80"
            />
            <p className="text-gray-600 text-lg font-medium">
              No products available right now.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            {products.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Home;
