import React from "react";
import { FaHandshake, FaRocket } from "react-icons/fa";

const SponsorHeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>

      <div className="container mx-auto px-4 sm:px-6  py-24 relative">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center transform rotate-12 shadow-2xl">
                <FaHandshake className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-3 -right-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaRocket className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Partner With Purpose
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Join forces to create sustainable impact. Choose from tailored
            sponsorship packages designed for maximum value and social return.
          </p>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
              <div className="text-2xl font-bold text-emerald-300">50+</div>
              <div className="text-sm text-blue-200">Partners</div>
            </div>
            <div className="text-center p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
              <div className="text-2xl font-bold text-blue-300">$2M+</div>
              <div className="text-sm text-blue-200">Impact Generated</div>
            </div>
            <div className="text-center p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
              <div className="text-2xl font-bold text-purple-300">17</div>
              <div className="text-sm text-blue-200">SDG Goals</div>
            </div>
            <div className="text-center p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
              <div className="text-2xl font-bold text-yellow-300">100+</div>
              <div className="text-sm text-blue-200">Projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorHeroSection;
