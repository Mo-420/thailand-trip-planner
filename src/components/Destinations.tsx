import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { Destination } from '../types';
import { loadImageMetadata, getImageForPlace } from '../utils/imageLoader';
// import ImageCarousel from './ImageCarousel';
import SimpleImageCarousel from './SimpleImageCarousel';
import DestinationModal from './DestinationModal';

const Destinations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [imageMetadata] = useState<any>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   loadImageMetadata().then(setImageMetadata);
  // }, []);

  const destinations: Destination[] = [
    {
      id: '1',
      name: 'Bangkok',
      description: 'The vibrant capital city where ancient temples meet modern skyscrapers',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      highlights: ['Grand Palace', 'Wat Pho', 'Chatuchak Market', 'Khao San Road'],
      bestTime: 'Nov - Feb',
      duration: '3-4 days',
      category: 'city'
    },
    {
      id: '2',
      name: 'Chiang Mai',
      description: 'Northern cultural hub surrounded by mountains and ancient temples',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      highlights: ['Doi Suthep', 'Old City', 'Night Bazaar', 'Elephant Sanctuary'],
      bestTime: 'Nov - Feb',
      duration: '4-5 days',
      category: 'culture'
    },
    {
      id: '3',
      name: 'Phuket',
      description: 'Thailand\'s largest island with stunning beaches and vibrant nightlife',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      highlights: ['Patong Beach', 'Phi Phi Islands', 'Big Buddha', 'Old Town'],
      bestTime: 'Nov - Apr',
      duration: '5-7 days',
      category: 'beach'
    },
    {
      id: '4',
      name: 'Krabi',
      description: 'Dramatic limestone cliffs and pristine beaches in southern Thailand',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      highlights: ['Railay Beach', 'Tiger Cave Temple', 'Hong Islands', 'Emerald Pool'],
      bestTime: 'Nov - Apr',
      duration: '4-6 days',
      category: 'nature'
    },
    {
      id: '5',
      name: 'Ayutthaya',
      description: 'Ancient capital with magnificent temple ruins and historical sites',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      highlights: ['Wat Mahathat', 'Wat Chaiwatthanaram', 'Ayutthaya Historical Park'],
      bestTime: 'Nov - Feb',
      duration: '1-2 days',
      category: 'temple'
    },
    {
      id: '6',
      name: 'Pai',
      description: 'Mountain town known for its relaxed vibe and natural hot springs',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      highlights: ['Pai Canyon', 'Hot Springs', 'Walking Street', 'Waterfalls'],
      bestTime: 'Nov - Feb',
      duration: '2-3 days',
      category: 'nature'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', color: 'thai-orange' },
    { id: 'city', name: 'Cities', color: 'thai-blue' },
    { id: 'beach', name: 'Beaches', color: 'thai-teal' },
    { id: 'culture', name: 'Culture', color: 'thai-purple' },
    { id: 'nature', name: 'Nature', color: 'thai-green' },
    { id: 'temple', name: 'Temples', color: 'thai-gold' }
  ];

  const filteredDestinations = selectedCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === selectedCategory);

  return (
    <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-thai font-bold text-apple-gray-900 mb-4">
            Discover Amazing <span className="text-gradient-thai">Destinations</span>
          </h2>
          <p className="text-xl text-apple-gray-600 max-w-3xl mx-auto">
            From bustling cities to pristine beaches, explore Thailand's diverse landscapes and rich culture
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-${category.color} text-white shadow-apple-lg`
                  : 'glass-effect text-apple-gray-700 hover:bg-apple-gray-100'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedDestination(destination);
                setIsModalOpen(true);
              }}
              className="group cursor-pointer"
            >
              <div className="liquid-glass glass-hover overflow-hidden transition-all duration-300">
                {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <SimpleImageCarousel
                      images={[getImageForPlace(destination.name)]}
                      alt={`${destination.name} - ${destination.description}`}
                      className="w-full h-full"
                      autoPlay={true}
                      autoPlayInterval={4000}
                    />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-thai-orange">
                      {destination.duration}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-apple-gray-900">{destination.name}</h3>
                    <div className="flex items-center text-thai-orange">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">4.8</span>
                    </div>
                  </div>

                  <p className="text-apple-gray-600 mb-4 line-clamp-2">{destination.description}</p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-apple-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      Best time: {destination.bestTime}
                    </div>
                    <div className="flex items-center text-sm text-apple-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
                    </div>
                  </div>

                  {/* Highlights List */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 3).map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 bg-thai-orange/10 text-thai-orange text-xs font-medium rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                      {destination.highlights.length > 3 && (
                        <span className="px-3 py-1 bg-apple-gray-100 text-apple-gray-600 text-xs font-medium rounded-full">
                          +{destination.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedDestination(destination);
                      setIsModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-3 liquid-button rounded-xl"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Destination Modal */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDestination(null);
        }}
      />
    </section>
  );
};

export default Destinations;
