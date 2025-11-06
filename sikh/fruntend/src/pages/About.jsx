import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* ✅ HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.pexels.com/photos/33148/shoes-lebron-nike-spalding.jpg"
            alt="Nike hero"
            className="w-full h-[80vh] object-cover brightness-75"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight text-black">
              Born to Move — Built for Performance
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-black/80">
              At <span className="font-semibold">Waprn Shop</span>, we redefine modern luxury with effortless style and confidence.
              Every piece is crafted with precision — blending premium quality, bold design, and timeless appeal.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-3 border border-black bg-white text-black px-5 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Shop Latest
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              <a
                href="#story"
                className="inline-flex items-center justify-center gap-3 px-5 py-3 rounded-full border border-black/40 text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                Our Story
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ✅ MISSION & VALUES */}
      <section id="story" className="container mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
              To bring comfort, style, and quality to every shopper in the world.
              We create fashion that blends modern trends, sustainable fabrics, and everyday affordability — helping you express your style with confidence.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  num: "1",
                  title: "Innovation",
                  desc: "Constant R&D for lighter, stronger, faster gear.",
                },
                {
                  num: "2",
                  title: "Sustainability",
                  desc: "Reducing waste and using recycled materials where possible.",
                },
              ].map((item) => (
                <li key={item.num} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-black text-white font-semibold flex-shrink-0">
                    {item.num}
                  </span>
                  <div>
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg"
                alt="Feature sneakers"
                className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ✅ MILESTONES */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">Milestones</h3>
          <div className="space-y-6">
            {[
              {
                year: "2015",
                title: "The Beginning of Waprn",
                desc: "Founded with a vision to redefine urban fashion with luxury-grade quality and modern aesthetics.",
              },
              {
                year: "2018",
                title: "Style Meets Innovation",
                desc: "Introduced exclusive collections blending premium fabrics, bold designs, and everyday versatility.",
              },
              {
                year: "2024",
                title: "Sustainable Fashion Era",
                desc: "Launched eco-conscious lines crafted with recycled materials, promoting style with purpose.",
              },
            ].map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
              >
                <div className="flex-none w-12 h-12 rounded-full bg-black text-white grid place-items-center font-semibold text-sm sm:text-base">
                  {m.year}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{m.title}</h4>
                  <p className="text-gray-600 text-sm sm:text-base">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ TEAM */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">Meet the Team</h3>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          Designers, athletes, and dreamers who bring the brand to life.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Aman Singh", role: "Head of Design", img: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg" },
            { name: "Mrudul Pari", role: "Product Manager", img: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg" },
            { name: "Aniket Lohar", role: "Performance Coach", img: "https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg" },
            { name: "Sidd Bhai", role: "Sustainability Lead", img: "https://images.pexels.com/photos/3678428/pexels-photo-3678428.jpeg" },
          ].map((m) => (
            <motion.article
              key={m.name}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-xl transition-all duration-300"
            >
              <img
                src={m.img}
                alt={m.name}
                className="w-full h-48 sm:h-56 object-cover rounded-lg"
              />
              <h4 className="mt-3 font-semibold text-lg">{m.name}</h4>
              <p className="text-sm text-gray-600">{m.role}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ✅ CTA FOOTER */}
      <section className="bg-black text-white py-12 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold">Ready to Move?</h4>
            <p className="text-gray-300 mt-1 text-sm sm:text-base">
              Explore the latest collection built to push limits.
            </p>
          </div>
          <Link
            to="/"
            className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
