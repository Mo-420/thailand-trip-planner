import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Star, Users, Heart, Check } from 'lucide-react';
import { Destination } from '../types';
import { getImageForPlace } from '../utils/imageLoader';
import SimpleImageCarousel from './SimpleImageCarousel';
import { useItinerary } from '../contexts/ItineraryContext';

interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

const DestinationModal: React.FC<DestinationModalProps> = ({ destination, isOpen, onClose }) => {
  const { addDestination, isDestinationSelected } = useItinerary();
  
  if (!destination) return null;

  const handleAddToItinerary = () => {
    addDestination(destination.name);
    // Show success feedback
    console.log(`Added ${destination.name} to itinerary!`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="liquid-glass rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="relative h-80 overflow-hidden">
                <SimpleImageCarousel
                  images={[getImageForPlace(destination.name)]}
                  alt={`${destination.name} - ${destination.description}`}
                  className="w-full h-full"
                  autoPlay={true}
                  autoPlayInterval={5000}
                />
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{destination.name}</h2>
                  <p className="text-white/90 text-lg">{destination.description}</p>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2 text-apple-gray-600">
                    <Clock className="w-4 h-4 text-thai-orange" />
                    <span className="text-sm">{destination.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-apple-gray-600">
                    <MapPin className="w-4 h-4 text-thai-orange" />
                    <span className="text-sm">{destination.category}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-apple-gray-600">
                    <Star className="w-4 h-4 text-thai-orange" />
                    <span className="text-sm">{destination.bestTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-apple-gray-600">
                    <Users className="w-4 h-4 text-thai-orange" />
                    <span className="text-sm">Popular</span>
                  </div>
                </div>
                
                {/* Highlights */}
                <div>
                  <h3 className="text-xl font-semibold text-apple-gray-800 mb-4 flex items-center">
                    <Heart className="w-5 h-5 text-thai-orange mr-2" />
                    Must-See Highlights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl"
                      >
                        <div className="w-2 h-2 bg-thai-orange rounded-full flex-shrink-0" />
                        <span className="text-apple-gray-700">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Detailed Description */}
                <div>
                  <h3 className="text-xl font-semibold text-apple-gray-800 mb-4">About {destination.name}</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-apple-gray-600 leading-relaxed">
                      {destination.name === 'Bangkok' && 
                        "Bangkok, Thailand's vibrant capital, is a city where ancient temples stand alongside modern skyscrapers. Experience the Grand Palace's golden splendor, explore the bustling Chatuchak Weekend Market, and cruise along the Chao Phraya River. From street food adventures in Chinatown to rooftop bars with stunning city views, Bangkok offers an unforgettable urban experience."
                      }
                      {destination.name === 'Chiang Mai' && 
                        "Chiang Mai, the cultural heart of Northern Thailand, is surrounded by misty mountains and ancient temples. Discover the sacred Doi Suthep Temple, explore the historic Old City's narrow streets, and experience the vibrant Night Bazaar. This charming city offers a perfect blend of traditional Thai culture and modern amenities."
                      }
                      {destination.name === 'Phuket' && 
                        "Phuket, Thailand's largest island, is a tropical paradise with pristine beaches, crystal-clear waters, and vibrant nightlife. Relax on the famous Patong Beach, take a boat trip to the stunning Phi Phi Islands, and visit the iconic Big Buddha statue. From water sports to cultural experiences, Phuket has something for every traveler."
                      }
                      {destination.name === 'Krabi' && 
                        "Krabi is a nature lover's paradise, famous for its dramatic limestone cliffs, emerald waters, and secluded beaches. Climb the 1,237 steps to Tiger Cave Temple for panoramic views, relax on Railay Beach (accessible only by boat), and explore the stunning Hong Islands. Krabi offers the perfect escape into Thailand's natural beauty."
                      }
                      {destination.name === 'Ayutthaya' && 
                        "Ayutthaya, Thailand's ancient capital, is a UNESCO World Heritage site filled with magnificent temple ruins and historical treasures. Explore the impressive Wat Chaiwatthanaram, discover the mysterious Wat Mahathat with its famous Buddha head in tree roots, and learn about Thailand's rich history. This archaeological wonder takes you back in time."
                      }
                      {destination.name === 'Pai' && 
                        "Pai, a charming mountain town in Northern Thailand, is known for its relaxed atmosphere, hot springs, and stunning natural landscapes. Soak in the natural hot springs, hike through Pai Canyon for breathtaking views, and experience the bohemian culture of this hippie paradise. Pai offers a peaceful retreat from the hustle and bustle of city life."
                      }
                    </p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToItinerary}
                    className={`flex-1 px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isDestinationSelected(destination.name)
                        ? 'bg-thai-green text-white'
                        : 'thai-gradient text-white'
                    }`}
                  >
                    {isDestinationSelected(destination.name) ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Added to Itinerary</span>
                      </>
                    ) : (
                      <span>Add to Itinerary</span>
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 bg-white/20 backdrop-blur-md text-apple-gray-700 font-semibold rounded-xl border border-apple-gray-200 hover:bg-white/30 transition-all duration-300"
                  >
                    Save for Later
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DestinationModal;
