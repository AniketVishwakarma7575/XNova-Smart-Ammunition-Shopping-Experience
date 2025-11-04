import React, { useEffect, useState } from 'react';
import API from '../api/api';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import Placholder from './placholder';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <Header
        title="Just Do It — New Drops"
        subtitle="Arm yourself with the finest selection of tactical weapons and defense gear."
        cta="Shop Now"
        image="https://images.pexels.com/photos/18858931/pexels-photo-18858931.jpeg"
        onCtaClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
      />

      <section className="container mx-auto px-6 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-gray-900"
        >
          🔥 Trending Now
        </motion.h2>

        {loading ? (
          <>
          <p className="text-gray-500 text-center">Loading products...</p>
          <Placholder/>
          </>

        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products available right now.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
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
