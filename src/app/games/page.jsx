"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import GameCard from '@/components/modules/Game/GameCards';
import { FaFilter, FaGamepad, FaDownload, FaExternalLinkAlt, FaSearch, FaSyncAlt, FaRocket, FaUsers, FaChartLine } from 'react-icons/fa';
import CustomSelect from '@/components/modules/special/CustomSelect';
import Navbar from '@/components/modules/headers/Navbar';

export default function Games() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedSDG, setSelectedSDG] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample game data - Firebase theke replace korbe
  const sampleGames = [
    {
      id: 1,
      title: "SDG Trivia Challenge",
      sdg: [1, 4],
      description: "Test your knowledge about Sustainable Development Goals with this fun trivia game. Answer questions and learn interesting facts about global development.",
      thumbnail: "/images/game1-thumb.jpg",
      type: "embed",
      gameUrl: "/games/trivia/index.html",
      downloadUrl: null,
      players: "1-4 Players",
      duration: "15-30 mins",
      difficulty: "Easy",
      rating: 4.5
    },
    {
      id: 2,
      title: "Climate Action Simulator",
      sdg: [13],
      description: "Make strategic decisions to reduce carbon footprint and save the planet. Manage resources and implement eco-friendly policies.",
      thumbnail: "/images/game2-thumb.jpg",
      type: "external",
      gameUrl: "https://external-game-site.com/climate-action",
      downloadUrl: null,
      players: "Single Player",
      duration: "45-60 mins",
      difficulty: "Medium",
      rating: 4.8
    },
    {
      id: 3,
      title: "Clean Water Puzzle",
      sdg: [6],
      description: "Solve challenging puzzles to provide clean water to communities. Build water filtration systems and manage distribution networks.",
      thumbnail: "/images/game3-thumb.jpg",
      type: "download",
      gameUrl: null,
      downloadUrl: "/games/water-puzzle.zip",
      players: "Single Player",
      duration: "20-40 mins",
      difficulty: "Medium",
      rating: 4.3
    },
    {
      id: 4,
      title: "Gender Equality Quiz",
      sdg: [5],
      description: "Learn about gender equality through interactive quizzes and scenarios. Understand challenges and solutions for gender parity.",
      thumbnail: "/images/game4-thumb.jpg",
      type: "embed",
      gameUrl: "/games/gender-quiz/index.html",
      downloadUrl: null,
      players: "1-2 Players",
      duration: "10-20 mins",
      difficulty: "Easy",
      rating: 4.6
    },
    {
      id: 5,
      title: "Sustainable Cities Game",
      sdg: [11],
      description: "Build sustainable cities while managing resources and infrastructure. Balance economic growth with environmental protection.",
      thumbnail: "/images/game5-thumb.jpg",
      type: "external",
      gameUrl: "https://external-game-site.com/sustainable-cities",
      downloadUrl: null,
      players: "Single Player",
      duration: "60+ mins",
      difficulty: "Hard",
      rating: 4.7
    },
    {
      id: 6,
      title: "Life Below Water Adventure",
      sdg: [14],
      description: "Explore marine life and protect ocean ecosystems. Complete missions to clean oceans and preserve marine biodiversity.",
      thumbnail: "/images/game6-thumb.jpg",
      type: "download",
      gameUrl: null,
      downloadUrl: "/games/ocean-adventure.zip",
      players: "Single Player",
      duration: "30-50 mins",
      difficulty: "Medium",
      rating: 4.4
    },
    {
      id: 7,
      title: "Zero Hunger Strategy",
      sdg: [2],
      description: "Develop strategies to combat hunger and improve food security. Manage agricultural systems and distribution networks.",
      thumbnail: "/images/game7-thumb.jpg",
      type: "embed",
      gameUrl: "/games/hunger-strategy/index.html",
      downloadUrl: null,
      players: "1-2 Players",
      duration: "25-35 mins",
      difficulty: "Medium",
      rating: 4.2
    },
    {
      id: 8,
      title: "Renewable Energy Tycoon",
      sdg: [7],
      description: "Build and manage renewable energy infrastructure. Invest in solar, wind, and hydro power to create sustainable energy grids.",
      thumbnail: "/images/game8-thumb.jpg",
      type: "external",
      gameUrl: "https://external-game-site.com/energy-tycoon",
      downloadUrl: null,
      players: "Single Player",
      duration: "45-75 mins",
      difficulty: "Hard",
      rating: 4.9
    }
  ];

  const gameStats = {
    totalGames: sampleGames.length,
    totalPlayers: '10K+',
    averageRating: 4.5,
    learningHours: '50K+'
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGames(sampleGames);
      setFilteredGames(sampleGames);
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    let filtered = games;

    // SDG Filter
    if (selectedSDG !== 'all') {
      filtered = filtered.filter(game => game.sdg.includes(parseInt(selectedSDG)));
    }

    // Search Filter
    if (searchTerm) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type Filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(game => game.type === activeFilter);
    }

    setFilteredGames(filtered);
  }, [selectedSDG, searchTerm, activeFilter, games]);

  const handlePlayGame = (game) => {
    if (game.type === 'embed') {
      // Modal e game show korbe
      console.log('Embed game:', game.gameUrl);
      // Ekhane game modal open korbe
    } else if (game.type === 'external') {
      window.open(game.gameUrl, '_blank');
    } else if (game.type === 'download') {
      window.open(game.downloadUrl, '_blank');
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <FaGamepad className="w-16 h-16 text-blue-600 animate-bounce mx-auto mb-4" />
            <div className="absolute -top-2 -right-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <FaRocket className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">Loading Games</h3>
          <p className="text-gray-500">Preparing amazing learning experiences...</p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
        <Head>
          <title>SDG Games - Interactive Learning Platform</title>
          <meta name="description" content="Learn about Sustainable Development Goals through fun and interactive games" />
        </Head>

        {/* Enhanced Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full -translate-y-36 translate-x-36"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white opacity-5 rounded-full translate-y-28 -translate-x-28"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-green-400 rounded-3xl flex items-center justify-center transform rotate-12 shadow-2xl">
                    <FaGamepad className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3">
                    <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                      <FaRocket className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Play & Learn SDGs
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Discover the 17 Sustainable Development Goals through engaging games, interactive challenges, and immersive learning experiences
              </p>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center p-6 bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
                  <div className="text-3xl font-bold text-emerald-300">{gameStats.totalGames}</div>
                  <div className="text-sm text-blue-200">Interactive Games</div>
                </div>
                <div className="text-center p-6 bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
                  <div className="text-3xl font-bold text-blue-300">{gameStats.totalPlayers}</div>
                  <div className="text-sm text-blue-200">Active Learners</div>
                </div>
                <div className="text-center p-6 bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
                  <div className="text-3xl font-bold text-purple-300">{gameStats.averageRating}/5</div>
                  <div className="text-sm text-blue-200">Average Rating</div>
                </div>
                <div className="text-center p-6 bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
                  <div className="text-3xl font-bold text-yellow-300">{gameStats.learningHours}</div>
                  <div className="text-sm text-blue-200">Learning Hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
          {/* Enhanced Filter Section */}
          <div className="mb-12 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaFilter className="w-8 h-8 text-blue-500 mr-3" />
                  Explore Games
                </h2>
                <p className="text-gray-600">Filter by SDG goals, search by title, or browse by game type</p>
              </div>

              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                <FaSyncAlt className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Search Box */}
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border-1 outline-none border-gray-200 rounded-2xl placeholder-gray-400 focus:text-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-lg font-semibold"
                  min="1"
                />
              </div>

              {/* SDG Filter */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700 min-w-max">
                  <FaChartLine className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">SDG Goal:</span>
                </div>
                <CustomSelect
                  value={selectedSDG}
                  onChange={setSelectedSDG}
                />
              </div>

              {/* Game Type Filter */}
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-700 min-w-max">Game Type:</span>
                <div className="flex space-x-2">
                  {['all', 'embed', 'external', 'download'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveFilter(type)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 capitalize ${activeFilter === type
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {type === 'all' ? 'All' : type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-xl">
                Showing <span className="font-bold text-blue-700">{filteredGames.length}</span> of{' '}
                <span className="font-bold text-blue-700">{games.length}</span> games
              </div>

              {selectedSDG !== 'all' && (
                <button
                  onClick={() => setSelectedSDG('all')}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Games Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
              {filteredGames.map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlay={handlePlayGame}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-200">
              <FaGamepad className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-600 mb-4">No Games Found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
                We couldn't find any games matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSelectedSDG('all');
                  setSearchTerm('');
                  setActiveFilter('all');
                }}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto"
              >
                <FaGamepad className="w-5 h-5" />
                <span>Show All Games</span>
              </button>
            </div>
          )}

          {/* Enhanced Info Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10 border border-blue-200 shadow-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaUsers className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Gamified Learning Experience
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Our interactive SDG games transform complex global challenges into engaging learning experiences.
                  Each game is carefully designed to promote critical thinking, problem-solving, and awareness about
                  the 17 Sustainable Development Goals through immersive gameplay and real-world scenarios.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">Interactive Learning</div>
                      <div className="text-sm text-gray-600">Hands-on experience</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">Multiple Formats</div>
                      <div className="text-sm text-gray-600">Play online or download</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">Progress Tracking</div>
                      <div className="text-sm text-gray-600">Monitor learning journey</div>
                    </div>
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