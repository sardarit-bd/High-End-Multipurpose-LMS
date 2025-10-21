"use client";

import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/modules/headers/Navbar';
import { FaAward, FaChartLine, FaCheck, FaCrown, FaGem, FaGlobe, FaHandshake, FaLightbulb, FaMedal, FaRocket, FaStar, FaTrophy, FaUsers } from 'react-icons/fa';
import SponsorShipCard from '@/components/modules/sponsorship/sponsorShipCard';
import PartnershipOpportunities from '@/components/modules/sponsorship/PartnershipOpportunities';

import Footer from '@/components/modules/footers/Footer';
import SponsorHeroSection from '@/components/modules/sponsorship/SponsorHeroSection';


const Sponsorship = () => {
  const [activeTab, setActiveTab] = useState('corporate');
  const [selectedPackage, setSelectedPackage] = useState('gold');
  const [isHovered, setIsHovered] = useState(null);

  const sponsorshipTypes = [
    {
      id: 'corporate',
      title: 'Corporate Sponsorships',
      description: 'Strategic partnerships with businesses and corporations',
      icon: FaChartLine,
      color: 'from-blue-500 to-cyan-500',
      features: ['Brand visibility', 'Employee engagement', 'CSR initiatives', 'Networking opportunities']
    },
    {
      id: 'institutional',
      title: 'Institutional Partnerships',
      description: 'Collaborations with educational and research institutions',
      icon: FaUsers,
      color: 'from-purple-500 to-pink-500',
      features: ['Research collaboration', 'Student programs', 'Knowledge sharing', 'Academic partnerships']
    },
    {
      id: 'community',
      title: 'Community Partners',
      description: 'Engagement with local communities and organizations',
      icon: FaHandshake,
      color: 'from-green-500 to-emerald-500',
      features: ['Local impact', 'Community outreach', 'Grassroots initiatives', 'Social development']
    }
  ];

  const packages = [
    {
      id: 'bronze',
      name: 'Bronze',
      price: '$1,000',
      duration: '/year',
      icon: 'FaMedal',
      color: 'from-amber-600 to-amber-700',
      badge: 'Starter',
      popular: false,
      features: [
        'Logo on website',
        'Social media mention',
        'Event program listing',
        'Quarterly newsletter feature'
      ],
      benefits: [
        'Basic brand visibility',
        'Digital recognition',
        'Community engagement'
      ]
    },
    {
      id: 'silver',
      name: 'Silver',
      price: '$2,500',
      duration: '/year',
      icon: 'FaGem',
      color: 'from-gray-400 to-gray-600',
      badge: 'Growth',
      popular: false,
      features: [
        'All Bronze benefits',
        'Featured blog post',
        'Event booth space',
        'Press release inclusion',
        'Newsletter dedicated section'
      ],
      benefits: [
        'Enhanced visibility',
        'Content marketing',
        'Direct audience access'
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      price: '$5,000',
      duration: '/year',
      icon: 'FaStar',
      color: 'from-yellow-500 to-amber-500',
      badge: 'Popular',
      popular: true,
      features: [
        'All Silver benefits',
        'Keynote speaking opportunity',
        'Premium logo placement',
        'Dedicated social media campaign',
        'VIP event invitations',
        'Annual impact report'
      ],
      benefits: [
        'Thought leadership',
        'Premium positioning',
        'Exclusive networking'
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: '$10,000',
      duration: '/year',
      icon: 'FaCrown',
      color: 'from-purple-500 to-indigo-600',
      badge: 'Elite',
      popular: false,
      features: [
        'All Gold benefits',
        'Title sponsorship rights',
        'Exclusive workshop hosting',
        'Customized partnership program',
        'Executive advisory role',
        'Media coverage guarantee',
        'Dedicated account manager'
      ],
      benefits: [
        'Industry leadership',
        'Maximum exposure',
        'Strategic influence'
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
          <title>Partnership Opportunities - Sponsor SDG Initiatives</title>
          <meta name="description" content="Explore corporate sponsorship packages and partnership opportunities for Sustainable Development Goals" />
        </Head>

        {/* Hero Section */}
        <SponsorHeroSection/>

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

      <Footer/>
    </>
  );
};

export default Sponsorship;
