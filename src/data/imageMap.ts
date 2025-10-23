// Direct image mappings for all destinations and activities
// Using high-quality, relevant images from Unsplash

export const imageMap: { [key: string]: string } = {
  // Hero
  'hero': 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',

  // Major Destinations
  'bangkok': '/images/bangkok.jpg',
  'chiang mai': '/images/chiang_mai.jpg',
  'phuket': '/images/phuket.jpg',
  'krabi': 'https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'ayutthaya': 'https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'pai': 'https://images.unsplash.com/photo-1523694282046-36b9a1d7f1f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Bangkok Attractions
  'grand palace': '/images/grand_palace.jpg',
  'wat pho': '/images/wat_pho.jpg',
  'chatuchak market': '/images/chatuchak_market.jpg',
  'chatuchak weekend market': '/images/chatuchak_weekend_market.jpg',

  // Chiang Mai Attractions
  'wat phra that doi suthep': '/images/doi_suthep.jpg',
  'doi suthep': '/images/doi_suthep.jpg',
  'chiang mai old city': '/images/chiang_mai_old_city.jpg',
  'chiang mai night bazaar': '/images/chiang_mai_night_bazaar.jpg',
  'night bazaar': '/images/night_bazaar.jpg',

  // Phuket Attractions
  'patong beach': '/images/patong_beach.jpg',
  'phi phi islands': '/images/phi_phi_islands.jpg',
  'big buddha (phuket)': 'https://images.unsplash.com/photo-1505732710474-ff5e5d2761bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'big buddha': 'https://images.unsplash.com/photo-1505732710474-ff5e5d2761bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Krabi Attractions
  'railay beach': 'https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'railay beach (krabi)': 'https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Pai Attractions
  'pai canyon': 'https://images.unsplash.com/photo-1523694282046-36b9a1d7f1f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Cultural Activities
  'songkran festival': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'songkran (thai new year)': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'thai massage & wellness': 'https://images.unsplash.com/photo-1540556828687-17339df67dcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'thai massage': 'https://images.unsplash.com/photo-1540556828687-17339df67dcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'floating markets': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'muay thai': 'https://images.unsplash.com/photo-1585079374540-043c037f1ade?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'thai cuisine': 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'thai food': 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'buddhist temples': 'https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Default fallback
  'default': '/images/bangkok.jpg'
};

export function getImageUrl(name: string): string {
  const key = name.toLowerCase().trim();
  return imageMap[key] || imageMap['default'];
}

// Export specific collections for easy access
export const destinationImages = {
  bangkok: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Bangkok_Night_Wikimedia_Commons.jpg',
  'chiang mai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Panoramic_view_of_Chiang_Mai_City.jpg/2560px-Panoramic_view_of_Chiang_Mai_City.jpg',
  phuket: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Phuket_Island_-_panoramio.jpg',
  krabi: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Postcard_image_of_blue_water_Krabi_Railay_Beach_Thailand.jpg',
  ayutthaya: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Ayutthaya_historical_park.jpg',
  pai: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Pai_canyon.jpg'
};

export const activityImages = {
  'songkran festival': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'thai massage & wellness': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'floating markets': 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'muay thai': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'thai cuisine': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'buddhist temples': 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};
