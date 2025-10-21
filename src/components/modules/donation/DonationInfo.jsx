import React from "react";
import { FaGem, FaHeart } from "react-icons/fa";

const DonationInfo = () => {
  return (
    <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
          <FaHeart className="w-6 h-6 text-red-500 mr-3" />
          Why Your Donation Matters
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
            <span>Direct impact on community development</span>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
            <span>Creates educational opportunities for youth</span>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
            <span>Supports sustainable environmental projects</span>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
            <span>Builds partnerships for global change</span>
          </li>
        </ul>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
          <FaGem className="w-6 h-6 text-emerald-500 mr-3" />
          Our Transparency Promise
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
            <span>Quarterly impact reports sent to donors</span>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
            <span>90% of funds directly support programs</span>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
            <span>Annual independent financial audits</span>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
            <span>Donor recognition and impact stories</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DonationInfo;
