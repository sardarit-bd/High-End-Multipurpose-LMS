import React from "react";
import { FaGamepad, FaRocket } from "react-icons/fa";

const GameHeroSection = ({gameStats}) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden">
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
            Discover the 17 Sustainable Development Goals through engaging
            games, interactive challenges, and immersive learning experiences
          </p>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center p-6 bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
              <div className="text-3xl font-bold text-emerald-300">
                {gameStats.totalGames}
              </div>
              <div className="text-sm text-blue-200">Interactive Games</div>
            </div>
            <div className="text-center p-6 bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-300">
                {gameStats.totalPlayers}
              </div>
              <div className="text-sm text-blue-200">Active Learners</div>
            </div>
            <div className="text-center p-6 bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-300">
                {gameStats.averageRating}/5
              </div>
              <div className="text-sm text-blue-200">Average Rating</div>
            </div>
            <div className="text-center p-6 bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
              <div className="text-3xl font-bold text-yellow-300">
                {gameStats.learningHours}
              </div>
              <div className="text-sm text-blue-200">Learning Hours</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameHeroSection;
