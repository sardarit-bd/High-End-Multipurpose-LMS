"use client";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const tiers = [
    {
        name: "Free",
        priceMonthly: 0,
        priceYearly: 0,
        benefits: ["Access to limited courses", "Community support"],
        tooltip: "Free tier with basic access",
        color: "bg-gray-100",
    },
    {
        name: "Premium",
        priceMonthly: 29,
        priceYearly: 299,
        benefits: ["All courses access", "Certificate of completion", "Priority support"],
        tooltip: "Best for individual learners",
        color: "bg-white",
    },
    {
        name: "Institutional",
        priceMonthly: 99,
        priceYearly: 999,
        benefits: ["Multiple users", "Analytics dashboard", "Dedicated support"],
        tooltip: "For schools, companies, or universities",
        color: "bg-[var(--color-primary)] text-white",
    },
];

export default function MembershipSection() {
    const [billing, setBilling] = useState("monthly");

    return (
        <section className="py-16 bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[var(--color-text)] mb-4">Choose Your Membership</h2>
                    <p className="text-[var(--color-text)]/80 text-lg">
                        Select the plan that fits you best. Monthly or yearly options available.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="flex bg-[var(--color-background)] rounded-full p-1 text-sm font-medium">
                        <button
                            onClick={() => setBilling("monthly")}
                            className={`px-6 py-2 rounded-full transition-colors ${billing === "monthly" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text)]"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBilling("yearly")}
                            className={`px-6 py-2 rounded-full transition-colors ${billing === "yearly" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text)]"
                                }`}
                        >
                            Yearly
                        </button>
                    </div>
                </div>

                {/* Membership Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative rounded-2xl shadow-lg p-8 flex flex-col ${tier.color} transition-transform hover:scale-105`}
                        >
                            {/* Tooltip */}
                            <div className="absolute top-4 right-4 group">
                                <span className="cursor-pointer text-[var(--color-primary)] font-bold">i</span>
                                <div className="absolute right-0 mt-2 w-48 bg-[var(--color-background)] border border-[var(--color-primary)] text-[var(--color-text)] text-sm p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-50">
                                    {tier.tooltip}
                                </div>
                            </div>

                            <h3 className={`text-2xl font-bold mb-4 ${tier.name === "Institutional" ? "text-white" : "text-[var(--color-secondary)]"}`}>
                                {tier.name}
                            </h3>

                            <p className={`text-3xl font-bold mb-6 ${tier.name === "Institutional" ? "text-white" : "text-[var(--color-primary)]"}`}>
                                ${billing === "monthly" ? tier.priceMonthly : tier.priceYearly}
                                <span className="text-sm font-normal">/{billing === "monthly" ? "mo" : "yr"}</span>
                            </p>

                            <ul className={`flex-1 mb-6 space-y-2 ${tier.name === "Institutional" ? "text-white/90" : "text-[var(--color-text)]/80"}`}>
                                {tier.benefits.map((benefit) => (
                                    <li key={benefit} className="flex items-center gap-2">
                                        <FaCheck className={`text-[var(--color-accent)]`} />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`mt-auto px-6 py-3 rounded-full font-semibold transition-colors ${tier.name === "Institutional"
                                        ? "bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] hover:text-white"
                                        : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
                                    }`}
                            >
                                Select
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
