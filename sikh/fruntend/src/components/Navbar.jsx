import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingBag, FaUser, FaHome, FaInfoCircle, FaPhone } from "react-icons/fa";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
    { name: "Contact", path: "/contact", icon: <FaPhone /> },
    { name: "Cart", path: "/cart", icon: <FaShoppingBag /> },
  ];

  return (
    <>
      {/* --- Desktop Navbar --- */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block sticky top-0 z-50 bg-white shadow-md backdrop-blur-md"
      >
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-2xl font-extrabold tracking-wider hover:text-gray-700 transition"
          >
            <img
              src="https://th.bing.com/th/id/OIP.6mXNtWzQ5OSWbzlsurOQpgHaHa?w=198&h=198&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              alt="Nike"
              className="w-10 h-10 mr-2"
            />
            XNova - Aim
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative text-sm font-medium transition ${
                  location.pathname === item.path
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-black rounded"
                  />
                )}
              </Link>
            ))}

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center hover:text-black transition"
            >
              <FaShoppingBag size={18} />
              <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">
                0
              </span>
            </Link>

            {/* Auth Buttons */}
            {user ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold"
                >
                  <FaUser />
                </motion.div>
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-1 text-sm font-semibold border border-gray-800 rounded-md hover:bg-black hover:text-white transition"
                >
                  Logout
                </button>
              </motion.div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1 text-sm border border-gray-700 rounded-md hover:bg-black hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* --- Mobile Navbar (Bottom Navigation) --- */}
      
      <motion.nav
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)] flex justify-around items-center py-2 z-50"
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center text-xs ${
              location.pathname === item.path
                ? "text-black font-semibold"
                : "text-gray-500 hover:text-black"
            }`}
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="text-lg"
            >
              {item.icon}
            </motion.div>
            <span>{item.name}</span>
          </Link>
        ))}

        {/* Profile / Logout Button */}
        {user ? (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={logout}
            className="flex flex-col items-center text-xs text-gray-600 hover:text-black"
          >
            <FaUser />
            <span>Logout</span>
          </motion.button>
        ) : (
          <Link
            to="/login"
            className="flex flex-col items-center text-xs text-gray-600 hover:text-black"
          >
            <FaUser />
            <span>Login</span>
          </Link>
        )}
      </motion.nav>
    </>
  );
};

export default Navbar;
