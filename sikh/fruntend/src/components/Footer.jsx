import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black/90 text-black py-20 overflow-hidden">
      {/* 🔹 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://cdn.prod.website-files.com/64fe1f9c06690a6cee3471ec/67a4cfee6f6880748fa2aa77_weastcoast-thumbnail.avif')",
        }}
      ></div>

      {/* 🔹 Soft gradient overlay for depth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3, scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-t from-purple-700/30 via-blue-500/10 to-transparent blur-3xl"
      ></motion.div>

      {/* 🔹 Content Wrapper */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
        >
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 text-transparent bg-clip-text">
            Just Do It.
          </span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-300 max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed"
        >
          Pushing boundaries, redefining limits — empowering athletes, dreamers, and doers.{" "}
          <span className="text-white font-medium">Because greatness is built, not born.</span>
        </motion.p>

        {/* 🔹 Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-8 mb-12"
        >
          {[
            { Icon: FaInstagram, link: "https://instagram.com" },
            { Icon: FaTwitter, link: "https://twitter.com" },
            { Icon: FaFacebookF, link: "https://facebook.com" },
            { Icon: FaYoutube, link: "https://youtube.com" },
          ].map(({ Icon, link }, i) => (
            <motion.a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -4 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-gray-400 hover:text-white transition"
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>

        {/* 🔹 Divider Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.7 }}
          className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent w-3/4 mx-auto mb-8"
        ></motion.div>

        {/* 🔹 Footer Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-400"
        >
          <p>© {new Date().getFullYear()} Nike Inc. All Rights Reserved.</p>
          <span className="hidden md:block text-gray-700">•</span>
          <p>
            Designed & Developed by{" "}
            <span className="text-white font-medium hover:text-purple-400 transition">
              Aniket Vishwakarma
            </span>
          </p>
        </motion.div>
      </div>

      {/* 🔹 Subtle Floating Glow Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-purple-700/10 rounded-full blur-3xl"
      ></motion.div>
    </footer>
  );
};

export default Footer;
