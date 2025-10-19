"use client";
import { useState } from "react";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function MembershipSection() {
    const { t } = useTranslation();
    const [billing, setBilling] = useState("monthly");
    const [activeTooltip, setActiveTooltip] = useState(null);

    const tiers = [
        {
            name: t("pricing.tiers.free.name") || "Free",
            priceMonthly: 0,
            priceYearly: 0,
            benefits: [
                t("pricing.tiers.free.benefits.0") || "Access to limited courses",
                t("pricing.tiers.free.benefits.1") || "Community support"
            ],
            tooltip: t("pricing.tiers.free.tooltip") || "Free tier with basic access",
            color: "bg-gray-100",
        },
        {
            name: t("pricing.tiers.premium.name") || "Premium",
            priceMonthly: 29,
            priceYearly: 299,
            benefits: [
                t("pricing.tiers.premium.benefits.0") || "All courses access",
                t("pricing.tiers.premium.benefits.1") || "Certificate of completion",
                t("pricing.tiers.premium.benefits.2") || "Priority support"
            ],
            tooltip: t("pricing.tiers.premium.tooltip") || "Best for individual learners",
            color: "bg-white",
        },
        {
            name: t("pricing.tiers.institutional.name") || "Institutional",
            priceMonthly: 99,
            priceYearly: 999,
            benefits: [
                t("pricing.tiers.institutional.benefits.0") || "Multiple users",
                t("pricing.tiers.institutional.benefits.1") || "Analytics dashboard",
                t("pricing.tiers.institutional.benefits.2") || "Dedicated support"
            ],
            tooltip: t("pricing.tiers.institutional.tooltip") || "For schools, companies, or universities",
            color: "bg-[var(--color-primary)] text-white",
        },
    ];

    const handleTooltipToggle = (index) => {
        setActiveTooltip(activeTooltip === index ? null : index);
    };

    return (
        <section className="py-16 bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[var(--color-text)] mb-4">
                        {t("pricing.title") || "Choose Your Membership"}
                    </h2>
                    <p className="text-[var(--color-text)]/80 text-lg">
                        {t("pricing.description") || "Select the plan that fits you best. Monthly or yearly options available."}
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="flex bg-[var(--color-background)] border-2 border-[var(--color-primary)] rounded-full p-1 text-sm font-medium">
                        <button
                            onClick={() => setBilling("monthly")}
                            className={`px-6 py-2 rounded-full transition-colors ${billing === "monthly" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text)]"
                                }`}
                        >
                            {t("pricing.monthly") || "Monthly"}
                        </button>
                        <button
                            onClick={() => setBilling("yearly")}
                            className={`px-6 py-2 rounded-full transition-colors ${billing === "yearly" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text)]"
                                }`}
                        >
                            {t("pricing.yearly") || "Yearly"}
                        </button>
                    </div>
                </div>

                {/* Membership Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <div
                            key={tier.name}
                            className={`relative rounded-2xl shadow-lg p-8 flex flex-col ${tier.color} transition-transform hover:scale-105`}
                        >
                            {/* Tooltip with better icon */}
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={() => handleTooltipToggle(index)}
                                    onMouseEnter={() => setActiveTooltip(index)}
                                    onMouseLeave={() => setActiveTooltip(null)}
                                    className={`p-1 rounded-full transition-colors ${
                                        tier.name === t("pricing.tiers.institutional.name") 
                                            ? "text-white hover:bg-white/20" 
                                            : "text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
                                    }`}
                                >
                                    <FaInfoCircle size={16} />
                                </button>
                                
                                {/* Tooltip Content */}
                                {activeTooltip === index && (
                                    <div className="absolute right-0 top-8 w-48 bg-white border border-[var(--color-primary)] text-[var(--color-text)] text-sm p-3 rounded-lg shadow-lg z-50">
                                        <div className="font-medium mb-1">Plan Details</div>
                                        <div className="text-gray-600">{tier.tooltip}</div>
                                        {/* Tooltip arrow */}
                                        <div className="absolute -top-1 right-3 w-2 h-2 bg-white border-l border-t border-[var(--color-primary)] transform rotate-45"></div>
                                    </div>
                                )}
                            </div>

                            <h3 className={`text-2xl font-bold mb-4 ${tier.name === t("pricing.tiers.institutional.name") ? "text-white" : "text-[var(--color-secondary)]"}`}>
                                {tier.name}
                            </h3>

                            <p className={`text-3xl font-bold mb-6 ${tier.name === t("pricing.tiers.institutional.name") ? "text-white" : "text-[var(--color-primary)]"}`}>
                                ${billing === "monthly" ? tier.priceMonthly : tier.priceYearly}
                                <span className="text-sm font-normal">
                                    /{billing === "monthly" ? t("pricing.perMonth") || "mo" : t("pricing.perYear") || "yr"}
                                </span>
                            </p>

                            <ul className={`flex-1 mb-6 space-y-2 ${tier.name === t("pricing.tiers.institutional.name") ? "text-white/90" : "text-[var(--color-text)]/80"}`}>
                                {tier.benefits.map((benefit, benefitIndex) => (
                                    <li key={benefitIndex} className="flex items-center gap-2">
                                        <FaCheck className={`${tier.name === t("pricing.tiers.institutional.name") ? "text-white" : "text-[var(--color-accent)]"}`} />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`mt-auto px-6 py-3 rounded-full font-semibold transition-colors ${tier.name === t("pricing.tiers.institutional.name")
                                        ? "bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] hover:text-white"
                                        : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
                                    }`}
                            >
                                {t("pricing.selectButton") || "Select"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}