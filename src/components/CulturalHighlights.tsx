import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, MapPin, Users, Star } from 'lucide-react';
import { CulturalHighlight } from '../types';
import { loadImageMetadata, getImageForActivity } from '../utils/imageLoader';
// Removed import - using new imageLoader system
import ImageCarousel from './ImageCarousel';
import SimpleImageCarousel from './SimpleImageCarousel';

const CulturalHighlights: React.FC = () => {
  const [selectedHighlight, setSelectedHighlight] = useState<CulturalHighlight | null>(null);
  const [imageMetadata] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // useEffect(() => {
  //   loadImageMetadata().then(setImageMetadata);
  // }, []);

  const culturalHighlights: CulturalHighlight[] = [
    {
      id: '1',
      title: 'Songkran Festival',
      description: 'Thailand\'s most famous water festival marking the Thai New Year',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'festival',
      significance: 'A time for family reunions, temple visits, and water fights symbolizing cleansing and renewal',
      whenToExperience: 'April 13-15'
    },
    {
      id: '2',
      title: 'Thai Massage & Wellness',
      description: 'Ancient healing art combining acupressure, yoga, and meditation',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'tradition',
      significance: 'Traditional healing practice passed down through generations, recognized by UNESCO',
      whenToExperience: 'Year-round'
    },
    {
      id: '3',
      title: 'Floating Markets',
      description: 'Traditional markets on water where vendors sell from boats',
      image: 'https://images.unsplash.com/photo-1598259502132-6fa75a2c5e51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'tradition',
      significance: 'Centuries-old trading tradition that continues to thrive in modern Thailand',
      whenToExperience: 'Early morning, year-round'
    },
    {
      id: '4',
      title: 'Muay Thai',
      description: 'Thailand\'s national sport and martial art known as "The Art of Eight Limbs"',
      image: 'https://images.unsplash.com/photo-1555597408-26bc8e548a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'art',
      significance: 'Ancient martial art that combines physical discipline with spiritual practice',
      whenToExperience: 'Evening matches, year-round'
    },
    {
      id: '5',
      title: 'Thai Cuisine',
      description: 'World-renowned cuisine balancing sweet, sour, salty, and spicy flavors',
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'food',
      significance: 'Culinary tradition that reflects Thailand\'s diverse geography and cultural influences',
      whenToExperience: 'Any time - street food available 24/7'
    },
    {
      id: '6',
      title: 'Buddhist Temples',
      description: 'Sacred spaces of worship and meditation throughout Thailand',
      image: 'https://images.unsplash.com/photo-1563492065213-f635b98f6b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'religion',
      significance: 'Centers of spiritual life and community, showcasing exquisite Thai architecture',
      whenToExperience: 'Early morning or evening for meditation'
    }
  ];

  const filteredHighlights = selectedCategory === 'all' 
    ? culturalHighlights 
    : culturalHighlights.filter(highlight => highlight.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'festival': return Calendar;
      case 'tradition': return Heart;
      case 'food': return Star;
      case 'art': return Users;
      case 'religion': return MapPin;
      default: return Heart;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'festival': return 'thai-orange';
      case 'tradition': return 'thai-pink';
      case 'food': return 'thai-gold';
      case 'art': return 'thai-purple';
      case 'religion': return 'thai-blue';
      default: return 'thai-orange';
    }
  };

  return (
    <section id="culture" className="py-20 px-4 sm:px-6 lg:px-8 relative">
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
            Immerse in <span className="text-gradient-thai">Thai Culture</span>
          </h2>
          <p className="text-xl text-apple-gray-600 max-w-3xl mx-auto">
            Discover the rich traditions, festivals, and cultural experiences that make Thailand unique
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { id: 'all', name: 'All', color: 'thai-orange' },
            { id: 'festival', name: 'Festivals', color: 'thai-blue' },
            { id: 'tradition', name: 'Traditions', color: 'thai-teal' },
            { id: 'art', name: 'Arts', color: 'thai-purple' },
            { id: 'food', name: 'Food', color: 'thai-green' },
            { id: 'religion', name: 'Religion', color: 'thai-gold' }
          ].map((category) => (
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

        {/* Cultural Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHighlights.map((highlight, index) => {
            const IconComponent = getCategoryIcon(highlight.category);
            const categoryColor = getCategoryColor(highlight.category);
            
            return (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedHighlight(highlight)}
                className="group cursor-pointer"
              >
                <div className="liquid-glass glass-hover overflow-hidden transition-all duration-300">
                  {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <SimpleImageCarousel
                        images={[getImageForActivity(highlight.title)]}
                        alt={`${highlight.title} - ${highlight.description}`}
                        className="w-full h-full"
                        autoPlay={true}
                        autoPlayInterval={5000}
                      />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory(highlight.category);
                        }}
                        className={`bg-${categoryColor} text-white rounded-full px-3 py-1 text-sm font-medium flex items-center space-x-1 hover:shadow-lg transition-all duration-200`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="capitalize">{highlight.category}</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-apple-gray-900 mb-3">{highlight.title}</h3>
                    <p className="text-apple-gray-600 mb-4 line-clamp-2">{highlight.description}</p>
                    
                    <div className="flex items-center text-sm text-apple-gray-500 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {highlight.whenToExperience}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedHighlight(highlight)}
                      className="w-full py-3 liquid-button rounded-xl"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedHighlight && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedHighlight(null)}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="relative h-80 overflow-hidden">
                  <ImageCarousel
                    images={[getImageForActivity(selectedHighlight.title)]}
                    alt={`${selectedHighlight.title} - ${selectedHighlight.description}`}
                    className="w-full h-full"
                    showThumbnails={true}
                    autoPlay={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <button
                    onClick={() => setSelectedHighlight(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    {(() => {
                      const IconComponent = getCategoryIcon(selectedHighlight.category);
                      const categoryColor = getCategoryColor(selectedHighlight.category);
                      return (
                        <div className={`bg-${categoryColor} text-white rounded-full px-3 py-1 text-sm font-medium flex items-center space-x-1`}>
                          <IconComponent className="w-4 h-4" />
                          <span className="capitalize">{selectedHighlight.category}</span>
                        </div>
                      );
                    })()}
                  </div>
                  
                  <h3 className="text-3xl font-bold text-apple-gray-900 mb-4">{selectedHighlight.title}</h3>
                  <p className="text-lg text-apple-gray-600 mb-6">{selectedHighlight.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-apple-gray-900 mb-2">Cultural Significance</h4>
                      <p className="text-apple-gray-600">{selectedHighlight.significance}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-apple-gray-900 mb-2">When to Experience</h4>
                      <p className="text-apple-gray-600">{selectedHighlight.whenToExperience}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CulturalHighlights;
