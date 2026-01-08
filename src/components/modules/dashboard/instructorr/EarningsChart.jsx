"use client";;
import React from 'react'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEarningsChart } from "@/hooks/useDashboard";

export default function EarningsChart() {
    const { data: earningsData, isLoading } = useEarningsChart();

    if (isLoading) {
        return (
            <section className="bg-white rounded-[var(--radius-card)] shadow-sm p-4">
                <div className="flex items-center justify-center h-48">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
                </div>
            </section>
        );
    }

    const chartData = earningsData || [
        { name: "Jan", earnings: 0 },
        { name: "Feb", earnings: 0 },
        { name: "Mar", earnings: 0 },
        { name: "Apr", earnings: 0 },
        { name: "May", earnings: 0 },
        { name: "Jun", earnings: 0 },
        { name: "Jul", earnings: 0 },
        { name: "Aug", earnings: 0 },
        { name: "Sep", earnings: 0 },
        { name: "Oct", earnings: 0 },
        { name: "Nov", earnings: 0 },
        { name: "Dec", earnings: 0 },
    ];

    const totalEarnings = chartData.reduce((sum, item) => sum + (item.earnings || 0), 0);

    return (
        <section className="bg-white rounded-[var(--radius-card)] shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Earnings Overview</h3>
                <span className="text-sm font-semibold text-[var(--color-primary)]">
                    ₹{totalEarnings.toLocaleString()}
                </span>
            </div>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#ccc" />
                        <Tooltip
                            formatter={(value) => [`₹${value.toLocaleString()}`, 'Earnings']}
                            labelStyle={{ color: 'var(--color-text)' }}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '6px'
                            }}
                        />
                        <Bar dataKey="earnings" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
}