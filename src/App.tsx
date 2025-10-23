import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import CulturalHighlights from './components/CulturalHighlights';
import ItineraryPlanner from './components/ItineraryPlanner';
import YourTripPlanner from './components/YourTripPlanner';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import { ItineraryProvider } from './contexts/ItineraryContext';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Handle scroll for dynamic gradient
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic gradient based on scroll
  const getDynamicGradient = () => {
    const maxScroll = 2000;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    
    // Create different color stops based on scroll progress
    const color1 = `hsl(${280 + scrollProgress * 80}, 70%, 60%)`; // Purple to pink
    const color2 = `hsl(${320 + scrollProgress * 40}, 80%, 65%)`; // Pink to orange
    const color3 = `hsl(${20 + scrollProgress * 20}, 90%, 60%)`; // Orange to red
    
    return `linear-gradient(to bottom, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;
  };

  return (
    <ItineraryProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Fixed Sunset Background - Viewport moves through gradient */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: getDynamicGradient(),
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        <Navigation />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <Hero />
          <YourTripPlanner />
          <Destinations />
          <CulturalHighlights />
          <ItineraryPlanner />
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
            </div>
          </section>
          <Footer />
        </motion.main>
        
      </div>
    </ItineraryProvider>
  );
}

export default App;
