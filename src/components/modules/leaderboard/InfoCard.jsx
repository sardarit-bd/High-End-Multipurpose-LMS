"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { FaAward, FaFire } from "react-icons/fa";

const InfoCard = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-8 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section - How Points Work */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <FaAward className="w-6 h-6 text-green-500 mr-3" />
            {t("infoCard.pointsTitle")}
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>
                {t("infoCard.quiz")} <strong>+100 {t("infoCard.points")}</strong>
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>
                {t("infoCard.missions")} <strong>+250 {t("infoCard.points")}</strong>
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>
                {t("infoCard.activities")}{" "}
                <strong>+500 {t("infoCard.points")}</strong>
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>
                {t("infoCard.login")}{" "}
                <strong>+50 {t("infoCard.pointsPerDay")}</strong>
              </span>
            </li>
          </ul>
        </div>

        {/* Right Section - Climb the Ranks */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <FaFire className="w-6 h-6 text-green-500 mr-3" />
            {t("infoCard.rankTitle")}
          </h3>
          <p className="text-gray-700 mb-4">{t("infoCard.description")}</p>
          <div className="flex space-x-3">
            <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200">
              {t("infoCard.startLearning")}
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:border-gray-400 transition-all duration-200">
              {t("infoCard.viewBadges")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoCard;
