"use client";
import { BarChart3, BookOpen, DollarSign, Users, UserCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Students", value: "1,250", icon: Users, color: "bg-emerald-100 text-emerald-700" },
    { title: "Total Instructors", value: "85", icon: UserCheck, color: "bg-blue-100 text-blue-700" },
    { title: "Total Courses", value: "320", icon: BookOpen, color: "bg-yellow-100 text-yellow-700" },
    { title: "Revenue", value: "$42,500", icon: DollarSign, color: "bg-emerald-100 text-emerald-700" },
    { title: "Pending Approvals", value: "12", icon: Clock, color: "bg-red-100 text-red-700" },
    { title: "Reports", value: "37", icon: BarChart3, color: "bg-indigo-100 text-indigo-700" },
  ];

  const recentActivity = [
    { id: 1, action: "New course approval pending", user: "Jane Doe", time: "2 hrs ago" },
    { id: 2, action: "Student registered", user: "Michael Smith", time: "5 hrs ago" },
    { id: 3, action: "Payment received", user: "Sarah Lee", time: "1 day ago" },
    { id: 4, action: "Instructor added", user: "David Brown", time: "2 days ago" },
  ];

  return (
    <div className="p-6 space-y-8 text-[var(--color-text)]">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[--color-text]">Admin Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="rounded-[--radius-card] shadow-md hover:shadow-lg transition bg-white">
              <div className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="text-xl font-bold text-[--color-text]">{stat.value}</h3>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placeholder for Graph */}
        <div className="rounded-[--radius-card] shadow-md bg-white p-6">
          <h2 className="text-lg font-semibold text-[--color-text] mb-4">Revenue Growth</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart Component Here
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-[--radius-card] shadow-md bg-white p-6">
          <h2 className="text-lg font-semibold text-[--color-text] mb-4">Recent Activity</h2>
          <ul className="divide-y divide-gray-100">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-[--color-text]">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
