"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import EarningsChart from "./EarningsChart";
import {
  Sparkles,
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  Award,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useInstructorDashboard } from "@/hooks/useInstructor";

export default function InstructorDashboard() {
  const { user } = useAuth();
  const { data: dashboardData, isLoading, isError, error } = useInstructorDashboard();

  // Loading State
  if (isLoading) {
    return (
      <section className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--color-primary)] mx-auto"></div>
              <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[var(--color-primary)]" />
            </div>
            <p className="mt-6 text-lg font-medium text-[var(--color-text)]">
              Loading your dashboard...
            </p>
            <p className="text-sm text-[var(--color-text)]/70 mt-2">
              Preparing your insights and statistics
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (isError) {
    return (
      <section className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-[var(--color-text)]">
              Failed to load dashboard
            </p>
            <p className="text-sm text-[var(--color-text)]/70 mt-2">
              {error?.message || "Please try again later"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  const { stats, topCourses, unevaluatedTasks } = dashboardData || {};
  if (user?.instructorRequest?.status === "pending") {
    return (
      <section className=" flex min-h-[80vh] items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="text-center">
          <div className="p-4 bg-yellow-100 rounded-full inline-block mb-4">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Instructor Request Pending</h2>
          <p className="text-gray-600 mb-6">
            Your instructor request is currently under review. Please check back later.
          </p>

          <p className="text-sm text-gray-500 mt-4 text-center">
            For more information, please contact <br />
            <a
              href="mailto:support@gmail.com"
              className="text-indigo-600 font-medium hover:underline"
            >
              support@gmail.com
            </a>.
          </p>


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
                <h2 className="text-sm font-medium text-[var(--color-secondary)]">
                  Welcome back, {user?.name || "Instructor"}
                </h2>
                <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                  Instructor Dashboard
                </h1>
              </div>
            </div>
            <p className="text-[var(--color-text)]/70 max-w-2xl">
              Track your performance, manage courses, and monitor student engagement
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="px-4 py-2 bg-emerald-100 text-[var(--color-primary)] rounded-full font-medium text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {stats?.liveCourses || 0}
              </h3>
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
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {stats?.totalStudents || 0}
              </h3>
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
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                ${stats?.totalEarnings?.toFixed(2) || "0.00"}
              </h3>
              <p className="text-gray-600 text-sm">Total Earnings</p>
            </div>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {stats?.avgRating?.toFixed(1) || "0.0"}/5
              </h3>
              <p className="text-gray-600 text-sm">Avg. Course Rating</p>
            </div>
          </motion.div> */}
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
                    <h2 className="text-xl font-bold text-gray-900">
                      Top Performing Courses
                    </h2>
                    <p className="text-sm text-gray-600">
                      Most successful courses by enrollment
                    </p>
                  </div>
                </div>
                <Link
                  href="/instructor/courses"
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium flex items-center gap-1"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="divide-y divide-emerald-50">
              {topCourses && topCourses.length > 0 ? (
                topCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-emerald-50/30 transition-colors"
                  >
                    <Link href={`/instructor/courses/${course.slug || course._id}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center overflow-hidden">
                            {course.thumbnail ? (
                              <Image
                                src={course.thumbnail}
                                alt={course.title}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            ) : (
                              <BookOpen className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {course.title}
                            </h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-600 flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {course.subscriberCount || 0} students
                              </span>
                              <span className="text-sm text-gray-600 flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                ${course.price?.toFixed(2) || "0.00"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            ${course.totalRevenue?.toFixed(2) || "0.00"}
                          </div>
                          <div className="text-xs text-gray-500">Total Revenue</div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <div className="inline-block p-4 bg-emerald-50 rounded-full mb-4">
                    <BookOpen className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-gray-600 mb-6">
                    No courses found. Create your first course!
                  </p>
                  <Link
                    href="/dashboard/instructor/courses/add"
                    className="inline-block px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
                  >
                    Create Course
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Earnings Chart */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-emerald-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Revenue Analytics
                  </h2>
                  <p className="text-sm text-gray-600">Monthly earnings overview</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <EarningsChart data={dashboardData?.monthlyEarnings || []} />
            </div>
          </div>
        </div>

        {/* Right Section - 1/3 width */}
        <div className="space-y-8">
          {/* Unevaluated Tasks */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-emerald-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Pending Evaluation
                    </h2>
                    <p className="text-sm text-gray-600">
                      Tasks requiring your attention
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {unevaluatedTasks && unevaluatedTasks.length > 0 ? (
                  unevaluatedTasks.map((task, index) => (
                    <motion.div
                      key={task._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`dashboard/instructor/assignments`}>
                        <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-50/50 rounded-xl border border-amber-200 hover:border-amber-300 transition-colors cursor-pointer group">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">
                                {task.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {task.pendingCount || 0} submissions pending review
                              </p>
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
                              style={{
                                width: `${Math.min(
                                  100,
                                  ((task.pendingCount || 0) / 10) * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="inline-block p-3 bg-amber-50 rounded-full mb-3">
                      <AlertCircle className="w-6 h-6 text-amber-400" />
                    </div>
                    <p className="text-gray-600">No unevaluated tasks</p>
                    <p className="text-sm text-gray-500 mt-1">
                      You're all caught up!
                    </p>
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