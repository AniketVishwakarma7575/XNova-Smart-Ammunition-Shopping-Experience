import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    brand: "",
    images: "",
    sizes: "",
    category: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

    if (name === "images") {
      const urls = value.split(",").map((url) => url.trim());
      setPreviewImages(urls);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/products/add", {
        ...product,
        images: product.images.split(",").map((img) => img.trim()),
        sizes: product.sizes.split(",").map((s) => s.trim()),
      });
      alert("✅ Product Added Successfully!");
      navigate("/admin/products");
    } catch (err) {
      alert("❌ Error adding product. Check console for details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          🛍️ Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Product Name</label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-black/40 outline-none"
              placeholder="e.g. Nike Air Force 1"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold mb-1">Slug (unique)</label>
            <input
              name="slug"
              value={product.slug}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-black/40 outline-none"
              placeholder="e.g. nike-air-force-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={3}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-black/40 outline-none"
              placeholder="Enter product description"
            />
          </div>

          {/* Price, Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full border p-3 rounded-md focus:ring-2 focus:ring-black/40 outline-none"
                placeholder="e.g. 99"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="w-full border p-3 rounded-md focus:ring-2 focus:ring-black/40 outline-none"
                placeholder="e.g. 50"
              />
            </div>
          </div>

          {/* Brand & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Brand</label>
              <input
                name="brand"
                value={product.brand}
                onChange={handleChange}
                className="w-full border p-3 rounded-md focus:ring-2 focus:ring-black/40 outline-none"
                placeholder="e.g. Nike"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Category</label>
              <input
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full border p-3 rounded-md focus:ring-2 focus:ring-black/40 outline-none"
                placeholder="e.g. Shoes"
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Available Sizes (comma separated)
            </label>
            <input
              name="sizes"
              value={product.sizes}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-black/40 outline-none"
              placeholder="e.g. 6,7,8,9"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Image URLs (comma separated)
            </label>
            <input
              name="images"
              value={product.images}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-black/40 outline-none"
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />

            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {previewImages.map((img, i) => (
                  <motion.img
                    key={i}
                    src={img}
                    alt="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-32 object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
