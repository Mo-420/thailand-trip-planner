import React, { useState, useEffect } from 'react';
import { getImageForPlace, getImageForActivity } from '../utils/imageLoader';

const ImageTest: React.FC = () => {
  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  const testItems = [
    'bangkok',
    'songkran festival',
    'thai massage & wellness',
    'floating markets',
    'muay thai',
    'thai cuisine',
    'buddhist temples'
  ];

  useEffect(() => {
    const testImages = async () => {
      const results: { [key: string]: boolean } = {};
      
      for (const item of testItems) {
        const imageUrl = getImageForPlace(item) || getImageForActivity(item);
        console.log(`Testing ${item}:`, imageUrl);
        
        if (!imageUrl) {
          results[item] = false;
          continue;
        }
        
        // Test the image
        const testImage = new Image();
        const promise = new Promise<boolean>((resolve) => {
          testImage.onload = () => resolve(true);
          testImage.onerror = () => resolve(false);
          testImage.src = imageUrl;
        });
        
        const success = await promise;
        results[item] = success;
        console.log(`${item}: ${success ? 'SUCCESS' : 'FAILED'}`);
      }
      
      setTestResults(results);
      setLoading(false);
    };
    
    testImages();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-4 left-4 bg-blue-500 text-white p-4 rounded-lg z-50">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Testing images...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-4 bg-black/90 text-white p-4 rounded-lg max-w-sm z-50">
      <h3 className="text-lg font-bold mb-2">Image Test Results</h3>
      <div className="space-y-1 text-sm">
        {testItems.map(item => {
          const success = testResults[item];
          const imageUrl = getImageForPlace(item) || getImageForActivity(item);
          return (
            <div key={item} className="flex items-center justify-between">
              <span className="capitalize">{item}</span>
              <div className="flex items-center space-x-2">
                <span className={success ? 'text-green-400' : 'text-red-400'}>
                  {success ? '✓' : '✗'}
                </span>
                <span className="text-xs text-gray-400">{imageUrl ? '1' : '0'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageTest;