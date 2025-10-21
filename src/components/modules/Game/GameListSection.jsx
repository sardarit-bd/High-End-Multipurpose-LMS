import React from "react";
import { FaGamepad } from "react-icons/fa";
import GameCard from "./GameCards";

const GameListSection = ({
  filteredGames,
  handlePlayGame,
  setSelectedSDG,
  setSearchTerm,
  setActiveFilter,
}) => {
  if (filteredGames.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-200">
        <FaGamepad className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h3 className="text-3xl font-bold text-gray-600 mb-4">No Games Found</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
          We couldn't find any games matching your search criteria. Try adjusting your filters or search terms.
        </p>
        <button
          onClick={() => {
            setSelectedSDG("all");
            setSearchTerm("");
            setActiveFilter("all");
          }}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto"
        >
          <FaGamepad className="w-5 h-5" />
          <span>Show All Games</span>
        </button>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
      {filteredGames.map((game) => (
        <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
      ))}
    </section>
  );
};

export default GameListSection;
