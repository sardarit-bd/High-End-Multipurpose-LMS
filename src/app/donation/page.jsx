"use client";

import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/modules/headers/Navbar'
import React from 'react'
import { FaCheck, FaCrown, FaGem, FaGraduationCap, FaHandHoldingUsd, FaHeart, FaLock, FaRocket, FaStar } from 'react-icons/fa';

const Donation = () => {
  const [selectedFund, setSelectedFund] = useState('sdg-projects');
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

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

  const totalDonations = 287500; // Updated to USD
  const donorsCount = 456; // Updated count

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <Head>
          <title>Support SDG Initiatives - Make a Donation</title>
          <meta name="description" content="Contribute to Sustainable Development Goals projects, student funds, and educational initiatives" />
        </Head>

        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-emerald-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl">
                    <FaHeart className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <FaStar className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                Make an Impact
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Your generosity fuels sustainable change. Choose your cause and create lasting impact today.
              </p>
              
              {/* Impact Stats */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
                  <div className="text-3xl font-bold text-emerald-300">${(totalDonations/1000).toFixed(0)}K+</div>
                  <div className="text-sm text-blue-200">Total Impact</div>
                </div>
                <div className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
                  <div className="text-3xl font-bold text-blue-300">{donorsCount}+</div>
                  <div className="text-sm text-blue-200">Changemakers</div>
                </div>
                <div className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
                  <div className="text-3xl font-bold text-purple-300">17</div>
                  <div className="text-sm text-blue-200">SDG Goals</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fund Selection Sidebar */}
            <div className="lg:col-span-1 space-y-6">
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
                            ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-blue-50 shadow-xl scale-105'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                        } ${isHovered === fund.id ? 'scale-102' : ''}`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-14 h-14 bg-gradient-to-r ${fund.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`font-bold text-lg ${fund.textColor}`}>{fund.title}</h3>
                              {selectedFund === fund.id && (
                                <FaCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{fund.description}</p>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-md border-1 border-green-300">
                                {fund.badge}
                              </span>
                              <span className="text-xs font-medium text-gray-700">{fund.impact}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white text-center">
                {/* <FaShieldHeart className="w-8 h-8 mx-auto mb-3 text-white opacity-90" /> */}
                <h3 className="font-bold text-lg mb-2">100% Secure</h3>
                {/* <p className="text-sm text-blue-100 opacity-90">Bank-level encryption & transparent fund allocation</p> */}
              </div>
            </div>

            {/* Donation Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Selected Fund Header */}
                <div className={`bg-gradient-to-r ${selectedFundData?.color} p-8 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      {selectedFundData && <selectedFundData.icon className="w-8 h-8" />}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2">{selectedFundData?.title}</h2>
                      <p className="text-blue-100 text-lg opacity-95">{selectedFundData?.description}</p>
                    </div>
                    <div className="hidden sm:block">
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="font-semibold text-white">Recommended</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donation Form */}
                <form onSubmit={handleDonation} className="p-8">
                  {/* Amount Selection */}
                  <div className="mb-8">
                    <label className="block text-2xl font-bold text-gray-900 mb-6 items-center">
                      <FaCrown className="w-6 h-6 text-yellow-500 mr-3" />
                      Select Donation Amount
                    </label>
                    
                    {/* Quick Amount Options */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                      {donationOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleAmountSelect(option.value)}
                          className={`relative p-4 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                            donationAmount === option.value && !customAmount
                              ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-bold shadow-lg'
                              : 'border-gray-200 text-gray-700 hover:border-emerald-300 hover:shadow-md'
                          }`}
                        >
                          {option.popular && (
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                                POPULAR
                              </span>
                            </div>
                          )}
                          <div className="text-lg font-semibold">{option.label}</div>
                          {option.popular && (
                            <div className="text-xs text-gray-500 mt-1">Most Chosen</div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="mt-6">
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Or enter custom amount ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-bold">$</span>
                        <input
                          type="number"
                          value={customAmount}
                          onChange={handleCustomAmount}
                          placeholder="Enter amount"
                          className="w-full pl-10 pr-4 py-4 border-1 outline-none border-gray-200 rounded-2xl placeholder-gray-400 focus:text-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-lg font-semibold"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fund Impact Examples */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-blue-100">
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                      <FaRocket className="w-5 h-5 text-emerald-500 mr-2" />
                      Your Impact Breakdown
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedFundData?.examples.map((example, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700 font-medium">{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Security */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
                    <div className="flex items-center space-x-3 text-emerald-800 mb-3">
                      <FaLock className="w-6 h-6 text-emerald-600" />
                      <span className="font-bold text-lg">Bank-Level Security</span>
                    </div>
                    <p className="text-emerald-700 text-sm">
                      Your donation is protected with 256-bit SSL encryption. We partner with trusted payment 
                      processors to ensure your financial information remains completely secure.
                    </p>
                  </div>

                  {/* Donate Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !donationAmount || donationAmount === '0'}
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-lg">Processing Your Generosity...</span>
                      </>
                    ) : (
                      <>
                        <FaHandHoldingUsd className="w-6 h-6" />
                        <span>Donate ${donationAmount}</span>
                      </>
                    )}
                  </button>

                  {/* Trust Badges */}
                  <div className="mt-8 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-gray-500 text-sm">
                      {/* SSL Secure Badge */}
                      <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 sm:px-4 sm:py-2 rounded-full w-fit shadow-sm">
                        <FaLock className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                        <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">SSL Secure</span>
                      </div>
                      
                      {/* Tax Deductible Badge */}
                      <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 sm:px-4 sm:py-2 rounded-full w-fit shadow-sm">
                        <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                        <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">Tax Deductible</span>
                      </div>
                      
                      {/* Verified Badge - Alternative Icon */}
                      <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 sm:px-4 sm:py-2 rounded-full w-fit shadow-sm">
                        <FaHeart className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                        <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">Verified</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Additional Info */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Donation