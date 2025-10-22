"use client";

import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/modules/headers/Navbar';
import {
  FaChartLine, FaUsers, FaHandshake,
  FaMedal, FaGem, FaStar, FaCrown
} from 'react-icons/fa';
import SponsorShipCard from '@/components/modules/sponsorship/sponsorShipCard';
import PartnershipOpportunities from '@/components/modules/sponsorship/PartnershipOpportunities';
import Footer from '@/components/modules/footers/Footer';
import SponsorHeroSection from '@/components/modules/sponsorship/SponsorHeroSection';
import { useTranslation } from 'react-i18next'; // 🟢 Add i18n hook

const Sponsorship = () => {
  const { t } = useTranslation(); // 🟢 Initialize translator

  const [activeTab, setActiveTab] = useState('corporate');
  const [selectedPackage, setSelectedPackage] = useState('gold');
  const [isHovered, setIsHovered] = useState(null);

  const sponsorshipTypes = [
    {
      id: 'corporate',
      title: t("sponsor.corporateTitle"),
      description: t("sponsor.corporateDesc"),
      icon: FaChartLine,
      color: 'from-blue-500 to-cyan-500',
      features: [
        t("sponsor.corporateFeature1"),
        t("sponsor.corporateFeature2"),
        t("sponsor.corporateFeature3"),
        t("sponsor.corporateFeature4")
      ]
    },
    {
      id: 'institutional',
      title: t("sponsor.institutionalTitle"),
      description: t("sponsor.institutionalDesc"),
      icon: FaUsers,
      color: 'from-purple-500 to-pink-500',
      features: [
        t("sponsor.institutionalFeature1"),
        t("sponsor.institutionalFeature2"),
        t("sponsor.institutionalFeature3"),
        t("sponsor.institutionalFeature4")
      ]
    },
    {
      id: 'community',
      title: t("sponsor.communityTitle"),
      description: t("sponsor.communityDesc"),
      icon: FaHandshake,
      color: 'from-green-500 to-emerald-500',
      features: [
        t("sponsor.communityFeature1"),
        t("sponsor.communityFeature2"),
        t("sponsor.communityFeature3"),
        t("sponsor.communityFeature4")
      ]
    }
  ];

  const packages = [
    {
      id: 'bronze',
      name: t("sponsor.bronzeName"),
      price: '$1,000',
      duration: '/year',
      icon: 'FaMedal',
      color: 'from-amber-600 to-amber-700',
      badge: t("sponsor.bronzeBadge"),
      popular: false,
      features: [
        t("sponsor.bronzeFeature1"),
        t("sponsor.bronzeFeature2"),
        t("sponsor.bronzeFeature3"),
        t("sponsor.bronzeFeature4")
      ],
      benefits: [
        t("sponsor.bronzeBenefit1"),
        t("sponsor.bronzeBenefit2"),
        t("sponsor.bronzeBenefit3")
      ]
    },
    {
      id: 'silver',
      name: t("sponsor.silverName"),
      price: '$2,500',
      duration: '/year',
      icon: 'FaGem',
      color: 'from-gray-400 to-gray-600',
      badge: t("sponsor.silverBadge"),
      popular: false,
      features: [
        t("sponsor.silverFeature1"),
        t("sponsor.silverFeature2"),
        t("sponsor.silverFeature3"),
        t("sponsor.silverFeature4"),
        t("sponsor.silverFeature5")
      ],
      benefits: [
        t("sponsor.silverBenefit1"),
        t("sponsor.silverBenefit2"),
        t("sponsor.silverBenefit3")
      ]
    },
    {
      id: 'gold',
      name: t("sponsor.goldName"),
      price: '$5,000',
      duration: '/year',
      icon: 'FaStar',
      color: 'from-yellow-500 to-amber-500',
      badge: t("sponsor.goldBadge"),
      popular: true,
      features: [
        t("sponsor.goldFeature1"),
        t("sponsor.goldFeature2"),
        t("sponsor.goldFeature3"),
        t("sponsor.goldFeature4"),
        t("sponsor.goldFeature5"),
        t("sponsor.goldFeature6")
      ],
      benefits: [
        t("sponsor.goldBenefit1"),
        t("sponsor.goldBenefit2"),
        t("sponsor.goldBenefit3")
      ]
    },
    {
      id: 'platinum',
      name: t("sponsor.platinumName"),
      price: '$10,000',
      duration: '/year',
      icon: 'FaCrown',
      color: 'from-purple-500 to-indigo-600',
      badge: t("sponsor.platinumBadge"),
      popular: false,
      features: [
        t("sponsor.platinumFeature1"),
        t("sponsor.platinumFeature2"),
        t("sponsor.platinumFeature3"),
        t("sponsor.platinumFeature4"),
        t("sponsor.platinumFeature5"),
        t("sponsor.platinumFeature6"),
        t("sponsor.platinumFeature7")
      ],
      benefits: [
        t("sponsor.platinumBenefit1"),
        t("sponsor.platinumBenefit2"),
        t("sponsor.platinumBenefit3")
      ]
    }
  ];

  const selectedPackageData = packages.find(pkg => pkg.id === selectedPackage);
  const activeType = sponsorshipTypes.find(type => type.id === activeTab);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Head>
          <title>{t("sponsor.pageTitle")}</title>
          <meta name="description" content={t("sponsor.pageDesc")} />
        </Head>

        {/* Hero Section */}
        <SponsorHeroSection />

        {/* Partnership Types */}
        <PartnershipOpportunities
          sponsorshipTypes={sponsorshipTypes}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          activeType={activeType}
        />

        {/* Sponsorship Packages */}
        <SponsorShipCard 
          packages={packages}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          selectedPackageData={selectedPackageData}
        />
      </div>
      <Footer />
    </>
  );
};

export default Sponsorship;
