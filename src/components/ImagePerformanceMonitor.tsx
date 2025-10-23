import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  totalImages: number;
  loadedImages: number;
  failedImages: number;
  averageLoadTime: number;
  totalLoadTime: number;
}

const ImagePerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalImages: 0,
    loadedImages: 0,
    failedImages: 0,
    averageLoadTime: 0,
    totalLoadTime: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const handleImageLoad = (event: Event) => {
      const img = event.target as HTMLImageElement;
      const loadTime = performance.now() - (img as any).startTime;
      
      setMetrics(prev => ({
        ...prev,
        loadedImages: prev.loadedImages + 1,
        totalLoadTime: prev.totalLoadTime + loadTime,
        averageLoadTime: (prev.totalLoadTime + loadTime) / (prev.loadedImages + 1)
      }));
    };

    const handleImageError = () => {
      setMetrics(prev => ({
        ...prev,
        failedImages: prev.failedImages + 1
      }));
    };

    // Monitor all images
    const images = document.querySelectorAll('img');
    setMetrics(prev => ({ ...prev, totalImages: images.length }));

    images.forEach(img => {
      (img as any).startTime = performance.now();
      img.addEventListener('load', handleImageLoad);
      img.addEventListener('error', handleImageError);
    });

    // Toggle visibility with Ctrl+Shift+P
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageError);
      });
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isVisible || process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg text-sm font-mono">
      <div className="mb-2 font-bold">Image Performance</div>
      <div>Total: {metrics.totalImages}</div>
      <div>Loaded: {metrics.loadedImages}</div>
      <div>Failed: {metrics.failedImages}</div>
      <div>Avg Load: {metrics.averageLoadTime.toFixed(0)}ms</div>
      <div className="text-xs text-gray-400 mt-2">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};

export default ImagePerformanceMonitor;
