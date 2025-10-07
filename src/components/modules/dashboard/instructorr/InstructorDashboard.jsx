
"use client";

import { FiUsers, FiVideo, FiBookOpen, FiTrendingUp } from "react-icons/fi";
import StatCard from "./StatCard";
import CourseItem from "./CourseItem";
import TaskItem from "./TaskItem";
import DiscussionItem from "./DiscussionItem";
import { useAuth } from "@/hooks/useAuth";
import HistoryChart from "./HistoryChart";

export default function InstructorDashboard() {
  const user = useAuth();

  return (
    <div className="p-4 md:p-6 bg-white min-h-screen text-[var(--color-text)]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-sm text-[var(--color-secondary)] font-semibold">Hi {user.name},</h2>
        <h1 className="text-2xl md:text-3xl font-bold">Welcome to Asia LMS</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<FiBookOpen />} title="Live Courses" value="13" />
        <StatCard icon={<FiVideo />} title="Videos" value="276" />
        <StatCard icon={<FiUsers />} title="Students" value="321" />
        <StatCard
          icon={<FiTrendingUp />}
          title="Earning"
          value="₹540.50"
          accent
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Courses */}
          <div className="bg-white rounded-[var(--radius-card)] shadow-sm p-4">
            <h3 className="font-semibold text-lg mb-4">Top Course</h3>
            <div className="space-y-4">
              <CourseItem
                title="History of India"
                code="#31525"
                price="₹15324.50"
                subs="131 Subscribers"
              />
              <CourseItem
                title="Importance of Water"
                code="#26273"
                price="₹1887.50"
                subs="16 Subscribers"
              />
              <CourseItem
                title="Sun & Solar System"
                code="#27283"
                price="₹723.50"
                subs="4 Subscribers"
              />
            </div>
            <button className="text-[var(--color-primary)] mt-4 font-medium hover:underline">
              View all →
            </button>
          </div>

          {/* Viewership Chart */}
          <HistoryChart />
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <div className="bg-white rounded-[var(--radius-card)] shadow-sm p-4">
            <h3 className="font-semibold text-lg mb-4">Upcoming Tasks</h3>
            <TaskItem title="Environment Discuss" time="01:00 PM - 02:00 PM" />
            <TaskItem title="Fitness Training" time="02:00 PM - 03:00 PM" />
            <TaskItem title="Reading Time" time="03:00 PM - 04:00 PM" />
            <button className="text-[var(--color-primary)] mt-4 font-medium hover:underline">
              View all Tasks →
            </button>
          </div>

          {/* Discussion Box */}
          <div className="bg-white rounded-[var(--radius-card)] shadow-sm p-4">
            <h3 className="font-semibold text-lg mb-4">Discussion Box</h3>
            <DiscussionItem
              message="Sir I’m asking about XYZ topics when..."
              time="Today, 13:36"
            />
            <DiscussionItem
              message="Hello Sir, I am facing problem in Physics..."
              time="23 Jun, 13:06"
            />
            <DiscussionItem
              message="Please help me to fix error in code on..."
              time="21 Jun, 19:04"
            />
            <button className="text-[var(--color-primary)] mt-4 font-medium hover:underline">
              View all →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}






