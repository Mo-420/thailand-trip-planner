import React, { useEffect, useState } from 'react';
import { getImageForPlace, getImageForActivity } from '../utils/imageLoader';
import { imageMap } from '../data/imageMap';

const ImageDebugger: React.FC = () => {
  const [imageStatuses, setImageStatuses] = useState<{ [key: string]: boolean }>({});
  
  const destinations = ['Bangkok', 'Chiang Mai', 'Phuket', 'Krabi', 'Ayutthaya', 'Pai'];
  const activities = ['Songkran Festival', 'Thai Massage & Wellness', 'Floating Markets', 'Muay Thai', 'Thai Cuisine', 'Buddhist Temples'];
  
  useEffect(() => {
    // Test all images
    const testImages = async () => {
      const statuses: { [key: string]: boolean } = {};
      
      // Test all images in imageMap
      for (const [key, url] of Object.entries(imageMap)) {
        const img = new Image();
        img.onload = () => {
          statuses[key] = true;
          setImageStatuses({ ...statuses });
        };
        img.onerror = () => {
          console.error(`Failed to load ${key}: ${url}`);
          statuses[key] = false;
          setImageStatuses({ ...statuses });
        };
        img.src = url;
      }
    };
    
    testImages();
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4 max-h-96 overflow-auto z-50">
      <h3 className="text-lg font-bold mb-2">Image Debug Panel</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-1">Destinations</h4>
          {destinations.map(dest => {
            const url = getImageForPlace(dest);
            const key = dest.toLowerCase();
            return (
              <div key={dest} className="text-xs mb-1">
                <span className={imageStatuses[key] ? 'text-green-400' : 'text-red-400'}>
                  {imageStatuses[key] ? '✓' : '✗'} {dest}
                </span>
                {!imageStatuses[key] && (
                  <div className="text-gray-400 truncate">{url}</div>
                )}
              </div>
            );
          })}
        </div>
        
        <div>
          <h4 className="font-semibold mb-1">Activities</h4>
          {activities.map(activity => {
            const url = getImageForActivity(activity);
            const key = activity.toLowerCase();
            return (
              <div key={activity} className="text-xs mb-1">
                <span className={imageStatuses[key] ? 'text-green-400' : 'text-red-400'}>
                  {imageStatuses[key] ? '✓' : '✗'} {activity}
                </span>
                {!imageStatuses[key] && (
                  <div className="text-gray-400 truncate">{url}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 px-4 py-1 bg-blue-500 text-white rounded text-sm"
      >
        Reload Page
      </button>
    </div>
  );
};

export default ImageDebugger;
