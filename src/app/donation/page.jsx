"use client";

import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/modules/headers/Navbar'
import React from 'react'
import { FaCheck, FaCrown, FaGem, FaGraduationCap, FaHandHoldingUsd, FaHeart, FaLock, FaRocket, FaStar } from 'react-icons/fa';
import DonationHeaderSection from '@/components/modules/donation/DonationHeaderSection';
import FundSelectionSidebar from '@/components/modules/donation/FundSelectionSidebar';
import SelectedFundHeader from '@/components/modules/donation/SelectedFundHeader';
import DonationForm from '@/components/modules/donation/DonationForm';
import DonationInfo from '@/components/modules/donation/DonationInfo';
import DonationSkeleton from '@/components/modules/donation/DonationSkeleton';

const Donation = () => {
  const [selectedFund, setSelectedFund] = useState('sdg-projects');
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  const donationOptions = [
    { value: '50', label: '$50', popular: false },
    { value: '100', label: '$100', popular: true },
    { value: '250', label: '$250', popular: false },
    { value: '500', label: '$500', popular: false },
    { value: '1000', label: '$1000', popular: false },
  ];

  const funds = [
    {
      id: 'sdg-projects',
      title: 'Support SDG Projects',
      description: 'Fund innovative projects that address the 17 Sustainable Development Goals in our community',
      icon: FaRocket,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600',
      badge: 'Most Popular',
      examples: [
        'Clean water initiatives',
        'Renewable energy projects',
        'Environmental conservation',
        'Community development'
      ],
      impact: 'Supports 3-5 community projects'
    },
    {
      id: 'student-fund',
      title: 'Student Fund',
      description: 'Provide scholarships and financial aid to deserving students pursuing SDG-related studies',
      icon: FaGraduationCap,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600',
      badge: 'Education Focus',
      examples: [
        'Tuition fee assistance',
        'Research grants',
        'Internship opportunities',
        'Educational materials'
      ],
      impact: 'Supports 2-3 students annually'
    },
    {
      id: 'edufest-impact',
      title: 'Edufest Impact Fund',
      description: 'Support our annual education festival that promotes SDG awareness and youth engagement',
      icon: FaHandHoldingUsd,
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-600',
      badge: 'Event Support',
      examples: [
        'Event organization',
        'Speaker invitations',
        'Workshop materials',
        'Youth participation support'
      ],
      impact: 'Reaches 500+ participants'
    }
  ];

  // Simulate page loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const selectedFundData = funds.find(fund => fund.id === selectedFund);

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setDonationAmount(value);
    }
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    if (!donationAmount || donationAmount === '0') {
      alert('Please select or enter a donation amount');
      return;
    }

    setIsLoading(true);

    try {
      const paymentData = {
        fund: selectedFund,
        amount: donationAmount,
        customAmount: customAmount
      };

      console.log('Processing donation:', paymentData);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Redirecting to payment gateway with amount: $${donationAmount}`);
      
    } catch (error) {
      console.error('Donation error:', error);
      alert('Error processing donation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const totalDonations = 287500;
  const donorsCount = 456;

  if (pageLoading) {
    return <DonationSkeleton />;
  }

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <Head>
          <title>Support SDG Initiatives - Make a Donation</title>
          <meta name="description" content="Contribute to Sustainable Development Goals projects, student funds, and educational initiatives" />
        </Head>

        {/* Header Section */}
        <DonationHeaderSection
          totalDonations={totalDonations}
          donorsCount={donorsCount}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 py-16 -mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fund Selection Sidebar */}
            <FundSelectionSidebar
              selectedFund={selectedFund}
              setSelectedFund={setSelectedFund}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
              funds={funds}
            />

            {/* Donation Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Selected Fund Header */}
                <SelectedFundHeader
                  selectedFundData={selectedFundData}
                />

                {/* Donation Form */}
                <DonationForm
                  donationOptions={donationOptions}
                  donationAmount={donationAmount}
                  customAmount={customAmount}
                  handleAmountSelect={handleAmountSelect}
                  handleCustomAmount={handleCustomAmount}
                  handleDonation={handleDonation}
                  isLoading={isLoading}
                  selectedFundData={selectedFundData}
                />
              </div>

              {/* Additional Info */}
              <DonationInfo/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Donation