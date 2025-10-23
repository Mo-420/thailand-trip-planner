import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Plus, Check, Star } from 'lucide-react';
import { ItineraryDay, Activity } from '../types';
import { getImageForPlace, getImageForActivity } from '../utils/imageLoader';
import ImageCarousel from './ImageCarousel';
import { useItinerary } from '../contexts/ItineraryContext';

const ItineraryPlanner: React.FC = () => {
  const { selectedDestinations, addDestination, removeDestination, isDestinationSelected, clearDestinations } = useItinerary();
  const [selectedDuration, setSelectedDuration] = useState<number>(7);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<ItineraryDay[] | null>(null);

  const sampleItinerary: ItineraryDay[] = [
    {
      id: '1',
      day: 1,
      title: 'Arrival in Bangkok',
      location: 'Bangkok',
      activities: [
        {
          id: '1',
          title: 'Arrive at Suvarnabhumi Airport',
          description: 'Welcome to Thailand! Transfer to your hotel in Bangkok',
          duration: '2 hours',
          difficulty: 'easy',
          category: 'Transport',
          location: 'Bangkok',
          image: getImageForPlace('bangkok')
        },
        {
          id: '2',
          title: 'Explore Grand Palace & Wat Pho',
          description: 'Visit Thailand\'s most sacred temple and the famous reclining Buddha',
          duration: '3 hours',
          difficulty: 'easy',
          category: 'Culture',
          location: 'Bangkok',
          image: getImageForPlace('grand palace')
        }
      ],
      notes: 'Dress modestly for temple visits. Shoulders and knees must be covered.'
    },
    {
      id: '2',
      day: 2,
      title: 'Bangkok City Tour',
      location: 'Bangkok',
      activities: [
        {
          id: '3',
          title: 'Chatuchak Weekend Market',
          description: 'Explore one of the world\'s largest weekend markets',
          duration: '4 hours',
          difficulty: 'easy',
          category: 'Shopping',
          location: 'Bangkok',
          image: getImageForPlace('chatuchak market')
        },
        {
          id: '4',
          title: 'Thai Cooking Class',
          description: 'Learn to cook authentic Thai dishes with local ingredients',
          duration: '3 hours',
          difficulty: 'medium',
          category: 'Food',
          location: 'Bangkok',
          image: getImageForActivity('thai cuisine')
        }
      ]
    },
    {
      id: '3',
      day: 3,
      title: 'Travel to Chiang Mai',
      location: 'Chiang Mai',
      activities: [
        {
          id: '5',
          title: 'Flight to Chiang Mai',
          description: 'Domestic flight to Northern Thailand',
          duration: '1.5 hours',
          difficulty: 'easy',
          category: 'Transport',
          location: 'Chiang Mai',
          image: getImageForPlace('chiang mai')
        },
        {
          id: '6',
          title: 'Doi Suthep Temple',
          description: 'Visit the sacred temple overlooking Chiang Mai city',
          duration: '3 hours',
          difficulty: 'medium',
          category: 'Culture',
          location: 'Chiang Mai',
          image: getImageForPlace('doi suthep')
        }
      ]
    }
  ];

  const durations = [7, 10, 14, 21];
  const destinations = ['Bangkok', 'Chiang Mai', 'Phuket', 'Krabi', 'Ayutthaya', 'Pai'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'thai-green';
      case 'medium': return 'thai-orange';
      case 'hard': return 'thai-red';
      default: return 'thai-blue';
    }
  };

  const generateItinerary = async () => {
    if (selectedDestinations.length === 0) {
      alert('Please add at least one destination to your itinerary! You can do this by clicking "Add to Itinerary" on any destination card.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Create a dynamic itinerary based on selections
      const newItinerary = createDynamicItinerary(selectedDuration, selectedDestinations);
      setGeneratedItinerary(newItinerary);
      setIsGenerating(false);
    }, 2000);
  };

  const createDynamicItinerary = (duration: number, destinations: string[]): ItineraryDay[] => {
    const itinerary: ItineraryDay[] = [];
    const daysPerDestination = Math.ceil(duration / destinations.length);
    
    let currentDay = 1;
    
    destinations.forEach((destination, destIndex) => {
      const daysForThisDestination = destIndex === destinations.length - 1 
        ? duration - currentDay + 1 
        : Math.min(daysPerDestination, duration - currentDay + 1);
      
      for (let day = 1; day <= daysForThisDestination; day++) {
        const isFirstDay = day === 1;
        const isLastDay = day === daysForThisDestination;
        
        itinerary.push({
          id: currentDay.toString(),
          day: currentDay,
          title: isFirstDay ? `Arrival in ${destination}` : `${destination} Day ${day}`,
          location: destination,
          activities: getActivitiesForDestination(destination, isFirstDay, isLastDay),
          notes: isFirstDay ? `Welcome to ${destination}! Check into your accommodation and get oriented.` : undefined
        });
        
        currentDay++;
      }
    });
    
    return itinerary;
  };

  const getActivitiesForDestination = (destination: string, isFirstDay: boolean, isLastDay: boolean): Activity[] => {
    const activities: Activity[] = [];
    
    if (isFirstDay) {
      activities.push({
        id: `${destination}-arrival-${Date.now()}`,
        title: `Arrive in ${destination}`,
        description: `Welcome to ${destination}! Check into your accommodation and get oriented with the city.`,
        duration: '2 hours',
        difficulty: 'easy',
        category: 'Transport',
        location: destination,
        image: getImageForPlace('doi suthep')
      });
    }
    
    // Add destination-specific activities
    const destinationActivities = getDestinationActivities(destination);
    activities.push(...destinationActivities);
    
    if (isLastDay && destination !== selectedDestinations[selectedDestinations.length - 1]) {
      activities.push({
        id: `${destination}-departure-${Date.now()}`,
        title: `Travel to next destination`,
        description: `Prepare for your journey to the next destination on your itinerary.`,
        duration: '3 hours',
        difficulty: 'easy',
        category: 'Transport',
        location: destination,
        image: getImageForPlace('chiang mai')
      });
    }
    
    return activities;
  };

  const getDestinationActivities = (destination: string): Activity[] => {
    const activityMap: { [key: string]: Activity[] } = {
      'Bangkok': [
        {
          id: `bangkok-1-${Date.now()}`,
          title: 'Grand Palace & Wat Pho',
          description: 'Visit Thailand\'s most sacred temple and the famous reclining Buddha',
          duration: '3 hours',
          difficulty: 'easy',
          category: 'Culture',
          location: 'Bangkok',
          image: getImageForPlace('doi suthep')
        },
        {
          id: `bangkok-2-${Date.now()}`,
          title: 'Chatuchak Weekend Market',
          description: 'Explore one of the world\'s largest weekend markets',
          duration: '4 hours',
          difficulty: 'easy',
          category: 'Shopping',
          location: 'Bangkok',
          image: getImageForPlace('chatuchak market')
        }
      ],
      'Chiang Mai': [
        {
          id: `chiangmai-1-${Date.now()}`,
          title: 'Doi Suthep Temple',
          description: 'Visit the sacred temple overlooking Chiang Mai city',
          duration: '3 hours',
          difficulty: 'medium',
          category: 'Culture',
          location: 'Chiang Mai',
          image: getImageForPlace('doi suthep')
        },
        {
          id: `chiangmai-2-${Date.now()}`,
          title: 'Elephant Sanctuary Visit',
          description: 'Ethical elephant experience in a natural environment',
          duration: '4 hours',
          difficulty: 'easy',
          category: 'Nature',
          location: 'Chiang Mai',
          image: getImageForPlace('chiang mai')
        }
      ],
      'Phuket': [
        {
          id: `phuket-1-${Date.now()}`,
          title: 'Patong Beach',
          description: 'Relax on one of Thailand\'s most famous beaches',
          duration: '4 hours',
          difficulty: 'easy',
          category: 'Beach',
          location: 'Phuket',
          image: getImageForActivity('thai cuisine')
        },
        {
          id: `phuket-2-${Date.now()}`,
          title: 'Phi Phi Islands Day Trip',
          description: 'Boat trip to the stunning Phi Phi Islands',
          duration: '8 hours',
          difficulty: 'medium',
          category: 'Adventure',
          location: 'Phuket',
          image: getImageForPlace('chatuchak market')
        }
      ],
      'Krabi': [
        {
          id: `krabi-1-${Date.now()}`,
          title: 'Railay Beach',
          description: 'Accessible only by boat, this beach offers stunning limestone cliffs',
          duration: '6 hours',
          difficulty: 'medium',
          category: 'Beach',
          location: 'Krabi',
          image: getImageForPlace('chatuchak market')
        },
        {
          id: `krabi-2-${Date.now()}`,
          title: 'Tiger Cave Temple',
          description: 'Climb 1,237 steps to reach this temple with panoramic views',
          duration: '3 hours',
          difficulty: 'hard',
          category: 'Culture',
          location: 'Krabi',
          image: getImageForActivity('thai cuisine')
        }
      ],
      'Ayutthaya': [
        {
          id: `ayutthaya-1-${Date.now()}`,
          title: 'Ayutthaya Historical Park',
          description: 'Explore the ancient ruins of Thailand\'s former capital',
          duration: '4 hours',
          difficulty: 'easy',
          category: 'Culture',
          location: 'Ayutthaya',
          image: getImageForPlace('wat chaiwatthanaram')
        }
      ],
      'Pai': [
        {
          id: `pai-1-${Date.now()}`,
          title: 'Pai Canyon',
          description: 'Hike through the stunning canyon with panoramic mountain views',
          duration: '3 hours',
          difficulty: 'medium',
          category: 'Nature',
          location: 'Pai',
          image: getImageForPlace('chiang mai')
        },
        {
          id: `pai-2-${Date.now()}`,
          title: 'Hot Springs',
          description: 'Relax in natural hot springs surrounded by jungle',
          duration: '2 hours',
          difficulty: 'easy',
          category: 'Wellness',
          location: 'Pai',
          image: getImageForPlace('hot springs')
        }
      ]
    };
    
    return activityMap[destination] || [];
  };

  return (
    <section id="itinerary" className="py-20 px-4 sm:px-6 lg:px-8">
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
            Plan Your <span className="text-gradient-thai">Perfect Itinerary</span>
          </h2>
          <p className="text-xl text-apple-gray-600 max-w-3xl mx-auto">
            Create a personalized travel plan with our smart itinerary builder
          </p>
        </motion.div>

        {/* Trip Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-effect rounded-3xl p-8 mb-12 shadow-apple-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Duration Selection */}
            <div>
              <h3 className="text-xl font-semibold text-apple-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-thai-orange" />
                Trip Duration
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {durations.map((duration) => (
                  <motion.button
                    key={duration}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDuration(duration)}
                    className={`p-4 rounded-xl font-semibold transition-all duration-300 ${
                      selectedDuration === duration
                        ? 'thai-gradient text-white shadow-apple-lg'
                        : 'glass-effect text-apple-gray-700 hover:bg-thai-orange/10'
                    }`}
                  >
                    {duration} Days
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Destination Selection */}
            <div>
              <h3 className="text-xl font-semibold text-apple-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-thai-orange" />
                Destinations ({selectedDestinations.length} selected)
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {destinations.map((destination) => (
                  <motion.button
                    key={destination}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (isDestinationSelected(destination)) {
                        removeDestination(destination);
                      } else {
                        addDestination(destination);
                      }
                    }}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-between ${
                      isDestinationSelected(destination)
                        ? 'bg-thai-orange text-white'
                        : 'glass-effect text-apple-gray-700 hover:bg-thai-orange/10'
                    }`}
                  >
                    <span>{destination}</span>
                    {isDestinationSelected(destination) && (
                      <Check className="w-4 h-4" />
                    )}
                  </motion.button>
                ))}
              </div>
              
              {/* Selected Destinations Summary */}
              {selectedDestinations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-thai-orange/5 rounded-xl border border-thai-orange/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-thai-orange" />
                      <span className="font-medium text-apple-gray-900">Selected Destinations:</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearDestinations}
                      className="px-3 py-1 bg-red-500/10 text-red-600 text-sm font-medium rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      Clear All
                    </motion.button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedDestinations.map((destination) => (
                      <motion.span
                        key={destination}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1 bg-thai-orange text-white rounded-full text-sm font-medium"
                      >
                        {destination}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: (isGenerating || selectedDestinations.length === 0) ? 1 : 1.05 }}
            whileTap={{ scale: (isGenerating || selectedDestinations.length === 0) ? 1 : 0.95 }}
            onClick={generateItinerary}
            disabled={isGenerating || selectedDestinations.length === 0}
            className={`w-full mt-6 py-4 font-semibold rounded-xl shadow-apple-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
              (isGenerating || selectedDestinations.length === 0)
                ? 'bg-apple-gray-300 text-apple-gray-500 cursor-not-allowed' 
                : 'thai-gradient text-white hover:shadow-thai-glow'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-apple-gray-500 border-t-transparent rounded-full animate-spin" />
                <span>Generating Your Itinerary...</span>
              </>
            ) : selectedDestinations.length === 0 ? (
              <>
                <MapPin className="w-5 h-5" />
                <span>Add Destinations First</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>Generate My Itinerary</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Generated or Sample Itinerary */}
        {generatedItinerary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-apple-gray-900 mb-2">
              Your Custom {selectedDuration}-Day Itinerary
            </h3>
            <p className="text-apple-gray-600">
              Generated for: {selectedDestinations.join(', ')}
            </p>
          </motion.div>
        )}
        <div className="space-y-8">
          {(generatedItinerary || sampleItinerary).map((day, dayIndex) => (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
              className="glass-effect rounded-3xl p-8 shadow-apple-lg"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 thai-gradient rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {day.day}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-apple-gray-900">{day.title}</h3>
                    <div className="flex items-center text-apple-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {day.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-apple-gray-500">Day {day.day}</div>
                  <div className="text-lg font-semibold text-thai-orange">
                    {day.activities.length} Activities
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {day.activities.map((activity, activityIndex) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: activityIndex * 0.1 }}
                    className="glass-effect rounded-2xl p-6 hover:shadow-apple-lg transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <ImageCarousel
                          images={[activity.image]}
                          alt={activity.title}
                          className="w-full h-full"
                          showThumbnails={false}
                          autoPlay={false}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-apple-gray-900">{activity.title}</h4>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${getDifficultyColor(activity.difficulty)}/10 text-${getDifficultyColor(activity.difficulty)}`}>
                            {activity.difficulty}
                          </div>
                        </div>
                        <p className="text-sm text-apple-gray-600 mb-3 line-clamp-2">{activity.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-apple-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {activity.duration}
                          </div>
                          <div className="text-sm text-thai-orange font-medium">{activity.category}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Notes */}
              {day.notes && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mt-6 p-4 bg-thai-orange/5 rounded-xl border border-thai-orange/20"
                >
                  <div className="flex items-start space-x-2">
                    <Star className="w-5 h-5 text-thai-orange mt-0.5" />
                    <div>
                      <div className="font-medium text-apple-gray-900 mb-1">Important Note</div>
                      <p className="text-sm text-apple-gray-600">{day.notes}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItineraryPlanner;
