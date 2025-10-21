"use client";

import { useState } from 'react';
import { FaDownload, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';

export default function GameCard({ game, onPlay }) {
  const [imageError, setImageError] = useState(false);

  const getButtonConfig = () => {
    switch (game.type) {
      case 'embed': 
        return { 
          text: 'Play Now', 
          color: 'bg-green-600 hover:bg-green-700',
          icon: <FaPlay className="w-4 h-4" />
        };
      case 'external': 
        return { 
          text: 'Play Online', 
          color: 'bg-blue-600 hover:bg-blue-700',
          icon: <FaExternalLinkAlt className="w-4 h-4" />
        };
      case 'download': 
        return { 
          text: 'Download Game', 
          color: 'bg-purple-600 hover:bg-purple-700',
          icon: <FaDownload className="w-4 h-4" />
        };
      default: 
        return { 
          text: 'Play Now', 
          color: 'bg-green-600 hover:bg-green-700',
          icon: <FaPlay className="w-4 h-4" />
        };
    }
  };

  const buttonConfig = getButtonConfig();
  const getSDGTags = () => {
    return game.sdg.map(goal => `Goal ${goal}`).join(', ');
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 group">
      {/* Game Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden">
        {!imageError ? (
          <img 
            src={game.thumbnail} 
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
            <div className="text-center p-4">
              <FaPlay className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <div className="text-gray-600 font-medium">{game.title}</div>
            </div>
          </div>
        )}
        
        {/* Game Type Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            game.type === 'embed' ? 'bg-green-100 text-green-800 border border-green-200' :
            game.type === 'external' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
            'bg-purple-100 text-purple-800 border border-purple-200'
          }`}>
            {buttonConfig.icon}
            <span className="ml-1">
              {game.type === 'embed' ? 'Embedded' : 
               game.type === 'external' ? 'Online' : 'Download'}
            </span>
          </span>
        </div>
      </div>
      
      {/* Game Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {game.title}
        </h3>
        
        {/* SDG Tags */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            SDG: {getSDGTags()}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
          {game.description}
        </p>
        
        {/* Play Button */}
        <button 
          onClick={() => onPlay(game)}
          className={`w-full ${buttonConfig.color} text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform group-hover:scale-105 flex items-center justify-center space-x-2`}
        >
          {buttonConfig.icon}
          <span>{buttonConfig.text}</span>
        </button>
      </div>
    </section>
  );
}