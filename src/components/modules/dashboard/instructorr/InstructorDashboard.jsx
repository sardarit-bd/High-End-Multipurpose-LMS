"use client";

import { FiUsers, FiVideo, FiBookOpen, FiTrendingUp, FiDollarSign, FiCheckCircle, FiClock, FiBarChart } from "react-icons/fi";
import { motion } from "framer-motion";
import StatCard from "./StatCard";
import CourseItem from "./CourseItem";
import TaskItem from "./TaskItem";
import { useAuth } from "@/hooks/useAuth";
import EarningsChart from "./EarningsChart";
import { useInstructorStats, useInstructorDashboard } from "@/hooks/useDashboard";
import { Sparkles, TrendingUp, Users, BookOpen, DollarSign, Award, Activity, AlertCircle, ChevronRight } from "lucide-react";

export default function InstructorDashboard() {
  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = useInstructorStats();
  const { data: dashboardData, isLoading: dashboardLoading } = useInstructorDashboard();

  const topCourses = dashboardData?.topCourses || [];
  const recentSubmissions = dashboardData?.recentSubmissions || [];
  const unevaluatedTasks = dashboardData?.unevaluatedTasks || [];

  if (statsLoading || dashboardLoading) {
    return (
      <section className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--color-primary)] mx-auto"></div>
              <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[var(--color-primary)]" />
            </div>
            <p className="mt-6 text-lg font-medium text-[var(--color-text)]">Loading your dashboard...</p>
            <p className="text-sm text-[var(--color-text)]/70 mt-2">Preparing your insights and statistics</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-[var(--color-secondary)]">Welcome back,</h2>
                <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">Instructor Dashboard</h1>
              </div>
            </div>
            <p className="text-[var(--color-text)]/70 max-w-2xl">
              Track your performance, manage courses, and monitor student engagement
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-emerald-100 text-[var(--color-primary)] rounded-full font-medium text-sm">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-600">+12.5%</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats?.liveCourses || 0}</h3>
              <p className="text-gray-600 text-sm">Live Courses</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-600">+8.2%</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats?.totalStudents || 0}</h3>
              <p className="text-gray-600 text-sm">Active Students</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-amber-600">+15.3%</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">₹{stats?.totalEarnings?.toFixed(2) || '0.00'}</h3>
              <p className="text-gray-600 text-sm">Total Earnings</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-emerald-600">+24.7%</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">4.8/5</h3>
              <p className="text-gray-600 text-sm">Avg. Course Rating</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {/* Top Courses */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-emerald-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Top Performing Courses</h2>
                    <p className="text-sm text-gray-600">Most successful courses by enrollment</p>
                  </div>
                </div>
                <button className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-emerald-50">
              {topCourses && topCourses.length > 0 ? (
                topCourses.map((course, index) => (
                  <motion.div
                    key={course.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-emerald-50/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {course.subscriberCount || 0} students
                            </span>
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ₹{course.price?.toFixed(2) || '0.00'}
                            </span>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {course.code ? `#${course.code.toString().slice(-6)}` : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">₹{(course.price * course.subscriberCount)?.toFixed(2) || '0.00'}</div>
                        <div className="text-xs text-gray-500">Total Revenue</div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <div className="inline-block p-4 bg-emerald-50 rounded-full mb-4">
                    <BookOpen className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-gray-600 mb-6">No courses found. Create your first course!</p>
                </div>
              )}
            </div>
          </div>

          {/* Earnings Chart */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-emerald-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg">
                  <FiBarChart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Revenue Analytics</h2>
                  <p className="text-sm text-gray-600">Monthly earnings overview</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <EarningsChart />
            </div>
          </div>
        </div>

        {/* Right Section - 1/3 width */}
        <div className="space-y-8">
          {/* Recent Submitted Tasks */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-emerald-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                    <FiClock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Recent Submissions</h2>
                    <p className="text-sm text-gray-600">Latest student submissions</p>
                  </div>
                </div>
                <button className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {recentSubmissions && recentSubmissions.length > 0 ? (
                  recentSubmissions.map((submission, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="p-4 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50/30 transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <FiCheckCircle className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{submission.task?.title || 'Unknown Task'}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Submitted by {submission.user?.name || 'Unknown Student'}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 rounded-full">Pending Review</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="inline-block p-3 bg-purple-50 rounded-full mb-3">
                      <FiClock className="w-6 h-6 text-purple-400" />
                    </div>
                    <p className="text-gray-600">No recent submissions</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Unevaluated Tasks */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-emerald-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Pending Evaluation</h2>
                    <p className="text-sm text-gray-600">Tasks requiring your attention</p>
                  </div>
                </div>
                <button className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium flex items-center gap-1">
                  Evaluate All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {unevaluatedTasks && unevaluatedTasks.length > 0 ? (
                  unevaluatedTasks.map((task, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-amber-50 to-amber-50/50 rounded-xl border border-amber-200 hover:border-amber-300 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.pendingCount || 0} submissions pending review</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                            {task.pendingCount || 0}
                          </span>
                          <ChevronRight className="w-4 h-4 text-amber-400 group-hover:text-amber-600 transition-colors" />
                        </div>
                      </div>
                      <div className="mt-3 h-1.5 bg-amber-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                          style={{ width: `${Math.min(100, ((task.pendingCount || 0) / 10) * 100)}%` }}
                        />
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="inline-block p-3 bg-amber-50 rounded-full mb-3">
                      <AlertCircle className="w-6 h-6 text-amber-400" />
                    </div>
                    <p className="text-gray-600">No unevaluated tasks</p>
                    <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}