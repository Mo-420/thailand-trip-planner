import { preloadImage } from './imageOptimizer';
import { imageMap } from '../data/imageMap';

interface PreloadOptions {
  priority?: boolean;
  timeout?: number;
}

class ImagePreloader {
  private cache = new Set<string>();
  private preloading = new Set<string>();

  async preloadImages(
    urls: string[], 
    options: PreloadOptions = {}
  ): Promise<void> {
    const { priority = false, timeout = 10000 } = options;
    
    const promises = urls.map(url => this.preloadSingleImage(url, timeout));
    
    if (priority) {
      // For priority images, wait for all to complete
      await Promise.allSettled(promises);
    } else {
      // For non-priority, don't block the main thread
      Promise.allSettled(promises);
    }
  }

  private async preloadSingleImage(url: string, timeout: number): Promise<void> {
    if (this.cache.has(url) || this.preloading.has(url)) {
      return;
    }

    this.preloading.add(url);

    try {
      await Promise.race([
        preloadImage(url),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), timeout)
        )
      ]);
      this.cache.add(url);
    } catch (error) {
      console.warn(`Failed to preload image: ${url}`, error);
    } finally {
      this.preloading.delete(url);
    }
  }

  isPreloaded(url: string): boolean {
    return this.cache.has(url);
  }

  clearCache(): void {
    this.cache.clear();
    this.preloading.clear();
  }
}

export const imagePreloader = new ImagePreloader();

// Critical images that should be preloaded immediately
export const criticalImages = [
  imageMap['hero'], // Hero
  imageMap['bangkok'], // Bangkok
];

// Hero section images (highest priority)
export const heroImages = [
  imageMap['hero'],
];

// Above-the-fold images
export const aboveTheFoldImages = [
  imageMap['hero'],
  'https://upload.wikimedia.org/wikipedia/commons/d/df/Bangkok_Night_Wikimedia_Commons.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Panoramic_view_of_Chiang_Mai_City.jpg/2560px-Panoramic_view_of_Chiang_Mai_City.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/e/e1/Phuket_Island_-_panoramio.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/2/29/Songkran_002aa.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2c/Traditional_Thai_Massage.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/0/00/Damnoen_Saduak_Floating_Market.jpg',
];

// Below-the-fold images (lower priority)
export const belowTheFoldImages = [
  'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
];

export async function preloadCriticalImages(): Promise<void> {
  await imagePreloader.preloadImages(criticalImages, { priority: true });
}

export async function preloadHeroImages(): Promise<void> {
  await imagePreloader.preloadImages(heroImages, { priority: true });
}

export async function preloadAboveTheFoldImages(): Promise<void> {
  await imagePreloader.preloadImages(aboveTheFoldImages, { priority: true });
}

export async function preloadBelowTheFoldImages(): Promise<void> {
  await imagePreloader.preloadImages(belowTheFoldImages, { priority: false });
}
