"use client";

import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/apiClient";
import React, { useState } from "react";
import { FaCheck, FaCrown, FaHandHoldingUsd, FaHeart, FaLock, FaRocket, FaCreditCard, FaBuilding, FaGlobe, FaMoneyBillWave } from "react-icons/fa";
import { toast } from "react-toastify";

const DonationForm = ({
  donationOptions,
  donationAmount,
  customAmount,
  handleAmountSelect,
  handleCustomAmount,
  handleDonation,
  isLoading,
  selectedFundData,
  loading = false
}) => {
  const { user } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState("stripe");

  // Payment providers
  const paymentProviders = [
    { id: "stripe", name: "Stripe", icon: FaCreditCard, description: "Credit/Debit Cards" },
    { id: "toyyibpay", name: "ToyyibPay", icon: FaBuilding, description: "Malaysian Payments" },
    { id: "paypal", name: "PayPal", icon: FaGlobe, description: "International" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    console.log(user)
    if (!user) {
      toast.error("Please login to make a donation");
      return;
    }

    // Validate amount
    if (!donationAmount || donationAmount === "0" || parseInt(donationAmount) < 1) {
      toast.error("Please select or enter a valid donation amount");
      return;
    }

    try {
      // Prepare donation data
      const donationData = {
        fund: selectedFundData.id,
        amount: parseFloat(donationAmount),
        provider: selectedProvider,
        currency: "USD"
      };

      console.log("Processing donation:", donationData);


      const res = await api.post('orders/donation-checkout', donationData)
      const { checkoutUrl } = res?.data?.data

      if (checkoutUrl) {
        window.location.href = checkoutUrl
      }


    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Error processing donation. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 animate-pulse">
        {/* Amount Selection Skeleton */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-6 h-6 bg-gray-300 rounded mr-3"></div>
            <div className="h-6 bg-gray-300 rounded w-48"></div>
          </div>

          {/* Quick Amount Options Skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="p-4 rounded-2xl border-2 border-gray-200 bg-gray-50">
                <div className="h-6 bg-gray-300 rounded w-12 mx-auto"></div>
              </div>
            ))}
          </div>

          {/* Custom Amount Skeleton */}
          <div className="mt-6">
            <div className="h-6 bg-gray-300 rounded w-48 mb-3"></div>
            <div className="h-12 bg-gray-300 rounded-2xl w-full"></div>
          </div>
        </div>

        {/* Impact Examples Skeleton */}
        <div className="mb-8 p-6 bg-gray-100 rounded-2xl border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-5 h-5 bg-gray-400 rounded mr-2"></div>
            <div className="h-6 bg-gray-400 rounded w-40"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div className="h-4 bg-gray-400 rounded w-32"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Info Skeleton */}
        <div className="mb-8 p-6 bg-gray-100 rounded-2xl border border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
            <div className="h-6 bg-gray-400 rounded w-40"></div>
          </div>
          <div className="h-4 bg-gray-400 rounded w-full"></div>
        </div>

        {/* Donate Button Skeleton */}
        <div className="h-16 bg-gray-300 rounded-2xl w-full mb-8"></div>

        {/* Trust Badges Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-8 bg-gray-300 rounded-full w-24"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8">
      {/* Amount Selection */}
      <div className="mb-8">
        <label className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
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
              className={`relative p-4 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${donationAmount === option.value && !customAmount
                  ? "border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-bold shadow-lg"
                  : "border-gray-200 text-gray-700 hover:border-emerald-300 hover:shadow-md"
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
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-bold">
              $
            </span>
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

      {/* Payment Provider Selection */}
      <div className="mb-8">
        <label className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FaCreditCard className="w-5 h-5 text-blue-500 mr-2" />
          Select Payment Method
        </label>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {paymentProviders.map((provider) => {
            const ProviderIcon = provider.icon;
            return (
              <button
                key={provider.id}
                type="button"
                onClick={() => setSelectedProvider(provider.id)}
                className={`relative p-3 rounded-xl border-2 text-center transition-all duration-200 ${selectedProvider === provider.id
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
              >
                <ProviderIcon className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">{provider.name}</div>
                <div className="text-xs text-gray-500 mt-1">{provider.description}</div>
                {selectedProvider === provider.id && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                    <FaCheck className="w-2 h-2 text-white" />
                  </div>
                )}
              </button>
            );
          })}
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
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200"
            >
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
          Your donation is protected with 256-bit SSL encryption. We partner
          with trusted payment processors to ensure your financial information
          remains completely secure.
        </p>
        <div className="mt-3 text-sm text-emerald-600 font-medium">
          Selected: {paymentProviders.find(p => p.id === selectedProvider)?.name}
        </div>
      </div>

      {/* Donate Button */}
      <button
        type="submit"
        disabled={!user || !donationAmount || donationAmount === "0"}
        className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 shadow-lg"
      >
        {!user ? (
          <>
            <FaLock className="w-6 h-6" />
            <span>Please Login to Donate</span>
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
            <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">
              SSL Secure
            </span>
          </div>

          {/* Tax Deductible Badge */}
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 sm:px-4 sm:py-2 rounded-full w-fit shadow-sm">
            <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
            <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">
              Tax Deductible
            </span>
          </div>

          {/* Verified Badge */}
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 sm:px-4 sm:py-2 rounded-full w-fit shadow-sm">
            <FaHeart className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
            <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">
              Verified
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DonationForm;