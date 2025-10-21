import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";

const DonationHeaderSection = ({totalDonations,donorsCount}) => {
  return (
    <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-emerald-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 sm:px-6 py-20 relative">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl">
                <FaHeart className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <FaStar className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
            Make an Impact
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Your generosity fuels sustainable change. Choose your cause and
            create lasting impact today.
          </p>

          {/* Impact Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
              <div className="text-3xl font-bold text-emerald-300">
                ${(totalDonations / 1000).toFixed(0)}K+
              </div>
              <div className="text-sm text-blue-200">Total Impact</div>
            </div>
            <div className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
              <div className="text-3xl font-bold text-blue-300">
                {donorsCount}+
              </div>
              <div className="text-sm text-blue-200">Changemakers</div>
            </div>
            <div className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
              <div className="text-3xl font-bold text-purple-300">17</div>
              <div className="text-sm text-blue-200">SDG Goals</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationHeaderSection;
