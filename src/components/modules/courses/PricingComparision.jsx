"use client";
import { FaCheck, FaTimes } from "react-icons/fa";

const plans = ["Free", "Premium", "Institutional"];

const features = [
    { name: "Separate business/personal", values: [true, true, true] },
    { name: "Track deductible mileage", values: [true, true, true] },
    { name: "Download online banking", values: [true, true, true] },
    { name: "Multi-device", values: [false, true, true] },
    { name: "Create invoices & estimates", values: [false, true, true] },
    { name: "Manage VAT", values: [false, true, true] },
    { name: "Manage bills & payments", values: [false, false, true] },
    { name: "Multiple currencies", values: [false, false, true] },
    { name: "Create budgets", values: [false, false, true] },
    { name: "Track time", values: [false, false, true] },
];

export default function PricingComparison() {
    return (
        <section className="py-16 bg-white text-[var(--color-text)]">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[var(--color-secondary)] mb-4">
                        Compare Our Plans
                    </h2>
                    <p className="text-[var(--color-text)]/80 text-lg max-w-2xl mx-auto">
                        Find the plan that suits your needs. Compare features across
                        Basic, Team, and Pro tiers.
                    </p>
                </div>

                {/* Responsive Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-[var(--radius-card)] overflow-hidden">
                        <thead>
                            <tr className="bg-[var(--color-secondary)] text-white text-left">
                                <th className="p-4 text-sm font-semibold">Features</th>
                                {plans.map((plan) => (
                                    <th key={plan} className="p-4 text-center text-sm font-semibold">
                                        {plan}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, i) => (
                                <tr
                                    key={feature.name}
                                    className={`border-t ${i % 2 === 0 ? "bg-[var(--color-background)]/60" : "bg-white"
                                        }`}
                                >
                                    <td className="p-4 text-sm font-medium">{feature.name}</td>
                                    {feature.values.map((val, idx) => (
                                        <td key={idx} className="p-4 text-center">
                                            {val ? (
                                                <FaCheck className="text-[var(--color-primary)] mx-auto" />
                                            ) : (
                                                <FaTimes className="text-red-500 mx-auto" />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
