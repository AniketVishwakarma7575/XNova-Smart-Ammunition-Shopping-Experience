import React, { useState } from "react";
import { motion } from "framer-motion";

// ✅ Local Button + Card Components
const Button = ({ children, className = "", onClick, ...props }) => (
  <button
    onClick={onClick}
    {...props}
    className={`transition duration-200 px-4 py-2 font-semibold rounded-md focus:outline-none ${className}`}
  >
    {children}
  </button>
);


const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

// ✅ Shop Component
const Shop = () => {
  const categories = [
    "All",
    "Rifles",
    "Pistols",
    "Shotguns",
    "Ammunition",
    "Accessories",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // ✅ Detect screen resize to toggle dropdown automatically
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const products = [
    {
      id: 1,
      name: "AK-47 Rifle",
      category: "Rifles",
      price: 120000,
      img: "https://plus.unsplash.com/premium_photo-1663089644699-2efac1259318?auto=format&fit=crop&q=60&w=1000",
    },
    {
      id: 2,
      name: "Glock 19",
      category: "Pistols",
      price: 65000,
      img: "https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=60&w=1000",
    },
    {
      id: 3,
      name: "Remington 870 Shotgun",
      category: "Shotguns",
      price: 85000,
      img: "https://images.unsplash.com/photo-1683580366058-26f0afb5a21f?auto=format&fit=crop&q=60&w=1000",
    },
    {
      id: 4,
      name: "9mm Ammo Box",
      category: "Ammunition",
      price: 2500,
      img: "https://images.unsplash.com/photo-1700774607099-8c4631ee9764?auto=format&fit=crop&q=60&w=1000",
    },
    {
      id: 5,
      name: "Tactical Vest",
      category: "Accessories",
      price: 8000,
      img: "https://media.istockphoto.com/id/1392984356/photo/soldier-in-gloves-holding-miltary-armor-vest.webp?a=1&b=1&s=612x612&w=0&k=20&c=BNiDB-C3RCduuqudUeHlyOnuzk1psIvQwLeZZ34BnM0=",
    },
    {
      id: 6,
      name: "Sniper Rifle AWM",
      category: "Rifles",
      price: 200000,
      img: "https://plus.unsplash.com/premium_photo-1661880357497-5479f9a7ed78?auto=format&fit=crop&q=60&w=1000",
    },
    {
      id: 7,
      name: "Tactical Knife",
      category: "Accessories",
      price: 2500,
      img: "https://plus.unsplash.com/premium_photo-1680788454084-2f562bcbbc01?auto=format&fit=crop&q=60&w=1000",
    },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10 px-5">
     
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold text-center mb-10 tracking-wide"
      >
        XNova -Aim Ammunation Store
      </motion.h1>

      {/* 🔘 Category Filter (Responsive) */}
      <div className="flex justify-center mb-10">
        {isMobile ? (
          // 📱 Dropdown for mobile
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-full px-4 py-2 text-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        ) : (
          // 💻 Buttons for desktop
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-6 py-2 text-lg transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-transparent border border-gray-500 text-gray-300 hover:text-white hover:border-white"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* 💥 Product Grid */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center"
      >
        {filteredProducts.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-red-600/30 border border-gray-700"
          >
            <img
              src={item.img}
              alt={item.name}
              className="h-56 w-full object-cover"
            />
            <CardContent className="p-5 text-center">
              <h2 className="text-xl font-semibold text-white">{item.name}</h2>
              <p className="text-gray-400 text-sm mt-1">{item.category}</p>
              <p className="text-lg font-bold text-red-400 mt-3">
                ₹{item.price.toLocaleString()}
              </p>
              <Button className="mt-4 w-full bg-red-600 hover:bg-red-700 rounded-full">
                Add to Cart
              </Button>
            </CardContent>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Shop;
