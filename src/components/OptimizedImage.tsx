import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { optimizeImageUrl, generateSrcSet, createImagePlaceholder } from '../utils/imageOptimizer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  lazyLoad?: boolean;
  responsive?: boolean;
  placeholder?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  lazyLoad = true,
  responsive = true,
  placeholder,
  priority = false,
  quality = 80,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw)',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazyLoad || priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazyLoad || priority) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazyLoad, priority]);

  // Generate optimized srcSet
  const optimizedSrcSet = responsive ? generateSrcSet(src, undefined, quality) : undefined;
  const optimizedSrc = optimizeImageUrl(src, { quality, format: 'webp' });

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const srcSet = generateSrcSet(src);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder/Loading State */}
      {!isLoaded && !hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-apple-gray-100 to-apple-gray-200 flex items-center justify-center"
        >
          {placeholder ? (
            <img 
              src={placeholder} 
              alt="" 
              className="w-full h-full object-cover blur-sm"
            />
          ) : (
            <img
              src={createImagePlaceholder(width || 400, height || 300)}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      )}

      {/* Error State */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-apple-gray-100 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">📷</div>
            <span className="text-sm text-apple-gray-500">Image unavailable</span>
          </div>
        </motion.div>
      )}

      {/* Main Image */}
      {isInView && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          srcSet={optimizedSrcSet}
          sizes={sizes}
          loading={lazyLoad && !priority ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          onError={handleError}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            filter: isLoaded ? 'none' : 'blur(5px)'
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
