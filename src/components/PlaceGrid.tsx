import React from 'react';
import { motion } from 'framer-motion';

interface PlaceItem {
  name: string;
  slug: string;
  file: string | null;
  qid: string | null;
  type: string;
  parent?: string;
  group?: string;
  source: string;
  author_html: string;
  license: string;
  credit_html: string;
  error?: string;
}

interface PlaceGridProps {
  className?: string;
}

const PlaceGrid: React.FC<PlaceGridProps> = ({ className = '' }) => {
  // Import the metadata - in a real app, you'd fetch this
  const meta = {
    items: [] as PlaceItem[]
  };

  // For now, return a placeholder since we haven't run the fetcher yet
  if (meta.items.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="liquid-glass rounded-2xl p-8 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-apple-gray-900 mb-4">
            🖼️ Image Pipeline Ready
          </h3>
          <p className="text-apple-gray-600 mb-6">
            Run <code className="bg-apple-gray-100 px-2 py-1 rounded">npm run img:seed</code> to fetch high-quality images from Wikimedia Commons.
          </p>
          <div className="text-sm text-apple-gray-500">
            <p>✅ Deterministic image resolution</p>
            <p>✅ Proper attribution & licensing</p>
            <p>✅ No API billing or rate limits</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}>
      {meta.items.map((item, index) => (
        <motion.article
          key={item.slug || item.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="liquid-glass glass-hover rounded-2xl overflow-hidden"
        >
          <div className="aspect-video bg-apple-gray-100 relative overflow-hidden">
            {item.file ? (
              <img
                src={item.file}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-apple-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <div className="text-sm">No image</div>
                  {item.error && (
                    <div className="text-xs text-thai-orange mt-1">{item.error}</div>
                  )}
                </div>
              </div>
            )}
            
            {/* Type badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-apple-gray-700">
                {item.type}
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-apple-gray-900 mb-2">{item.name}</h3>
            
            {item.parent && (
              <p className="text-sm text-apple-gray-600 mb-3">
                Part of {item.parent}
              </p>
            )}
            
            {/* Attribution */}
            <div className="text-xs text-apple-gray-500 space-y-1">
              {item.source === 'wikimedia-commons' && item.license ? (
                <div>
                  <div className="font-medium">Image: Wikimedia Commons</div>
                  <div>License: {item.license}</div>
                  {item.author_html && (
                    <div 
                      className="mt-1"
                      dangerouslySetInnerHTML={{ __html: item.author_html }} 
                    />
                  )}
                </div>
              ) : (
                <div>No attribution available</div>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default PlaceGrid;
