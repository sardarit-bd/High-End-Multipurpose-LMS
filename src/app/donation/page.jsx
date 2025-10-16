"use client";

import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/modules/headers/Navbar'
import React from 'react'
import { FaGraduationCap, FaHandHoldingUsd, FaHeart, FaLock, FaRocket } from 'react-icons/fa';

const Donation = () => {
     const [selectedFund, setSelectedFund] = useState('sdg-projects');
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const donationOptions = [
    { value: '50', label: 'RM 50' },
    { value: '100', label: 'RM 100' },
    { value: '200', label: 'RM 200' },
    { value: '500', label: 'RM 500' },
  ];

  const funds = [
    {
      id: 'sdg-projects',
      title: 'Support SDG Projects',
      description: 'Fund innovative projects that address the 17 Sustainable Development Goals in our community',
      icon: FaRocket,
      color: 'bg-green-500',
      examples: [
        'Clean water initiatives',
        'Renewable energy projects',
        'Environmental conservation',
        'Community development'
      ]
    },
    {
      id: 'student-fund',
      title: 'Student Fund',
      description: 'Provide scholarships and financial aid to deserving students pursuing SDG-related studies',
      icon: FaGraduationCap,
      color: 'bg-blue-500',
      examples: [
        'Tuition fee assistance',
        'Research grants',
        'Internship opportunities',
        'Educational materials'
      ]
    },
    {
      id: 'edufest-impact',
      title: 'Edufest Impact Fund',
      description: 'Support our annual education festival that promotes SDG awareness and youth engagement',
      icon: FaHandHoldingUsd,
      color: 'bg-purple-500',
      examples: [
        'Event organization',
        'Speaker invitations',
        'Workshop materials',
        'Youth participation support'
      ]
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

    // Payment gateway integration
    try {
      // ToyyibPay, Billplz, or Stripe integration ekhane hobe
      const paymentData = {
        fund: selectedFund,
        amount: donationAmount,
        customAmount: customAmount
      };

      console.log('Processing donation:', paymentData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to payment gateway
      // window.location.href = `your-payment-gateway-url?amount=${donationAmount}&fund=${selectedFund}`;
      
      alert(`Redirecting to payment gateway with amount: RM ${donationAmount}`);
      
    } catch (error) {
      console.error('Donation error:', error);
      alert('Error processing donation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const totalDonations = 125000; // Example total
  const donorsCount = 234; // Example count


  return (
    <>
    <Navbar/>
   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Head>
        <title>Support SDG Initiatives - Make a Donation</title>
        <meta name="description" content="Contribute to Sustainable Development Goals projects, student funds, and educational initiatives" />
      </Head>

      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <FaHeart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Support SDG Initiatives
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your donation creates lasting impact. Choose a fund and help us build a sustainable future together.
            </p>
            
            {/* Impact Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">RM {totalDonations.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Raised</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{donorsCount}+</div>
                <div className="text-sm text-gray-600">Generous Donors</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">17</div>
                <div className="text-sm text-gray-600">SDG Goals Supported</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fund Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Impact</h2>
              
              <div className="space-y-4">
                {funds.map((fund) => {
                  const IconComponent = fund.icon;
                  return (
                    <button
                      key={fund.id}
                      onClick={() => setSelectedFund(fund.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedFund === fund.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-12 h-12 ${fund.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{fund.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{fund.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Selected Fund Header */}
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    {selectedFundData && <selectedFundData.icon className="w-6 h-6" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedFundData?.title}</h2>
                    <p className="text-blue-100 opacity-90">{selectedFundData?.description}</p>
                  </div>
                </div>
              </div>

              {/* Donation Form */}
              <form onSubmit={handleDonation} className="p-6">
                {/* Amount Selection */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    Select Donation Amount
                  </label>
                  
                  {/* Quick Amount Options */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {donationOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleAmountSelect(option.value)}
                        className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                          donationAmount === option.value && !customAmount
                            ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or enter custom amount (RM)
                    </label>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={handleCustomAmount}
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      min="1"
                    />
                  </div>
                </div>

                {/* Fund Impact Examples */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Your Impact:</h3>
                  <ul className="space-y-2">
                    {selectedFundData?.examples.map((example, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Payment Security */}
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800 mb-2">
                    <FaLock className="w-4 h-4" />
                    <span className="font-semibold">Secure Payment</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your donation is processed securely through our trusted payment partners. 
                    All transactions are encrypted and protected.
                  </p>
                </div>

                {/* Donate Button */}
                <button
                  type="submit"
                  disabled={isLoading || !donationAmount || donationAmount === '0'}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FaHandHoldingUsd className="w-5 h-5" />
                      <span>Donate RM {donationAmount}</span>
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center space-x-6 text-gray-500 text-sm">
                    <div className="flex items-center space-x-1">
                      {/* <FaShield className="w-4 h-4" /> */}
                      <span>SSL Secure</span>
                    </div>
                    <div>•</div>
                    <div>Tax Deductible</div>
                    <div>•</div>
                    <div>100% Secure</div>
                  </div>
                </div>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Why Donate?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Support meaningful SDG projects</li>
                  <li>• Create educational opportunities</li>
                  <li>• Build sustainable communities</li>
                  <li>• Make lasting social impact</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Transparency Promise</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Regular impact reports</li>
                  <li>• Fund usage transparency</li>
                  <li>• Donor recognition</li>
                  <li>• Annual financial audits</li>
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