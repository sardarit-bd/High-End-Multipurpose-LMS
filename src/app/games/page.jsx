"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import GameCard from '@/components/modules/Game/GameCards';
import { FaFilter, FaGamepad, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import CustomSelect from '@/components/modules/special/CustomSelect';
import Navbar from '@/components/modules/headers/Navbar';

export default function Games() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedSDG, setSelectedSDG] = useState('all');
  const [loading, setLoading] = useState(true);

  // Sample game data - Firebase theke replace korbe
  const sampleGames = [
    {
      id: 1,
      title: "SDG Trivia Challenge",
      sdg: [1, 4],
      description: "Test your knowledge about Sustainable Development Goals with this fun trivia game",
      thumbnail: "/images/game1-thumb.jpg",
      type: "embed",
      gameUrl: "games/one",
      downloadUrl: null
    },
    {
      id: 2,
      title: "Climate Action Simulator",
      sdg: [13],
      description: "Make decisions to reduce carbon footprint and save the planet",
      thumbnail: "/images/game2-thumb.jpg",
      type: "external",
      gameUrl: "https://external-game-site.com/climate-action",
      downloadUrl: null
    },
    {
      id: 3,
      title: "Clean Water Puzzle",
      sdg: [6],
      description: "Solve puzzles to provide clean water to communities",
      thumbnail: "/images/game3-thumb.jpg",
      type: "download",
      gameUrl: null,
      downloadUrl: "/games/water-puzzle.zip"
    },
    {
      id: 4,
      title: "Gender Equality Quiz",
      sdg: [5],
      description: "Learn about gender equality through interactive quizzes",
      thumbnail: "/images/game4-thumb.jpg",
      type: "embed",
      gameUrl: "/games/gender-quiz/index.html",
      downloadUrl: null
    },
    {
      id: 5,
      title: "Sustainable Cities Game",
      sdg: [11],
      description: "Build sustainable cities while managing resources",
      thumbnail: "/images/game5-thumb.jpg",
      type: "external",
      gameUrl: "https://external-game-site.com/sustainable-cities",
      downloadUrl: null
    },
    {
      id: 6,
      title: "Life Below Water Adventure",
      sdg: [14],
      description: "Explore marine life and protect ocean ecosystems",
      thumbnail: "/images/game6-thumb.jpg",
      type: "download",
      gameUrl: null,
      downloadUrl: "/games/ocean-adventure.zip"
    }
  ];

  useEffect(() => {
    // Firebase theke data load korbe ekhane
    setGames(sampleGames);
    setFilteredGames(sampleGames);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedSDG === 'all') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game => 
        game.sdg.includes(parseInt(selectedSDG))
      );
      setFilteredGames(filtered);
    }
  }, [selectedSDG, games]);

  const handlePlayGame = (game) => {
    if (game.type === 'embed') {
      // Modal e game show korbe
      window.location.href = game.gameUrl;
      // Ekhane game modal open korbe
    } else if (game.type === 'external') {
      window.open(game.gameUrl, '_blank');
    } else if (game.type === 'download') {
      window.open(game.downloadUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <FaGamepad className="w-6 h-6 text-blue-600 animate-bounce" />
          <div className="text-xl text-gray-600">Loading games...</div>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/> 
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>SDG Games - Interactive Learning</title>
        <meta name="description" content="Learn about SDGs through interactive games" />
      </Head>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaGamepad className="w-12 h-12 text-white opacity-90" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              SDG Games
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Learn about Sustainable Development Goals through fun and interactive games
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        {/* SDG Filter Card */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <FaFilter className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Filter Games:</span>
              </div>
              <CustomSelect 
                value={selectedSDG} 
                onChange={setSelectedSDG}
              />
            </div>
            
            {/* Results Counter */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                <span className="font-semibold text-gray-900">{filteredGames.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{games.length}</span> games
              </div>
              
              {/* Reset Filter */}
              {selectedSDG !== 'all' && (
                <button
                  onClick={() => setSelectedSDG('all')}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>Reset Filter</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {filteredGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onPlay={handlePlayGame}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <FaGamepad className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-2xl font-semibold text-gray-600 mb-2">No games found</div>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We couldn't find any games matching your selected SDG goal filter.
            </p>
            <button
              onClick={() => setSelectedSDG('all')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <FaGamepad className="w-4 h-4" />
              <span>Show All Games</span>
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaGamepad className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Learning Through Play
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our interactive SDG games are designed to make learning about the 17 Sustainable Development Goals 
                engaging and memorable. Each game focuses on specific SDGs and promotes experiential learning 
                through challenges, puzzles, and simulations that bring these important global goals to life.
              </p>
              <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Embedded Games</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Online Games</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Downloadable Games</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}