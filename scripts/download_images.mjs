// Download Wikipedia images locally to avoid CORS issues
import fs from 'node:fs/promises';
import path from 'node:path';

const imageMap = {
  // Major Destinations
  'bangkok': 'https://upload.wikimedia.org/wikipedia/commons/d/df/Bangkok_Night_Wikimedia_Commons.jpg',
  'chiang mai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Panoramic_view_of_Chiang_Mai_City.jpg/2560px-Panoramic_view_of_Chiang_Mai_City.jpg',
  'phuket': 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Phuket_Island_-_panoramio.jpg',
  'krabi': 'https://upload.wikimedia.org/wikipedia/commons/3/39/Postcard_image_of_blue_water_Krabi_Railay_Beach_Thailand.jpg',
  'ayutthaya': 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Ayutthaya_historical_park.jpg',
  'pai': 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Pai_canyon.jpg',
  
  // Bangkok Attractions
  'grand palace': 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Grand_Palace_Bangkok.jpg',
  'wat pho': 'https://upload.wikimedia.org/wikipedia/commons/3/35/Wat_Pho_Bangkok_Thailand.jpg',
  'chatuchak market': 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Chatuchak_Weekend_Market.jpg',
  'chatuchak weekend market': 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Chatuchak_Weekend_Market.jpg',
  
  // Chiang Mai Attractions
  'wat phra that doi suthep': 'https://upload.wikimedia.org/wikipedia/commons/3/37/Thailand_Wat_Phra_That_Doi_Suthep_Temple_Golden_Mount_with_Buddha_Statues.JPG',
  'doi suthep': 'https://upload.wikimedia.org/wikipedia/commons/3/37/Thailand_Wat_Phra_That_Doi_Suthep_Temple_Golden_Mount_with_Buddha_Statues.JPG',
  'chiang mai old city': 'https://upload.wikimedia.org/wikipedia/commons/1/12/A_tree_reflected_on_canal.jpg',
  'chiang mai night bazaar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Chiang_Mai_Night_Bazaar_in_2018.jpg/2560px-Chiang_Mai_Night_Bazaar_in_2018.jpg',
  'night bazaar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Chiang_Mai_Night_Bazaar_in_2018.jpg/2560px-Chiang_Mai_Night_Bazaar_in_2018.jpg',
  
  // Phuket Attractions
  'patong beach': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Patong_Beach_on_Phuket.jpg',
  'phi phi islands': 'https://upload.wikimedia.org/wikipedia/commons/5/50/Phi_Phi_Islands_Bay.jpg',
  'big buddha (phuket)': 'https://upload.wikimedia.org/wikipedia/commons/d/db/Big_Buddha_Phuket,_Thailand.jpg',
  'big buddha': 'https://upload.wikimedia.org/wikipedia/commons/d/db/Big_Buddha_Phuket,_Thailand.jpg',
  
  // Krabi Attractions
  'railay beach': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Thailand_06_-_34_Railay_Beach_%28158631092%29.jpg',
  'railay beach (krabi)': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Thailand_06_-_34_Railay_Beach_%28158631092%29.jpg',
  
  // Pai Attractions
  'pai canyon': 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Pai_canyon.jpg',
  
  // Cultural Activities
  'songkran festival': 'https://upload.wikimedia.org/wikipedia/commons/2/29/Songkran_002aa.jpg',
  'songkran (thai new year)': 'https://upload.wikimedia.org/wikipedia/commons/2/29/Songkran_002aa.jpg',
  'thai massage & wellness': 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Traditional_Thai_Massage.jpg',
  'thai massage': 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Traditional_Thai_Massage.jpg',
  'floating markets': 'https://upload.wikimedia.org/wikipedia/commons/0/00/Damnoen_Saduak_Floating_Market.jpg',
  'muay thai': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Muay_Thai_Championship_Boxing_-_Anthony_Cordero.jpg',
  'thai cuisine': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Pad_Thai_kung_Chang_Khien_street_stall.jpg',
  'thai food': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Pad_Thai_kung_Chang_Khien_street_stall.jpg',
  'buddhist temples': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Buddhist_Temple_Thailand_%2829163462%29.jpg'
};

const OUT_DIR = 'public/images';
const META_PATH = 'src/data/localImages.json';

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function downloadImage(url, filename) {
  try {
    console.log(`Downloading: ${filename}`);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ThailandTripApp/1.0 (Educational Use)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const buffer = Buffer.from(await response.arrayBuffer());
    const filepath = path.join(OUT_DIR, filename);
    await fs.writeFile(filepath, buffer);
    
    console.log(`✓ Downloaded: ${filename}`);
    return { success: true, filename, url };
  } catch (error) {
    console.error(`✗ Failed to download ${filename}: ${error.message}`);
    return { success: false, filename, url, error: error.message };
  }
}

async function main() {
  console.log('🖼️  Downloading Wikipedia images locally...\n');
  
  await ensureDir(OUT_DIR);
  
  const results = [];
  const localImageMap = {};
  
  for (const [key, url] of Object.entries(imageMap)) {
    // Create a safe filename
    const filename = `${key.replace(/[^a-z0-9]/gi, '_')}.jpg`;
    const result = await downloadImage(url, filename);
    
    results.push(result);
    
    if (result.success) {
      localImageMap[key] = `/images/${filename}`;
    } else {
      // Use fallback Unsplash images for failed downloads
      const fallbackImages = {
        'bangkok': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'chiang mai': 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'phuket': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'krabi': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'ayutthaya': 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'pai': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'songkran festival': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'thai massage & wellness': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'floating markets': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'muay thai': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'thai cuisine': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'buddhist temples': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      };
      localImageMap[key] = fallbackImages[key] || fallbackImages['bangkok'];
    }
    
    // Small delay to be respectful to servers
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Save the local image mapping
  await fs.writeFile(META_PATH, JSON.stringify(localImageMap, null, 2));
  
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  console.log(`\n📊 Results:`);
  console.log(`✓ Successfully downloaded: ${successCount}`);
  console.log(`✗ Failed downloads: ${failCount}`);
  console.log(`📁 Images saved to: ${OUT_DIR}`);
  console.log(`📄 Local mapping saved to: ${META_PATH}`);
  
  if (failCount > 0) {
    console.log(`\n⚠️  Failed downloads will use fallback images`);
  }
}

main().catch(console.error);
