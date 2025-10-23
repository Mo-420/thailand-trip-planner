import React, { useState, useEffect } from 'react';
import { getFallbackImage } from '../utils/imageProxy';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackType?: 'destination' | 'activity';
  fallbackActivity?: string; // Specific activity name for better fallbacks
  loading?: 'lazy' | 'eager';
  onError?: () => void;
  onLoad?: () => void;
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackType = 'destination',
  fallbackActivity,
  loading = 'lazy',
  onError,
  onLoad
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    console.error(`Failed to load image: ${imageSrc}`);
    if (!hasError) {
      setHasError(true);
      setImageSrc(getFallbackImage(fallbackType, fallbackActivity));
      onError?.();
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default SafeImage;
