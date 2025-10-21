"use client";
import React from "react";
import {
  FaTrophy,
  FaLightbulb,
  FaChartLine,
  FaCheck,
  FaAward,
  FaCrown,
  FaGem,
  FaStar,
  FaMedal
} from "react-icons/fa";

const SponsorShipCard = ({ packages, selectedPackage, setSelectedPackage, selectedPackageData }) => {



  // Icon mapping function
  const getIconComponent = (iconName) => {
    const iconMap = {
      'FaCrown': FaCrown,
      'FaGem': FaGem,
      'FaStar': FaStar,
      'FaMedal': FaMedal,
      'FaTrophy': FaTrophy,
      'FaLightbulb': FaLightbulb,
      'FaChartLine': FaChartLine,
      'FaCheck': FaCheck,
      'FaAward': FaAward
    };
    return iconMap[iconName] || FaStar;
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <FaTrophy className="w-8 h-8 text-yellow-500 mr-3" />
          Sponsorship Packages
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the package that best aligns with your organization's goals and budget
        </p>
      </div>

      {/* Package Selection Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedPackage === pkg.id
                ? `bg-gradient-to-r ${pkg.color} text-white shadow-lg`
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${selectedPackage === pkg.id
              ? `bg-gradient-to-r ${pkg.color} text-white shadow-lg`
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {pkg.name}
          </button>
        ))}
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
        {packages.map((pkg) => {
          // Properly get the icon component
          const IconComponent = getIconComponent(pkg.icon);
          
          return (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-3xl border-2 transition-all duration-300 ${
                selectedPackage === pkg.id
                  ? `border-blue-500 shadow-2xl scale-105`
                  : "border-gray-200 shadow-lg hover:scale-105"
              } ${pkg.popular ? "ring-2 ring-yellow-400 ring-opacity-50" : ""}`}
              className={`relative bg-white rounded-3xl border-2 transition-all duration-300 ${selectedPackage === pkg.id
                ? `border-blue-500 shadow-2xl scale-105`
                : "border-gray-200 shadow-lg hover:scale-105"
                } ${pkg.popular ? "ring-2 ring-yellow-400 ring-opacity-50" : ""}`}

            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`p-6 rounded-t-3xl text-white bg-gradient-to-r ${pkg.color}`}>
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="w-8 h-8" />
                  <span className="bg-white text-black bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  <span className="text-blue-100">{pkg.duration}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FaLightbulb className="w-4 h-4 text-blue-500 mr-2" />
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <FaCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FaChartLine className="w-4 h-4 text-purple-500 mr-2" />
                    Key Benefits
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    selectedPackage === pkg.id
                      ? `bg-gradient-to-r ${pkg.color} text-white shadow-lg hover:shadow-xl`
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${selectedPackage === pkg.id
                    ? `bg-gradient-to-r ${pkg.color} text-white shadow-lg hover:shadow-xl`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}

                >
                  Select Package
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Package Details */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedPackageData.name} Package Details
          </h3>
          <p className="text-xl text-gray-600">
            Complete overview of benefits and implementation process
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Start Partnership Discussion
          </button>
          <p className="text-gray-600 mt-4 text-sm">
            Schedule a personalized consultation to discuss your sponsorship goals
          </p>
        </div>
      </div>
    </section>
  );
};

export default SponsorShipCard;