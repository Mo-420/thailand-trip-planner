import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Heart, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    destinations: [
      'Bangkok', 'Chiang Mai', 'Phuket', 'Krabi', 'Ayutthaya', 'Pai'
    ],
    experiences: [
      'Cultural Tours', 'Beach Activities', 'Temple Visits', 'Food Tours', 'Adventure Sports', 'Wellness Retreats'
    ],
    support: [
      'Help Center', 'Travel Tips', 'Safety Guide', 'Visa Information', 'Emergency Contacts', 'FAQ'
    ]
  };

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' }
  ];

  return (
    <footer className="relative text-white min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=90')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10" />
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 thai-gradient rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">TH</span>
              </div>
              <span className="text-2xl font-bold text-gradient-hero">
                Thailand Trip
              </span>
            </div>
            <p className="text-apple-gray-300 mb-6 leading-relaxed">
              Discover the beauty of Thailand with our comprehensive travel planning platform. 
              Experience authentic culture, stunning landscapes, and unforgettable adventures.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-apple-gray-300">
                <MapPin className="w-4 h-4 text-thai-orange" />
                <span className="text-sm">Bangkok, Thailand</span>
              </div>
              <div className="flex items-center space-x-3 text-apple-gray-300">
                <Phone className="w-4 h-4 text-thai-orange" />
                <span className="text-sm">+66 2 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 text-apple-gray-300">
                <Mail className="w-4 h-4 text-thai-orange" />
                <span className="text-sm">hello@thailandtrip.com</span>
              </div>
            </div>
          </motion.div>

          {/* Destinations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Destinations</h3>
            <ul className="space-y-2">
              {footerLinks.destinations.map((destination) => (
                <li key={destination}>
                  <a
                    href="#"
                    className="text-apple-gray-300 hover:text-thai-orange transition-colors duration-200 text-sm"
                  >
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Experiences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Experiences</h3>
            <ul className="space-y-2">
              {footerLinks.experiences.map((experience) => (
                <li key={experience}>
                  <a
                    href="#"
                    className="text-apple-gray-300 hover:text-thai-orange transition-colors duration-200 text-sm"
                  >
                    {experience}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((support) => (
                <li key={support}>
                  <a
                    href="#"
                    className="text-apple-gray-300 hover:text-thai-orange transition-colors duration-200 text-sm"
                  >
                    {support}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Fun Facts About Thailand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 mb-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gradient-hero mb-2">Did You Know? 🇹🇭</h3>
            <p className="text-white">
              Discover amazing facts about the Land of Smiles that will surprise you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fun Fact 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center p-6 rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 shadow-lg"
            >
              <div className="w-16 h-16 thai-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐘</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Elephant Capital</h4>
              <p className="text-white/90 text-sm">Thailand has more elephants than any other country in Southeast Asia</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center p-6 rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 shadow-lg"
            >
              <div className="w-16 h-16 thai-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏰</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">40,000+ Temples</h4>
              <p className="text-white/90 text-sm">Thailand has more Buddhist temples than any other country in the world</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center p-6 rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 shadow-lg"
            >
              <div className="w-16 h-16 thai-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌶️</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Spicy Paradise</h4>
              <p className="text-white/90 text-sm">Thai cuisine uses over 200 different types of chili peppers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center p-6 rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 shadow-lg"
            >
              <div className="w-16 h-16 thai-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏝️</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">1,430 Islands</h4>
              <p className="text-white/90 text-sm">Thailand has over 1,400 islands, many still undiscovered</p>
            </motion.div>
          </div>

          {/* Additional Fun Facts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="p-6 rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 thai-gradient rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">👑</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Longest Reign</h4>
                  <p className="text-white/90 text-sm">King Bhumibol Adulyadej ruled for 70 years, making him the world's longest-reigning monarch</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="p-6 rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 thai-gradient rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🌺</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Land of Smiles</h4>
                  <p className="text-white/90 text-sm">Thailand is called "Land of Smiles" because smiling is deeply embedded in Thai culture and language</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-apple-gray-700 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-white">
              <span>© {currentYear} Thailand Trip Planner</span>
              <span>•</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-thai-orange" />
              <span>for travelers</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors duration-200 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-white hover:text-thai-orange transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:text-thai-orange transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white hover:text-thai-orange transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
