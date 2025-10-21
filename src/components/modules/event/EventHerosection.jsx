import React from "react";

import {
  FaCalendarAlt,
  FaRegHeart,
  FaHeart,
  FaShare,
  FaBookmark,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { MdPeople } from "react-icons/md";

const EventHerosection = ({
  eventData,
  countdown,
  isLiked,
  setIsLiked,
  isBookmarked,
  setIsBookmarked,
  handleRegister,
  shareEvent,
}) => {
  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      {/* Animated Background Elements */}
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

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm border border-white/20">
                <FaCalendarAlt className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Upcoming Event
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-800 md:text-5xl lg:text-6xl">
                Digital Marketing{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Masterclass
                </span>{" "}
                2024
              </h1>

              <p className="mb-8 text-xl text-gray-600 leading-relaxed">
                Join the most anticipated digital marketing event of the year.
                Learn from industry experts and network with professionals from
                around the world.
              </p>

              {/* Countdown Timer */}
              <div className="mb-8 flex justify-center lg:justify-start gap-4">
                {Object.entries(countdown).map(([key, value]) => (
                  <div key={key} className="flex flex-col items-center">
                    <div className="rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 px-4 py-3 min-w-[70px]">
                      <span className="text-2xl font-bold text-gray-800 md:text-3xl">
                        {value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-600 uppercase">
                      {key}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={handleRegister}
                  className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white transition-all hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
                >
                  <span>Register Now - {eventData.price}</span>
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="rounded-full bg-white/80 backdrop-blur-sm border border-white/20 p-4 transition-all hover:bg-white hover:shadow-lg"
                  >
                    {isLiked ? (
                      <FaHeart className="text-red-500 text-lg" />
                    ) : (
                      <FaRegHeart className="text-gray-600 text-lg" />
                    )}
                  </button>
                  <button
                    onClick={shareEvent}
                    className="rounded-full bg-white/80 backdrop-blur-sm border border-white/20 p-4 transition-all hover:bg-white hover:shadow-lg"
                  >
                    <FaShare className="text-gray-600 text-lg" />
                  </button>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="rounded-full bg-white/80 backdrop-blur-sm border border-white/20 p-4 transition-all hover:bg-white hover:shadow-lg"
                  >
                    <FaBookmark
                      className={`text-lg ${
                        isBookmarked ? "text-yellow-500" : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6">
                <div className="flex items-center gap-2">
                  <MdPeople className="text-blue-600 text-xl" />
                  <span className="font-semibold text-gray-700">
                    {eventData.attendees.toLocaleString()}+ Registered
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500 text-xl" />
                  <span className="font-semibold text-gray-700">
                    {eventData.rating} Rating (
                    {eventData.reviews.toLocaleString()}+ reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative">
              <div className="relative mx-auto max-w-2xl">
                {/* Main Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl">
                  <div className="relative z-10 p-8 text-white">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IoIosRocket className="text-2xl" />
                        <span className="font-bold">MASTERCLASS</span>
                      </div>
                      <div className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                        LIVE
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <h3 className="mb-4 text-2xl font-bold">
                        Transform Your Digital Strategy
                      </h3>
                      <p className="opacity-90">
                        Learn cutting-edge techniques from industry leaders and
                        take your marketing skills to the next level.
                      </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: "🎯", text: "Practical" },
                        { icon: "⚡", text: "Interactive" },
                        { icon: "🤝", text: "Networking" },
                        { icon: "📚", text: "Resources" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-sm font-medium">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 h-20 w-20 rounded-full bg-white"></div>
                    <div className="absolute bottom-10 left-10 h-16 w-16 rounded-full bg-white"></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4">
                  <div className="animate-bounce rounded-2xl bg-white p-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-bold text-gray-700">
                        Live
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4">
                  <div
                    className="animate-bounce rounded-2xl bg-yellow-400 p-3 shadow-lg"
                    style={{ animationDelay: "1s" }}
                  >
                    <span className="text-sm font-bold text-white">
                      🔥 Trending
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHerosection;
