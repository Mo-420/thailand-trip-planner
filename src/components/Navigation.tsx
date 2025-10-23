import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, Calendar, Heart } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Destinations', href: '#destinations', icon: MapPin },
    { name: 'Culture', href: '#culture', icon: Heart },
    { name: 'Itinerary', href: '#itinerary', icon: Calendar },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ 
        y: 0,
        opacity: 1
      }}
      transition={{ 
        duration: 0.6, 
        ease: 'easeOut'
      }}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 flex justify-center ${
        isScrolled ? 'top-4' : 'top-6'
      }`}
    >
      <motion.div 
        className={`rounded-full px-8 py-4 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg border border-white/30 shadow-xl' 
            : 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg'
        }`}
        animate={{
          scale: isScrolled ? 0.95 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-12 h-10">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <motion.div 
              className="w-8 h-8 thai-gradient rounded-lg flex items-center justify-center"
              animate={{
                scale: isScrolled ? 0.9 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold text-sm">TH</span>
            </motion.div>
            <motion.span 
              className={`font-semibold transition-all duration-300 ${
                isScrolled ? 'text-lg text-gray-800' : 'text-lg text-white'
              }`}
              animate={{
                opacity: isScrolled ? 0.9 : 1,
              }}
            >
              Thailand Trip
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 transition-all duration-300 text-sm font-medium hover:text-thai-orange ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-thai-orange' 
                    : 'text-white hover:text-thai-orange'
                }`}
                animate={{
                  opacity: isScrolled ? 0.9 : 1,
                }}
              >
                <motion.div
                  animate={{
                    scale: isScrolled ? 0.9 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon className="w-4 h-4" />
                </motion.div>
                <span className="font-medium">{item.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              isScrolled 
                ? 'hover:bg-gray-100' 
                : 'hover:bg-white/20'
            }`}
            animate={{
              scale: isScrolled ? 0.9 : 1,
            }}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`} />
            ) : (
              <Menu className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`} />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden mt-3 rounded-2xl transition-all duration-300 ${
              isScrolled 
                ? 'bg-white/95 backdrop-blur-lg border border-white/30 shadow-xl' 
                : 'liquid-glass'
            }`}
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ x: 8 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 transition-all duration-300 py-2 hover:text-thai-orange ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-thai-orange' 
                      : 'text-white hover:text-thai-orange'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
