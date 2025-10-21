import React from "react";
import { FaCheck, FaGem } from "react-icons/fa";

const FundSelectionSidebar = ({selectedFund,setSelectedFund,isHovered,setIsHovered,funds}) => {
  return (
    <section className="lg:col-span-1 space-y-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-6 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <FaGem className="w-8 h-8 text-purple-500 mr-3" />
          Choose Your Cause
        </h2>

        <div className="space-y-4">
          {funds.map((fund) => {
            const IconComponent = fund.icon;
            return (
              <button
                key={fund.id}
                onClick={() => setSelectedFund(fund.id)}
                onMouseEnter={() => setIsHovered(fund.id)}
                onMouseLeave={() => setIsHovered(null)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 transform ${
                  selectedFund === fund.id
                    ? "border-emerald-500 bg-gradient-to-r from-emerald-50 to-blue-50 shadow-xl scale-105"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
                } ${isHovered === fund.id ? "scale-102" : ""}`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${fund.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-bold text-lg ${fund.textColor}`}>
                        {fund.title}
                      </h3>
                      {selectedFund === fund.id && (
                        <FaCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {fund.description}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-md border-1 border-green-300">
                        {fund.badge}
                      </span>
                      <span className="text-xs font-medium text-gray-700">
                        {fund.impact}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FundSelectionSidebar;
