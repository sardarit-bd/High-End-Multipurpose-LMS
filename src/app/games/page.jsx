"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import GameCard from "@/components/modules/Game/GameCards";
import {
  FaFilter,
  FaGamepad,
  FaDownload,
  FaExternalLinkAlt,
  FaSearch,
  FaSyncAlt,
  FaRocket,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import CustomSelect from "@/components/modules/special/CustomSelect";
import Navbar from "@/components/modules/headers/Navbar";
import GameHeroSection from "@/components/modules/Game/GameHeroSection";
import GameFilterSection from "@/components/modules/Game/GameFilterSection";
import GameListSection from "@/components/modules/Game/GameListSection";
import GameInfoCard from "@/components/modules/Game/GameInfoCard";
import Footer from "@/components/modules/footers/Footer";

export default function Games() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedSDG, setSelectedSDG] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  // Sample game data - Firebase theke replace korbe
  const sampleGames = [
    {
      id: 1,
      title: "SDG Trivia Challenge",
      sdg: [1, 4],
      description:
        "Test your knowledge about Sustainable Development Goals with this fun trivia game. Answer questions and learn interesting facts about global development.",
      thumbnail: "/images/game1-thumb.jpg",
      type: "embed",
      gameUrl: "games/one",
      downloadUrl: null,
    },
    {
      id: 2,
      title: "Climate Action Simulator",
      sdg: [13],
      description:
        "Make strategic decisions to reduce carbon footprint and save the planet. Manage resources and implement eco-friendly policies.",
      thumbnail: "/images/game2-thumb.jpg",
      type: "external",
      gameUrl: "https://external-game-site.com/climate-action",
      downloadUrl: null,
      players: "Single Player",
      duration: "45-60 mins",
      difficulty: "Medium",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Clean Water Puzzle",
      sdg: [6],
      description:
        "Solve challenging puzzles to provide clean water to communities. Build water filtration systems and manage distribution networks.",
      thumbnail: "/images/game3-thumb.jpg",
      type: "download",
      gameUrl: null,
      downloadUrl: "/games/water-puzzle.zip",
      players: "Single Player",
      duration: "20-40 mins",
      difficulty: "Medium",
      rating: 4.3,
    },
    {
      id: 4,
      title: "Gender Equality Quiz",
      sdg: [5],
      description:
        "Learn about gender equality through interactive quizzes and scenarios. Understand challenges and solutions for gender parity.",
      thumbnail: "/images/game4-thumb.jpg",
      type: "embed",
      gameUrl: "/games/gender-quiz/index.html",
      downloadUrl: null,
      players: "1-2 Players",
      duration: "10-20 mins",
      difficulty: "Easy",
      rating: 4.6,
    },
    {
      id: 5,
      title: "Sustainable Cities Game",
      sdg: [11],
      description:
        "Build sustainable cities while managing resources and infrastructure. Balance economic growth with environmental protection.",
      thumbnail: "/images/game5-thumb.jpg",
      type: "external",
      gameUrl: "https://external-game-site.com/sustainable-cities",
      downloadUrl: null,
      players: "Single Player",
      duration: "60+ mins",
      difficulty: "Hard",
      rating: 4.7,
    },
    {
      id: 6,
      title: "Life Below Water Adventure",
      sdg: [14],
      description:
        "Explore marine life and protect ocean ecosystems. Complete missions to clean oceans and preserve marine biodiversity.",
      thumbnail: "/images/game6-thumb.jpg",
      type: "download",
      gameUrl: null,
      downloadUrl: "/games/ocean-adventure.zip",
      players: "Single Player",
      duration: "30-50 mins",
      difficulty: "Medium",
      rating: 4.4,
    },
    {
      id: 7,
      title: "Zero Hunger Strategy",
      sdg: [2],
      description:
        "Develop strategies to combat hunger and improve food security. Manage agricultural systems and distribution networks.",
      thumbnail: "/images/game7-thumb.jpg",
      type: "embed",
      gameUrl: "/games/hunger-strategy/index.html",
      downloadUrl: null,
      players: "1-2 Players",
      duration: "25-35 mins",
      difficulty: "Medium",
      rating: 4.2,
    },
    {
      id: 8,
      title: "Renewable Energy Tycoon",
      sdg: [7],
      description:
        "Build and manage renewable energy infrastructure. Invest in solar, wind, and hydro power to create sustainable energy grids.",
      thumbnail: "/images/game8-thumb.jpg",
      type: "external",
      gameUrl: "https://external-game-site.com/energy-tycoon",
      downloadUrl: null,
      players: "Single Player",
      duration: "45-75 mins",
      difficulty: "Hard",
      rating: 4.9,
    },
  ];

  const gameStats = {
    totalGames: sampleGames.length,
    totalPlayers: "10K+",
    averageRating: 4.5,
    learningHours: "50K+",
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
    if (selectedSDG !== "all") {
      filtered = filtered.filter((game) =>
        game.sdg.includes(parseInt(selectedSDG))
      );
    }

    // Search Filter
    if (searchTerm) {
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type Filter
    if (activeFilter !== "all") {
      filtered = filtered.filter((game) => game.type === activeFilter);
    }

    setFilteredGames(filtered);
  }, [selectedSDG, searchTerm, activeFilter, games]);

  const handlePlayGame = (game) => {
    if (game.type === "embed") {
      // Modal e game show korbe
      window.open(game.gameUrl, "_blank");
      // Ekhane game modal open korbe
    } else if (game.type === "external") {
      window.open(game.gameUrl, "_blank");
    } else if (game.type === "download") {
      window.open(game.downloadUrl, "_blank");
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
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            Loading Games
          </h3>
          <p className="text-gray-500">
            Preparing amazing learning experiences...
          </p>
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
          <meta
            name="description"
            content="Learn about Sustainable Development Goals through fun and interactive games"
          />
        </Head>

        {/* Enhanced Hero Section */}
        <GameHeroSection gameStats={gameStats} />

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
          {/* Enhanced Filter Section */}
          <GameFilterSection
            handleRefresh={handleRefresh}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSDG={selectedSDG}
            setSelectedSDG={setSelectedSDG}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            filteredGames={filteredGames}
            games={games}
          />

          {/* Games Grid */}
          <GameListSection
            filteredGames={filteredGames}
            handlePlayGame={handlePlayGame}
            setSelectedSDG={setSelectedSDG}
            setSearchTerm={setSearchTerm}
            setActiveFilter={setActiveFilter}
          />

          {/* Enhanced Info Section */}
          <GameInfoCard />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
