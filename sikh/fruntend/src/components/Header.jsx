import React from 'react';
import { motion } from 'framer-motion';

/**
 * Props:
 * - title (string) - main headline
 * - subtitle (string) - supporting text
 * - cta (string) - button text
 * - image (string) - background image path
 * - onCtaClick (fn) - click handler for CTA
 */
const Header = ({
  title = 'Just Do It — New Drops',
  subtitle = 'Discover our latest sneakers and apparel.',
  cta = 'Shop Now',
  image = '/hero.jpg',
  onCtaClick = () => {}
}) => {
  return (
    <header className="relative overflow-hidden">
      {/* Background image + dark gradient overlay for readability */}
      <div className="absolute inset-0 -z-10">
        <img
          src='https://images.pexels.com/photos/18858931/pexels-photo-18858931.jpeg'
          alt="Hero background"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          {/* Heading block with entrance animation */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="mt-4 text-black/90 text-sm sm:text-base md:text-lg max-w-xl"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className="mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCtaClick}
              aria-label={cta}
              className="inline-flex items-center gap-3 bg-white text-black px-5 py-3 rounded-full font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              <span>{cta}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 120" className="w-full h-20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C180,120 360,0 720,40 C1080,80 1260,20 1440,40 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>
    </header>
  );
};

export default Header;
