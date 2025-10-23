/**
 * Some Wikipedia/Wikimedia images may have CORS issues or require specific headers.
 * This utility helps handle those cases.
 */

export function getProxiedImageUrl(url: string): string {
  // For Wikipedia/Wikimedia images, ensure we're using HTTPS and the correct format
  if (url.includes('wikipedia.org') || url.includes('wikimedia.org')) {
    // Ensure HTTPS
    url = url.replace('http://', 'https://');
    
    // Handle special characters in URLs
    // Wikipedia URLs sometimes have encoded characters that need proper handling
    try {
      // Decode and re-encode to ensure proper formatting
      const decodedUrl = decodeURIComponent(url);
      // Only re-encode if it was successfully decoded and contains special chars
      if (decodedUrl !== url) {
        url = encodeURI(decodedUrl);
      }
    } catch (e) {
      // If decoding fails, use the original URL
      console.warn('URL decode failed for:', url);
    }
  }
  
  return url;
}

/**
 * Check if an image URL is accessible
 */
export async function checkImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => {
      console.error('Failed to load image:', url);
      resolve(false);
    };
    // Set crossOrigin for Wikipedia images
    if (url.includes('wikipedia.org') || url.includes('wikimedia.org')) {
      img.crossOrigin = 'anonymous';
    }
    img.src = url;
  });
}

/**
 * Get a fallback image if the primary fails
 */
export function getFallbackImage(type: 'destination' | 'activity' = 'destination', specificActivity?: string): string {
  const fallbacks = {
    destination: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    activity: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };
  
  // Specific fallbacks for different activities
  if (type === 'activity' && specificActivity) {
    const activityFallbacks: { [key: string]: string } = {
      'songkran festival': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'thai massage & wellness': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'floating markets': 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'muay thai': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'thai cuisine': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'buddhist temples': 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };
    
    return activityFallbacks[specificActivity.toLowerCase()] || fallbacks.activity;
  }
  
  return fallbacks[type];
}
