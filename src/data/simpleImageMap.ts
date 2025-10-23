// Simple, direct image mapping for Thailand Trip app
export const imageMap: { [key: string]: string } = {
  // Main Destinations
  'bangkok': '/images/bangkok.jpg',
  'chiang mai': '/images/chiang_mai.jpg',
  'phuket': '/images/phuket.jpg',
  'krabi': '/images/krabi.jpg',
  'ayutthaya': '/images/ayutthaya.jpg',
  'pai': '/images/pai.jpg',

  // Bangkok Attractions
  'grand palace': '/images/grand_palace.jpg',
  'wat pho': '/images/wat_pho.jpg',
  'chatuchak market': '/images/chatuchak_market.jpg',
  'chatuchak weekend market': '/images/chatuchak_weekend_market.jpg',

  // Chiang Mai Attractions
  'doi suthep': '/images/doi_suthep.jpg',
  'wat phra that doi suthep': '/images/wat_phra_that_doi_suthep.jpg',
  'chiang mai old city': '/images/chiang_mai_old_city.jpg',
  'old city chiang mai': '/images/chiang_mai_old_city.jpg',
  'chiang mai night bazaar': '/images/chiang_mai_night_bazaar.jpg',
  'night bazaar': '/images/night_bazaar.jpg',

  // Phuket Attractions
  'patong beach': '/images/patong_beach.jpg',
  'phi phi islands': '/images/phi_phi_islands.jpg',
  'big buddha': '/images/big_buddha.jpg',
  'big buddha (phuket)': '/images/big_buddha.jpg',

  // Cultural Activities
  'songkran festival': '/images/songkran_festival.jpg',
  'songkran (thai new year)': '/images/songkran_festival.jpg',
  'thai massage & wellness': '/images/thai_massage.jpg',
  'thai massage': '/images/thai_massage.jpg',
  'floating markets': '/images/floating_markets.jpg',
  'muay thai': '/images/muay_thai.jpg',
  'thai cuisine': '/images/thai_cuisine.jpg',
  'thai food': '/images/thai_cuisine.jpg',
  'buddhist temples': '/images/buddhist_temples.jpg',

  // Additional Attractions
  'railay beach': '/images/railay_beach.jpg',
  'pai canyon': '/images/pai_canyon.jpg',
  'hot springs': '/images/hot_springs.jpg',
  'tiger cave temple': '/images/tiger_cave_temple.jpg',
  'walking street': '/images/walking_street.jpg',
  'wat chaiwatthanaram': '/images/wat_chaiwatthanaram.jpg',
  'wat mahathat': '/images/wat_mahathat.jpg',
  'hong islands': '/images/hong_islands.jpg',

  // Default fallback
  'default': '/images/bangkok.jpg'
};

export function getImageUrl(name: string): string {
  const key = name.toLowerCase();
  return imageMap[key] || imageMap['default'];
}
