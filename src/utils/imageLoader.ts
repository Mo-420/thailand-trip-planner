import { getImageUrl } from '../data/simpleImageMap';

interface ImageMetadata {
  items: Array<{
    name: string;
    slug: string;
    fileTitle?: string;
    local?: string;
    source?: string;
    author_html?: string;
    license?: string;
    credit_html?: string;
  }>;
  generated_at?: string;
}

let imageCache: ImageMetadata | null = null;

export async function loadImageMetadata(): Promise<ImageMetadata> {
  if (imageCache) {
    return imageCache;
  }

  try {
    const response = await fetch('/data/th_images.json');
    if (!response.ok) {
      throw new Error('Failed to load image metadata');
    }
    imageCache = await response.json();
    return imageCache;
  } catch (error) {
    console.warn('Could not load image metadata, using fallback images');
    return { items: [] };
  }
}

export function getImageForPlace(placeName: string): string {
  return getImageUrl(placeName);
}

export function getImageForActivity(activityName: string): string {
  return getImageUrl(activityName);
}

export function getImageAttribution(placeName: string) {
  if (!imageCache) return null;
  
  const item = imageCache.items.find(item => 
    item.name.toLowerCase() === placeName.toLowerCase()
  );
  
  if (!item) return null;
  
  return {
    author: item.author_html,
    license: item.license,
    source: item.source
  };
}
