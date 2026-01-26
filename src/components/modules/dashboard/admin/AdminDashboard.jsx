"use client";
import { BookOpen, DollarSign, Users, UserCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAdminStats } from "@/hooks/useDashboard";


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AdminDashboard() {
  const { data: statsData, isLoading, error } = useAdminStats();


  if (isLoading) {
    return (
      <section className="p-6">
        <h1 className="text-2xl font-bold text-[--color-text] mb-6">Admin Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="rounded-[--radius-card] shadow-md bg-white p-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-6">
        <h1 className="text-2xl font-bold text-[--color-text]">Admin Dashboard Overview</h1>
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-[--radius-card]">
          Error loading dashboard data
        </div>
      </section>
    );
  }


  // Format month data for chart
  const chartData = statsData?.data?.publishedCoursesByMonth?.map(item => ({
    month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
    courses: item.count
  })) || [];

  const stats = [
    { title: "Total Students", value: statsData?.data?.totalStudents || "0", icon: Users, color: "bg-emerald-100 text-emerald-700" },
    { title: "Total Instructors", value: statsData?.data?.totalInstructors || "0", icon: UserCheck, color: "bg-blue-100 text-blue-700" },
    { title: "Total Courses", value: statsData?.data?.totalCourses || "0", icon: BookOpen, color: "bg-yellow-100 text-yellow-700" },
    // { title: "Revenue", value: `$${statsData?.data?.totalRevenue || "0"}`, icon: DollarSign, color: "bg-emerald-100 text-emerald-700" },
    // { title: "Pending Courses", value: statsData?.data?.pendingCourses || "0", icon: Clock, color: "bg-red-100 text-red-700" },
  ];

  const recentActivity = [
    { id: 1, action: "New course approval pending", user: "Jane Doe", time: "2 hrs ago" },
    { id: 2, action: "Student registered", user: "Michael Smith", time: "5 hrs ago" },
    { id: 3, action: "Payment received", user: "Sarah Lee", time: "1 day ago" },
    { id: 4, action: "Instructor added", user: "David Brown", time: "2 days ago" },
  ];

  return (
    <section className="p-6 space-y-8 text-[var(--color-text)]">
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
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Graph */}
        <div className="rounded-[--radius-card] shadow-md bg-white p-6">
          <h2 className="text-lg font-semibold text-[--color-text] mb-4">Published Courses by Month</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="courses" fill="#189E74" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        {/* <div className="rounded-[--radius-card] shadow-md bg-white p-6">
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
        </div> */}
      </div>
    </section>
  );
}