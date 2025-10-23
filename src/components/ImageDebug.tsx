import React, { useState, useEffect } from 'react';
import { getImageForPlace, getImageForActivity } from '../utils/imageLoader';

const ImageDebug: React.FC = () => {
  const [imageStatuses, setImageStatuses] = useState<{ [key: string]: boolean }>({});
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  const testImages = [
    'bangkok',
    'chiang mai', 
    'phuket',
    'songkran festival',
    'thai massage & wellness',
    'floating markets',
    'muay thai',
    'thai cuisine',
    'buddhist temples'
  ];

  useEffect(() => {
    testImages.forEach(name => {
      const imageUrl = getImageForPlace(name) || getImageForActivity(name);
      if (imageUrl) {
        const img = new Image();
        img.onload = () => {
          setImageStatuses(prev => ({ ...prev, [name]: true }));
        };
        img.onerror = () => {
          setImageStatuses(prev => ({ ...prev, [name]: false }));
        };
        img.src = imageUrl;
      }
    });
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg max-w-sm z-50">
      <h3 className="text-lg font-bold mb-2">Image Debug Panel</h3>
      <div className="space-y-2 text-sm">
        {testImages.map(name => {
          const imageUrl = getImageForPlace(name) || getImageForActivity(name);
          const isLoaded = imageStatuses[name];
          return (
            <div key={name}>
              <div className="font-medium">{name}</div>
              <div className="ml-2">
                <div className="flex items-center space-x-2">
                  <span className={isLoaded ? 'text-green-400' : 'text-red-400'}>
                    {isLoaded ? '✓' : '✗'}
                  </span>
                  <span className="text-xs truncate">{imageUrl ? imageUrl.split('/').pop() : 'No image'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageDebug;
