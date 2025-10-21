import React from "react";
import {
  FaTrophy,
  FaCrown,
  FaStar,
  FaUniversity,
  FaMapMarkerAlt,
  FaAward,
  FaUsers,
} from "react-icons/fa";

const LeaderboardHeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden">
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

        {/* Animated Circles */}
        <div className="absolute -top-20 -left-20 h-80 w-80 animate-pulse rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 animate-pulse rounded-full bg-purple-300/20 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 h-40 w-40 animate-pulse rounded-full bg-pink-300/15 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-32 w-32 animate-pulse rounded-full bg-indigo-300/15 blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px),
                            linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-48 h-48 bg-white opacity-5 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Badge */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-3xl flex items-center justify-center transform rotate-12 shadow-2xl animate-float">
                <FaTrophy className="w-14 h-14 text-white" />
              </div>
              <div className="absolute -top-3 -right-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                  <FaCrown className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
              <div className="absolute -bottom-2 -left-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <FaStar className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent leading-tight">
            SDG Rankings
          </h1>
          <p className="text-xl md:text-2xl text-cyan-100 max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            Compete with global changemakers. Track your impact. Lead the
            sustainable revolution.
          </p>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { value: "1,250+", label: "Active Players", icon: FaUsers },
              { value: "45", label: "Schools", icon: FaUniversity },
              { value: "5", label: "Regions", icon: FaMapMarkerAlt },
              { value: "2.5M+", label: "Points Earned", icon: FaAward },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 group"
              >
                <stat.icon className="w-8 h-8 text-emerald-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-black">
                  {stat.value}
                </div>
                <div className="text-sm text-cyan-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardHeroSection;
