import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, MapPin, Clock, Users, Lightbulb, Heart } from 'lucide-react';
import { yourThailandItinerary } from '../data/yourItinerary';

const YourTripPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'budget' | 'tips'>('overview');
  // const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;

  const getTotalSavings = () => {
    return yourThailandItinerary.costOptimizations.reduce((total, category) => total + category.savings, 0);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-thai font-bold text-apple-gray-900 mb-4">
            Your <span className="text-gradient-thai">Thailand Adventure</span>
          </h2>
          <p className="text-xl text-apple-gray-600 max-w-3xl mx-auto">
            A personalized 12-day journey through Bangkok, Chiang Mai, and Phuket
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { id: 'overview', label: 'Overview', icon: Users },
            { id: 'itinerary', label: 'Itinerary', icon: Calendar },
            { id: 'budget', label: 'Budget', icon: DollarSign },
            { id: 'tips', label: 'Tips', icon: Lightbulb }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'thai-gradient text-white shadow-apple-lg'
                  : 'glass-effect text-apple-gray-700 hover:bg-thai-orange/10'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="liquid-glass p-8"
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Trip Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-thai-orange/5 rounded-2xl">
                  <Calendar className="w-8 h-8 text-thai-orange mx-auto mb-3" />
                  <div className="text-2xl font-bold text-apple-gray-900">{yourThailandItinerary.tripOverview.duration} Days</div>
                  <div className="text-apple-gray-600">Duration</div>
                </div>
                <div className="text-center p-6 bg-thai-gold/5 rounded-2xl">
                  <Users className="w-8 h-8 text-thai-gold mx-auto mb-3" />
                  <div className="text-2xl font-bold text-apple-gray-900">{yourThailandItinerary.tripOverview.travelers} People</div>
                  <div className="text-apple-gray-600">Travelers</div>
                </div>
                <div className="text-center p-6 bg-thai-pink/5 rounded-2xl">
                  <DollarSign className="w-8 h-8 text-thai-pink mx-auto mb-3" />
                  <div className="text-2xl font-bold text-apple-gray-900">{formatCurrency(yourThailandItinerary.tripOverview.totalBudget)}</div>
                  <div className="text-apple-gray-600">Total Budget</div>
                </div>
              </div>

              {/* Destinations */}
              <div>
                <h3 className="text-2xl font-bold text-apple-gray-900 mb-6">Your Destinations</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {yourThailandItinerary.destinations.map((destination, index) => (
                    <motion.div
                      key={destination.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="liquid-glass glass-hover p-6 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <MapPin className="w-6 h-6 text-thai-orange" />
                        <div>
                          <h4 className="text-xl font-bold text-apple-gray-900">{destination.name}</h4>
                          <p className="text-apple-gray-600">{destination.duration}</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-thai-orange mb-2">
                        {formatCurrency(destination.budget.subtotal)}
                      </div>
                      <div className="text-sm text-apple-gray-600 mb-4">Total cost</div>
                      <div className="space-y-2">
                        {Object.entries(destination.budget).filter(([key]) => key !== 'subtotal').map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-apple-gray-600 capitalize">{key}:</span>
                            <span className="font-medium">{formatCurrency(value)}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-apple-gray-900 mb-6">Day-by-Day Itinerary</h3>
              <div className="space-y-4">
                {yourThailandItinerary.detailedItinerary.map((day, index) => (
                  <motion.div
                    key={day.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="liquid-glass glass-hover p-6 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 thai-gradient rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {day.day}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-apple-gray-900">{day.title}</h4>
                          <div className="flex items-center text-apple-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {day.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-thai-orange">{formatCurrency(day.budget)}</div>
                        <div className="text-sm text-apple-gray-600">Day budget</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {day.activities.map((activity) => (
                        <div key={activity.id} className="bg-white/50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-apple-gray-900">{activity.title}</h5>
                            <div className="text-sm text-thai-orange font-medium">{formatCurrency(activity.cost)}</div>
                          </div>
                          <div className="flex items-center text-sm text-apple-gray-600 mb-2">
                            <Clock className="w-4 h-4 mr-1" />
                            {activity.time} • {activity.duration}
                          </div>
                          <p className="text-sm text-apple-gray-600 mb-2">{activity.description}</p>
                          {activity.tips && (
                            <div className="text-xs text-thai-orange bg-thai-orange/10 rounded-lg p-2">
                              💡 {activity.tips}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {day.notes && (
                      <div className="mt-4 p-3 bg-thai-orange/5 rounded-xl border border-thai-orange/20">
                        <div className="flex items-start space-x-2">
                          <Heart className="w-5 h-5 text-thai-orange mt-0.5" />
                          <div>
                            <div className="font-medium text-apple-gray-900 mb-1">Important Note</div>
                            <p className="text-sm text-apple-gray-600">{day.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-apple-gray-900 mb-4">Budget Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-effect rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-apple-gray-900 mb-4">Total Trip Cost</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>International Flights:</span>
                        <span className="font-semibold">{formatCurrency(2200)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bangkok (3 nights):</span>
                        <span className="font-semibold">{formatCurrency(1320)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chiang Mai (4 nights):</span>
                        <span className="font-semibold">{formatCurrency(2060)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phuket (5 nights):</span>
                        <span className="font-semibold">{formatCurrency(2830)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-thai-orange">{formatCurrency(8410)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Emergency Fund:</span>
                        <span className="font-semibold">{formatCurrency(1250)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="font-bold text-lg">Grand Total:</span>
                        <span className="font-bold text-lg text-thai-orange">{formatCurrency(9660)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-apple-gray-900 mb-4">Potential Savings</h4>
                    <div className="space-y-3">
                      {yourThailandItinerary.costOptimizations.map((category, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{category.category}:</span>
                          <span className="font-semibold text-thai-green">-{formatCurrency(category.savings)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between border-t pt-3">
                        <span className="font-bold">Total Savings:</span>
                        <span className="font-bold text-thai-green">-{formatCurrency(getTotalSavings())}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Optimization Tips */}
              <div>
                <h4 className="text-xl font-bold text-apple-gray-900 mb-6">Money-Saving Tips</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {yourThailandItinerary.costOptimizations.map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="liquid-glass p-6"
                    >
                      <h5 className="text-lg font-semibold text-apple-gray-900 mb-3 flex items-center">
                        <DollarSign className="w-5 h-5 text-thai-orange mr-2" />
                        {category.category} (Save {formatCurrency(category.savings)})
                      </h5>
                      <ul className="space-y-2">
                        {category.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-apple-gray-600 flex items-start">
                            <span className="text-thai-orange mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-apple-gray-900 mb-6">Essential Travel Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-effect rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-apple-gray-900 mb-4 flex items-center">
                      <Lightbulb className="w-5 h-5 text-thai-orange mr-2" />
                      Practical Tips
                    </h4>
                    <ul className="space-y-2">
                      {yourThailandItinerary.practicalTips.slice(0, 5).map((tip, index) => (
                        <li key={index} className="text-sm text-apple-gray-600 flex items-start">
                          <span className="text-thai-orange mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-effect rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-apple-gray-900 mb-4 flex items-center">
                      <Heart className="w-5 h-5 text-thai-pink mr-2" />
                      Cultural Experiences
                    </h4>
                    <ul className="space-y-2">
                      {yourThailandItinerary.culturalExperiences.map((experience, index) => (
                        <li key={index} className="text-sm text-apple-gray-600 flex items-start">
                          <span className="text-thai-pink mr-2">•</span>
                          <div>
                            <div className="font-medium">{experience.name}</div>
                            <div className="text-xs text-apple-gray-500">{experience.description}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="liquid-glass p-6">
                <h4 className="text-lg font-semibold text-apple-gray-900 mb-4">Complete Practical Tips</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {yourThailandItinerary.practicalTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-thai-orange font-bold">{index + 1}.</span>
                      <span className="text-sm text-apple-gray-600">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default YourTripPlanner;
