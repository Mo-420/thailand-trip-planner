import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Calendar, Users } from 'lucide-react';
// import OptimizedImage from './OptimizedImage';

const Hero: React.FC = () => {
  const scrollToNext = () => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          width: '100%',
          height: '100%'
        }}
      >
        <div className="absolute inset-0 bg-black/10 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-glass p-8 sm:p-12 lg:p-16 space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-gradient-hero">Discover</span>
              <br />
              <span className="text-white">Thailand</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            >
              Experience the Land of Smiles with its vibrant culture, stunning landscapes, 
              and unforgettable adventures
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-12"
          >
            {[
              { icon: MapPin, label: 'Destinations', value: '50+' },
              { icon: Calendar, label: 'Days', value: '7-14' },
              { icon: Users, label: 'Experiences', value: '100+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="flex flex-col items-center space-y-2 px-6 py-5 rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 shadow-lg"
              >
                <div className="w-12 h-12 thai-gradient rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient-hero">{stat.value}</div>
                  <div className="text-sm text-white">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('itinerary')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 thai-gradient text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Planning
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log('Explore Destinations button clicked');
                // Try multiple ways to find the destinations section
                let destinationsElement = document.getElementById('destinations');
                
                if (!destinationsElement) {
                  // Try finding by class or other selectors
                  destinationsElement = document.querySelector('[id="destinations"]');
                }
                
                if (destinationsElement) {
                  console.log('Found destinations element, scrolling...');
                  destinationsElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                  });
                } else {
                  console.log('Destinations element not found, trying alternative approach');
                  // Fallback: scroll to a specific position or try to find the section
                  window.scrollTo({
                    top: window.innerHeight * 1.5, // Scroll down by 1.5 viewport heights
                    behavior: 'smooth'
                  });
                }
              }}
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg"
            >
              Explore Destinations
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-white/80 hover:text-white transition-colors"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
