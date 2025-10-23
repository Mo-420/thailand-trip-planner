interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  blur?: number;
}

export function optimizeImageUrl(
  src: string, 
  options: ImageOptimizationOptions = {}
): string {
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    blur
  } = options;

  // For Unsplash images, use their optimization API
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    const params = url.searchParams;
    
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    if (quality) params.set('q', quality.toString());
    if (blur) params.set('blur', blur.toString());
    
    // Add format optimization
    if (format === 'webp') {
      params.set('fm', 'webp');
    } else if (format === 'avif') {
      params.set('fm', 'avif');
    }
    
    return url.toString();
  }

  // For local images, we could implement a custom optimization service
  // For now, return the original src
  return src;
}

export function generateSrcSet(
  baseSrc: string,
  sizes: number[] = [320, 480, 640, 800, 1024, 1200, 1600],
  quality: number = 80
): string {
  return sizes
    .map(size => `${optimizeImageUrl(baseSrc, { width: size, quality })} ${size}w`)
    .join(', ');
}

export function getOptimalImageSize(
  containerWidth: number,
  devicePixelRatio: number = 1
): number {
  return Math.ceil(containerWidth * devicePixelRatio);
}

export function createImagePlaceholder(
  width: number,
  height: number,
  color: string = '#f3f4f6'
): string {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="system-ui">
        Loading...
      </text>
    </svg>
  `)}`;
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = src;
  });
}
