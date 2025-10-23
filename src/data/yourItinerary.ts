// import { ItineraryDay, Destination, Activity } from '../types';

export const yourThailandItinerary = {
  tripOverview: {
    duration: 12,
    travelers: 4,
    totalBudget: 8750,
    emergencyFund: 1250,
    totalWithBuffer: 10000,
    currency: 'USD'
  },
  
  destinations: [
    {
      id: 'bangkok',
      name: 'Bangkok',
      duration: '3 nights',
      budget: {
        accommodation: 720,
        food: 300,
        transport: 100,
        activities: 200,
        subtotal: 1320
      },
      highlights: ['Grand Palace', 'Wat Pho', 'Chatuchak Market', 'Khao San Road', 'Chinatown', 'Jim Thompson House']
    },
    {
      id: 'chiangmai',
      name: 'Chiang Mai',
      duration: '4 nights',
      budget: {
        flight: 200,
        accommodation: 880,
        food: 400,
        transport: 80,
        activities: 500,
        subtotal: 2060
      },
      highlights: ['Doi Suthep', 'Old City Temples', 'Night Bazaar', 'Elephant Sanctuary', 'Cooking Class', 'Doi Inthanon']
    },
    {
      id: 'phuket',
      name: 'Phuket',
      duration: '5 nights',
      budget: {
        flight: 280,
        accommodation: 1400,
        food: 500,
        transport: 150,
        activities: 500,
        subtotal: 2830
      },
      highlights: ['Patong Beach', 'Phi Phi Islands', 'Big Buddha', 'Old Town', 'James Bond Island', 'Similan Islands']
    }
  ],

  detailedItinerary: [
    {
      id: 'day1',
      day: 1,
      title: 'Arrival in Bangkok',
      location: 'Bangkok',
      date: 'Day 1',
      activities: [
        {
          id: 'arrival',
          title: 'Arrive at Suvarnabhumi Airport',
          time: 'Morning',
          duration: '2 hours',
          cost: 0,
          description: 'Welcome to Thailand! Transfer to your hotel in Bangkok. Get settled and freshen up.',
          tips: 'Use Airport Rail Link (45 THB) or Grab taxi (300-400 THB) to city center'
        },
        {
          id: 'grand-palace',
          title: 'Grand Palace & Wat Pho',
          time: 'Afternoon',
          duration: '4 hours',
          cost: 40,
          description: 'Visit Thailand\'s most sacred temple complex and the famous reclining Buddha',
          tips: 'Dress modestly - shoulders and knees covered. Arrive early to avoid crowds.',
          culturalSignificance: 'The Grand Palace has been the official residence of Thai kings since 1782'
        },
        {
          id: 'khao-san',
          title: 'Khao San Road & Street Food',
          time: 'Evening',
          duration: '3 hours',
          cost: 30,
          description: 'Experience Bangkok\'s famous backpacker street and authentic street food',
          tips: 'Try pad thai, mango sticky rice, and fresh fruit smoothies'
        }
      ],
      accommodation: 'Hotel in Banglamphu area (near Khao San Road)',
      meals: 'Street food dinner at Khao San Road',
      budget: 70,
      notes: 'First day - take it easy and adjust to the time zone'
    },
    {
      id: 'day2',
      day: 2,
      title: 'Bangkok Cultural Immersion',
      location: 'Bangkok',
      date: 'Day 2',
      activities: [
        {
          id: 'chatuchak',
          title: 'Chatuchak Weekend Market',
          time: 'Morning',
          duration: '4 hours',
          cost: 50,
          description: 'Explore one of the world\'s largest weekend markets with 15,000+ stalls',
          tips: 'Go early (8-10 AM) to avoid crowds. Bring cash and comfortable shoes.',
          culturalSignificance: 'Over 70 years old, this market is a Bangkok institution'
        },
        {
          id: 'cooking-class',
          title: 'Thai Cooking Class',
          time: 'Afternoon',
          duration: '4 hours',
          cost: 60,
          description: 'Learn to cook authentic Thai dishes with local ingredients and techniques',
          tips: 'Book in advance. Most classes include market tour and recipe book',
          culturalSignificance: 'Thai cuisine is UNESCO Intangible Cultural Heritage'
        },
        {
          id: 'chinatown',
          title: 'Chinatown Night Market',
          time: 'Evening',
          duration: '3 hours',
          cost: 40,
          description: 'Experience Bangkok\'s vibrant Chinatown with street food and gold shops',
          tips: 'Try bird\'s nest soup and shark fin (if ethically sourced)'
        }
      ],
      accommodation: 'Same hotel',
      meals: 'Market food and cooking class lunch',
      budget: 150,
      notes: 'Wear comfortable walking shoes for market exploration'
    },
    {
      id: 'day3',
      day: 3,
      title: 'Bangkok Temples & Modern Bangkok',
      location: 'Bangkok',
      date: 'Day 3',
      activities: [
        {
          id: 'wat-arun',
          title: 'Wat Arun (Temple of Dawn)',
          time: 'Morning',
          duration: '2 hours',
          cost: 15,
          description: 'Climb the iconic temple with stunning views of the Chao Phraya River',
          tips: 'Best photos at sunrise. Take ferry from Tha Tien pier (4 THB)',
          culturalSignificance: 'Built in the 17th century, symbol of Bangkok'
        },
        {
          id: 'jim-thompson',
          title: 'Jim Thompson House',
          time: 'Late Morning',
          duration: '2 hours',
          cost: 20,
          description: 'Tour the beautiful traditional Thai house of the American silk entrepreneur',
          tips: 'Guided tours available. Great for learning about Thai architecture'
        },
        {
          id: 'mbk-siam',
          title: 'MBK & Siam Paragon Shopping',
          time: 'Afternoon',
          duration: '3 hours',
          cost: 30,
          description: 'Modern shopping experience in Bangkok\'s premier malls',
          tips: 'MBK for electronics and souvenirs, Siam Paragon for luxury brands'
        },
        {
          id: 'rooftop-bar',
          title: 'Rooftop Bar Experience',
          time: 'Evening',
          duration: '2 hours',
          cost: 40,
          description: 'Enjoy cocktails with panoramic views of Bangkok skyline',
          tips: 'Try Sky Bar at Lebua or Vertigo at Banyan Tree. Dress code applies'
        }
      ],
      accommodation: 'Same hotel',
      meals: 'Local restaurants and mall food courts',
      budget: 105,
      notes: 'Mix of traditional and modern Bangkok experiences'
    },
    {
      id: 'day4',
      day: 4,
      title: 'Travel to Chiang Mai',
      location: 'Chiang Mai',
      date: 'Day 4',
      activities: [
        {
          id: 'flight-cm',
          title: 'Flight to Chiang Mai',
          time: 'Morning',
          duration: '1.5 hours',
          cost: 200,
          description: 'Domestic flight to Northern Thailand\'s cultural capital',
          tips: 'Book morning flight to maximize time. Consider Nok Air or Thai Lion Air for budget options'
        },
        {
          id: 'old-city',
          title: 'Chiang Mai Old City Exploration',
          time: 'Afternoon',
          duration: '4 hours',
          cost: 20,
          description: 'Walk through the ancient walled city and visit historic temples',
          tips: 'Rent bicycles (50 THB/day) to explore efficiently',
          culturalSignificance: 'Founded in 1296, center of Lanna Kingdom'
        },
        {
          id: 'night-bazaar',
          title: 'Night Bazaar',
          time: 'Evening',
          duration: '3 hours',
          cost: 30,
          description: 'Famous night market with handicrafts, textiles, and street food',
          tips: 'Bargain hard - start at 50% of asking price. Try khao soi (northern curry)'
        }
      ],
      accommodation: 'Hotel in Old City area',
      meals: 'Night bazaar street food',
      budget: 250,
      notes: 'Transition day - focus on getting oriented in Chiang Mai'
    },
    {
      id: 'day5',
      day: 5,
      title: 'Chiang Mai Temples & Culture',
      location: 'Chiang Mai',
      date: 'Day 5',
      activities: [
        {
          id: 'doi-suthep',
          title: 'Doi Suthep Temple',
          time: 'Morning',
          duration: '3 hours',
          cost: 25,
          description: 'Sacred temple on mountain with panoramic views of Chiang Mai',
          tips: 'Take songthaew (red truck) for 50 THB per person. Climb 306 steps or take cable car',
          culturalSignificance: 'Most sacred temple in Northern Thailand, built in 1383'
        },
        {
          id: 'elephant-sanctuary',
          title: 'Ethical Elephant Sanctuary',
          time: 'Afternoon',
          duration: '4 hours',
          cost: 80,
          description: 'Spend time with rescued elephants in their natural habitat',
          tips: 'Choose ethical sanctuary - no riding, no chains. Bring change of clothes',
          culturalSignificance: 'Elephants are sacred in Thai culture and Buddhism'
        },
        {
          id: 'cooking-class-cm',
          title: 'Northern Thai Cooking Class',
          time: 'Evening',
          duration: '3 hours',
          cost: 35,
          description: 'Learn authentic northern Thai cuisine and Lanna cooking techniques',
          tips: 'Different from Bangkok - more herbs, less coconut milk'
        }
      ],
      accommodation: 'Same hotel',
      meals: 'Cooking class dinner',
      budget: 140,
      notes: 'Cultural immersion day with temples and elephants'
    },
    {
      id: 'day6',
      day: 6,
      title: 'Chiang Mai Nature & Adventure',
      location: 'Chiang Mai',
      date: 'Day 6',
      activities: [
        {
          id: 'doi-inthanon',
          title: 'Doi Inthanon National Park',
          time: 'Full Day',
          duration: '8 hours',
          cost: 60,
          description: 'Thailand\'s highest peak with waterfalls, hill tribes, and cool climate',
          tips: 'Book tour with guide. Bring warm clothes - it gets cold at 2,565m',
          culturalSignificance: 'Sacred mountain, "Roof of Thailand"'
        },
        {
          id: 'hill-tribes',
          title: 'Hill Tribe Village Visit',
          time: 'Afternoon',
          duration: '3 hours',
          cost: 40,
          description: 'Learn about traditional hill tribe cultures and handicrafts',
          tips: 'Respectful visit - buy handicrafts to support communities',
          culturalSignificance: 'Home to Karen, Hmong, and other ethnic groups'
        }
      ],
      accommodation: 'Same hotel',
      meals: 'Local restaurants and tour meals',
      budget: 100,
      notes: 'Nature and cultural exchange day'
    },
    {
      id: 'day7',
      day: 7,
      title: 'Chiang Mai Free Day & Travel Prep',
      location: 'Chiang Mai',
      date: 'Day 7',
      activities: [
        {
          id: 'free-exploration',
          title: 'Free Time & Shopping',
          time: 'Morning',
          duration: '4 hours',
          cost: 30,
          description: 'Explore at your own pace - more temples, cafes, or shopping',
          tips: 'Visit Warorot Market for local goods, or relax at Nimmanhaemin Road cafes'
        },
        {
          id: 'massage',
          title: 'Traditional Thai Massage',
          time: 'Afternoon',
          duration: '2 hours',
          cost: 25,
          description: 'Authentic Thai massage at traditional school or spa',
          tips: 'Wat Pho Thai Massage School in Bangkok is famous, but Chiang Mai has great options too'
        },
        {
          id: 'flight-prep',
          title: 'Prepare for Phuket',
          time: 'Evening',
          duration: '1 hour',
          cost: 0,
          description: 'Pack and prepare for flight to Phuket tomorrow',
          tips: 'Check flight times and hotel confirmation'
        }
      ],
      accommodation: 'Same hotel',
      meals: 'Local restaurants',
      budget: 55,
      notes: 'Relaxation and preparation day'
    },
    {
      id: 'day8',
      day: 8,
      title: 'Travel to Phuket',
      location: 'Phuket',
      date: 'Day 8',
      activities: [
        {
          id: 'flight-phuket',
          title: 'Flight to Phuket',
          time: 'Morning',
          duration: '2 hours',
          cost: 280,
          description: 'Fly to Thailand\'s largest island and beach paradise',
          tips: 'Book morning flight. Consider direct flight or via Bangkok'
        },
        {
          id: 'phuket-orientation',
          title: 'Phuket Orientation & Beach Time',
          time: 'Afternoon',
          duration: '4 hours',
          cost: 20,
          description: 'Get oriented and enjoy your first beach experience',
          tips: 'Patong Beach is busy but convenient. Consider Kata or Karon for quieter beaches'
        },
        {
          id: 'phuket-town',
          title: 'Phuket Old Town',
          time: 'Evening',
          duration: '3 hours',
          cost: 30,
          description: 'Explore historic Sino-Portuguese architecture and local culture',
          tips: 'Great for photos and local restaurants. Less touristy than beach areas'
        }
      ],
      accommodation: 'Beach resort or hotel in Patong',
      meals: 'Local restaurants',
      budget: 330,
      notes: 'Transition to beach relaxation mode'
    },
    {
      id: 'day9',
      day: 9,
      title: 'Phi Phi Islands Day Trip',
      location: 'Phuket',
      date: 'Day 9',
      activities: [
        {
          id: 'phi-phi-tour',
          title: 'Phi Phi Islands Tour',
          time: 'Full Day',
          duration: '8 hours',
          cost: 80,
          description: 'Boat tour to stunning Phi Phi Islands with Maya Bay, snorkeling, and lunch',
          tips: 'Book speedboat tour for more time. Bring sunscreen, hat, and waterproof bag',
          culturalSignificance: 'Made famous by "The Beach" movie, now protected marine park'
        },
        {
          id: 'evening-relax',
          title: 'Beach Relaxation',
          time: 'Evening',
          duration: '2 hours',
          cost: 20,
          description: 'Relax on your hotel beach or explore nearby beaches',
          tips: 'Try beach massage or enjoy sunset cocktails'
        }
      ],
      accommodation: 'Same hotel',
      meals: 'Tour lunch and local dinner',
      budget: 100,
      notes: 'Island hopping and beach paradise day'
    },
    {
      id: 'day10',
      day: 10,
      title: 'Phuket Adventure & Culture',
      location: 'Phuket',
      date: 'Day 10',
      activities: [
        {
          id: 'big-buddha',
          title: 'Big Buddha Phuket',
          time: 'Morning',
          duration: '2 hours',
          cost: 15,
          description: 'Visit the iconic 45-meter white marble Buddha with panoramic views',
          tips: 'Dress modestly. Great views of Chalong Bay. Free but donations welcome',
          culturalSignificance: 'Symbol of peace and unity, built with donations from worldwide'
        },
        {
          id: 'james-bond-island',
          title: 'James Bond Island Tour',
          time: 'Afternoon',
          duration: '6 hours',
          cost: 60,
          description: 'Visit the famous limestone karst featured in "The Man with the Golden Gun"',
          tips: 'Book tour from Phuket. Includes canoeing in sea caves and lunch',
          culturalSignificance: 'Part of Phang Nga Bay UNESCO World Heritage site'
        },
        {
          id: 'nightlife',
          title: 'Patong Nightlife',
          time: 'Evening',
          duration: '3 hours',
          cost: 40,
          description: 'Experience Phuket\'s famous nightlife on Bangla Road',
          tips: 'Lively but touristy. Try local bars and restaurants for authentic experience'
        }
      ],
      accommodation: 'Same hotel',
      meals: 'Tour lunch and local dinner',
      budget: 115,
      notes: 'Mix of culture, nature, and nightlife'
    },
    {
      id: 'day11',
      day: 11,
      title: 'Phuket Beach Day & Relaxation',
      location: 'Phuket',
      date: 'Day 11',
      activities: [
        {
          id: 'beach-hopping',
          title: 'Beach Hopping Tour',
          time: 'Morning',
          duration: '4 hours',
          cost: 30,
          description: 'Visit multiple beaches - Kata, Karon, Nai Harn, and Freedom Beach',
          tips: 'Rent motorbike or hire driver. Each beach has different character',
          culturalSignificance: 'Phuket\'s beaches are world-renowned for beauty and variety'
        },
        {
          id: 'spa-treatment',
          title: 'Thai Spa Treatment',
          time: 'Afternoon',
          duration: '2 hours',
          cost: 50,
          description: 'Relaxing spa treatment with traditional Thai techniques',
          tips: 'Book at reputable spa. Try traditional Thai massage or aromatherapy'
        },
        {
          id: 'sunset-dinner',
          title: 'Sunset Dinner',
          time: 'Evening',
          duration: '2 hours',
          cost: 40,
          description: 'Romantic dinner with ocean views and fresh seafood',
          tips: 'Book beachfront restaurant. Try local seafood specialties'
        }
      ],
      accommodation: 'Same hotel',
      meals: 'Beach restaurants and sunset dinner',
      budget: 120,
      notes: 'Relaxation and beach paradise day'
    },
    {
      id: 'day12',
      day: 12,
      title: 'Departure Day',
      location: 'Phuket to Home',
      date: 'Day 12',
      activities: [
        {
          id: 'last-morning',
          title: 'Final Beach Time',
          time: 'Morning',
          duration: '2 hours',
          cost: 10,
          description: 'Last chance to enjoy the beach and Thai hospitality',
          tips: 'Pack swimwear in carry-on for last-minute beach time'
        },
        {
          id: 'departure',
          title: 'Flight Home',
          time: 'Afternoon',
          duration: 'Travel',
          cost: 0,
          description: 'Transfer to airport and begin journey home with amazing memories',
          tips: 'Allow 2 hours for international departure. Buy last-minute souvenirs at airport'
        }
      ],
      accommodation: 'Flight',
      meals: 'Airport meals',
      budget: 10,
      notes: 'Departure day - cherish the memories!'
    }
  ],

  costOptimizations: [
    {
      category: 'Accommodation',
      savings: 200,
      tips: [
        'Book 3-star hotels instead of 4-star (save $50/night)',
        'Use Agoda or Booking.com for discounts',
        'Consider guesthouses in Chiang Mai (save $30/night)',
        'Book early for better rates'
      ]
    },
    {
      category: 'Food',
      savings: 150,
      tips: [
        'Eat street food for lunch (save $10/meal)',
        'Avoid tourist restaurants near attractions',
        'Try local markets for authentic, cheap meals',
        'Share dishes to try more variety'
      ]
    },
    {
      category: 'Transport',
      savings: 100,
      tips: [
        'Use Grab app instead of taxis',
        'Take public transport when possible',
        'Book domestic flights in advance',
        'Consider overnight buses for long distances'
      ]
    },
    {
      category: 'Activities',
      savings: 200,
      tips: [
        'Book tours in advance for discounts',
        'Look for combo deals (temple + cooking class)',
        'Some temples are free (donations only)',
        'Group activities to share costs'
      ]
    }
  ],

  culturalExperiences: [
    {
      name: 'Songkran Festival (if April)',
      description: 'Thai New Year water festival',
      cost: 0,
      significance: 'Most important Thai holiday'
    },
    {
      name: 'Loy Krathong (if November)',
      description: 'Festival of lights on water',
      cost: 10,
      significance: 'Beautiful floating lantern ceremony'
    },
    {
      name: 'Monk Chat',
      description: 'Learn about Buddhism from monks',
      cost: 0,
      significance: 'Unique cultural exchange opportunity'
    },
    {
      name: 'Traditional Dance Show',
      description: 'Classical Thai dance performance',
      cost: 25,
      significance: 'Ancient art form preserved for centuries'
    }
  ],

  practicalTips: [
    'Download Grab app for transport',
    'Carry cash - many places don\'t accept cards',
    'Dress modestly for temples',
    'Remove shoes before entering temples',
    'Don\'t point feet at people or Buddha images',
    'Learn basic Thai phrases',
    'Carry photocopies of passport',
    'Get travel insurance',
    'Check visa requirements',
    'Download offline maps'
  ]
};

export default yourThailandItinerary;
