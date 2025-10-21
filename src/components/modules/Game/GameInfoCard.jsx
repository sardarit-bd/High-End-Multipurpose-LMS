import React from "react";
import { FaUsers } from "react-icons/fa";

const GameInfoCard = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10 border border-blue-200 shadow-xl">
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
            Our interactive SDG games transform complex global challenges into
            engaging learning experiences. Each game is carefully designed to
            promote critical thinking, problem-solving, and awareness about the
            17 Sustainable Development Goals through immersive gameplay and
            real-world scenarios.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="font-semibold text-gray-900">
                  Interactive Learning
                </div>
                <div className="text-sm text-gray-600">Hands-on experience</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="font-semibold text-gray-900">
                  Multiple Formats
                </div>
                <div className="text-sm text-gray-600">
                  Play online or download
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="font-semibold text-gray-900">
                  Progress Tracking
                </div>
                <div className="text-sm text-gray-600">
                  Monitor learning journey
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameInfoCard;
