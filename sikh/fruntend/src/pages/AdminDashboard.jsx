import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-black text-white p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">
          Admin Panel
        </h2>
        <ul className="space-y-4 text-lg">
          <li>
            <Link
              to="/admin/products"
              className="block py-2 px-3 rounded-md hover:bg-gray-800 transition"
            >
              🛍️ Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/add"
              className="block py-2 px-3 rounded-md hover:bg-gray-800 transition"
            >
              ➕ Add Product
            </Link>
          </li>
        </ul>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex-1 p-10"
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-semibold mb-4">
            Welcome to <span className="text-gray-700">Nike Store Admin</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Manage products, view analytics, and keep your store up-to-date.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
