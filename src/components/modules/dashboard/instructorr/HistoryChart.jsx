"use client";;
import { useState } from "react";
import React from 'react'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
const chartData = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 180 },
  { name: "Mar", value: 90 },
  { name: "Apr", value: 150 },
  { name: "May", value: 200 },
  { name: "Jun", value: 270 },
  { name: "Jul", value: 190 },
  { name: "Aug", value: 160 },
  { name: "Sep", value: 220 },
  { name: "Oct", value: 180 },
  { name: "Nov", value: 210 },
  { name: "Dec", value: 190 },
];
export default function HistoryChart() {
      const [activeTab, setActiveTab] = useState("Viewership");
    return (
        <div className="bg-white rounded-[var(--radius-card)] shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    {["Viewership", "Subscribers", "Earning"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`font-medium ${activeTab === tab
                                    ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                                    : "text-gray-400"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <span className="text-sm font-semibold">1,113 hours</span>
            </div>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#ccc" />
                        <Tooltip />
                        <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
