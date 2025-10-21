import React from "react";
import { FaChartLine, FaFilter, FaSearch, FaSyncAlt } from "react-icons/fa";
import CustomSelect from "../special/CustomSelect";

const GameFilterSection = ({
    handleRefresh,
    searchTerm,
    setSearchTerm,
    selectedSDG,
    setSelectedSDG,
    activeFilter,
    setActiveFilter,
    filteredGames,
    games
}) => {
  return (
    <section className="mb-12 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <FaFilter className="w-8 h-8 text-blue-500 mr-3" />
            Explore Games
          </h2>
          <p className="text-gray-600">
            Filter by SDG goals, search by title, or browse by game type
          </p>
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
          <CustomSelect value={selectedSDG} onChange={setSelectedSDG} />
        </div>

        {/* Game Type Filter */}
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-700 min-w-max">
            Game Type:
          </span>
          <div className="flex space-x-2">
            {["all", "embed", "external", "download"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 capitalize ${
                  activeFilter === type
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type === "all" ? "All" : type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-xl">
          Showing{" "}
          <span className="font-bold text-blue-700">
            {filteredGames.length}
          </span>{" "}
          of <span className="font-bold text-blue-700">{games.length}</span>{" "}
          games
        </div>

        {selectedSDG !== "all" && (
          <button
            onClick={() => setSelectedSDG("all")}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default GameFilterSection;
