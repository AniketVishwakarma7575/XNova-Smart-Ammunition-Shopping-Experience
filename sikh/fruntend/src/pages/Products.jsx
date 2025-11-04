import React, { useEffect, useState } from "react";
import API from "../api/api";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

const Products = () => {
  const [products, setProducts] = useState([]);

  // API se products fetch karna
  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <Header
        title="Our Latest Collection"
        subtitle="Discover the newest drops, bestsellers, and exclusive releases."
        cta="Explore Now"
        image="https://images.unsplash.com/photo-1606813902915-9b42d7a3b3b0?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Products Section */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
          All Products
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} p={product} />
              
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
