"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/modules/headers/Navbar';
import {
  FaRocket,
  FaGraduationCap,
  FaHandHoldingUsd
} from 'react-icons/fa';
import DonationHeaderSection from '@/components/modules/donation/DonationHeaderSection';
import FundSelectionSidebar from '@/components/modules/donation/FundSelectionSidebar';
import SelectedFundHeader from '@/components/modules/donation/SelectedFundHeader';
import DonationForm from '@/components/modules/donation/DonationForm';
import DonationInfo from '@/components/modules/donation/DonationInfo';
import DonationSkeleton from '@/components/modules/donation/DonationSkeleton';
import { useTranslation } from 'react-i18next';

const Donation = () => {
  const { t } = useTranslation();

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
      title: t("donation.sdgTitle"),
      description: t("donation.sdgDesc"),
      icon: FaRocket,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600',
      badge: t("donation.sdgBadge"),
      examples: [
        t("donation.sdgExample1"),
        t("donation.sdgExample2"),
        t("donation.sdgExample3"),
        t("donation.sdgExample4")
      ],
      impact: t("donation.sdgImpact")
    },
    {
      id: 'student-fund',
      title: t("donation.studentTitle"),
      description: t("donation.studentDesc"),
      icon: FaGraduationCap,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600',
      badge: t("donation.studentBadge"),
      examples: [
        t("donation.studentExample1"),
        t("donation.studentExample2"),
        t("donation.studentExample3"),
        t("donation.studentExample4")
      ],
      impact: t("donation.studentImpact")
    },
    {
      id: 'edufest-impact',
      title: t("donation.eduTitle"),
      description: t("donation.eduDesc"),
      icon: FaHandHoldingUsd,
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-600',
      badge: t("donation.eduBadge"),
      examples: [
        t("donation.eduExample1"),
        t("donation.eduExample2"),
        t("donation.eduExample3"),
        t("donation.eduExample4")
      ],
      impact: t("donation.eduImpact")
    }
  ];

  useEffect(() => {
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
    if (value) setDonationAmount(value);
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    if (!donationAmount || donationAmount === '0') {
      alert(t("donation.alertSelectAmount"));
      return;
    }

    setIsLoading(true);
    try {
      const paymentData = { fund: selectedFund, amount: donationAmount };
      console.log('Processing donation:', paymentData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(t("donation.redirectMessage", { amount: donationAmount }));
    } catch (error) {
      console.error('Donation error:', error);
      alert(t("donation.errorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  const totalDonations = 287500;
  const donorsCount = 456;

  if (pageLoading) return <DonationSkeleton />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <Head>
          <title>{t("donation.pageTitle")}</title>
          <meta name="description" content={t("donation.pageDesc")} />
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
                <SelectedFundHeader selectedFundData={selectedFundData} />

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

              {/* Info */}
              <DonationInfo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donation;
