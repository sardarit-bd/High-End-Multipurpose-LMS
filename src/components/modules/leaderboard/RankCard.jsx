"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { FaTrophy } from "react-icons/fa";

const RankCard = ({ userRank, formatPoints }) => {
  const { t } = useTranslation();

  return (
    <>
      {userRank && (
        <section className="my-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <FaTrophy className="w-8 h-8 text-pink-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t("rankCard.title")}</h3>
                <p className="text-green-100">{t("rankCard.subtitle")}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                #{userRank.rank}
              </div>
              <div className="text-green-100">
                {formatPoints(userRank.points)} {t("rankCard.points")}
              </div>
            </div>
          </div>
          <div className="mt-4 w-full bg-white bg-opacity-20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${userRank.progress}%` }}
            ></div>
          </div>
        </section>
      )}
    </>
  );
};

export default RankCard;
