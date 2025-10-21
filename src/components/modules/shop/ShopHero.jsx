"use client";

import { useState } from "react";
import { FaSearch, FaFilter, FaBookOpen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ShopHero = ({ onShowFilters, cartItemCount, search, onSearchChange }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-white"></div>
        <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full bg-white"></div>
        <div className="absolute top-1/2 left-1/2 h-16 w-16 rounded-full bg-white"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <FaBookOpen className="text-white text-sm" />
            <span className="text-sm font-medium text-white">
              {t("shop.hero.badge")}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t("shop.hero.title")}{" "}
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              {t("shop.hero.highlighted")}
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-orange-100">
            {t("shop.hero.description")}
          </p>

          {/* Search Bar */}
          <div className="mx-auto mb-8 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder={t("shop.hero.searchPlaceholder")}
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-2xl outline-none border-0 bg-white/20 px-6 py-4 pl-14 text-white placeholder-orange-200 backdrop-blur-sm focus:bg-white/30 focus:ring-2 focus:ring-white/50"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-lg" />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-orange-200">{t("shop.hero.stats.books")}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-orange-200">{t("shop.hero.stats.categories")}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{t("shop.hero.stats.free") || "Free"}</div>
              <div className="text-orange-200">{t("shop.hero.stats.shipping")}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-orange-200">{t("shop.hero.stats.support")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopHero;