"use client";

import { Book, Users, CheckCircle, CreditCard, TrendingUp, Target, Clock, Award, Trophy, Star } from "lucide-react";
import StatusCard from "@/components/modules/dashboard/student/StatsCard";
import CourseTable from "@/components/modules/dashboard/student/CourseTable";
import { useAuth } from "@/hooks/useAuth";
import { useStudentDashboard, useMyPoints, useMyRank } from "@/hooks/useDashboard";
import { useMemo } from "react";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { data: dashboardData, loading: dashboardLoading } = useStudentDashboard();
  const { data: pointsData } = useMyPoints();
  const myRank = useMyRank();

  // Calculate display values from dashboard data
  const stats = useMemo(() => {
    if (!dashboardData?.stats) return null;

    return {
      totalCourses: dashboardData.stats.totalCourses || 0,
      enrolledCourses: dashboardData.stats.enrolledCourses || 0,
      completionRate: dashboardData.stats.completionRate || 0,
      totalFeesPaid: dashboardData.stats.totalFeesPaid || 0,
      progress: dashboardData.quickStats?.progress || 0,
      activeCourses: dashboardData.quickStats?.activeCourses || 0,
      studyTime: dashboardData.quickStats?.studyTime || 0,
      totalPoints: pointsData?.wallet?.totalPoints || 0,
      rank: myRank || null,
    };
  }, [dashboardData, pointsData, myRank]);

  if (authLoading || dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 sm:px-6 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Welcome back, {user?.name || 'Student'}! 👋
        </h1>
        <p className="text-gray-600 mt-2">Track your learning journey and progress</p>

        {/* Quick Stats Bar */}
        {stats && (
          <div className="flex flex-wrap items-center gap-3 mt-6 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span>Progress: {stats.progress}%</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full">
              <Target className="w-4 h-4" />
              <span>{stats.activeCourses} active course{stats.activeCourses !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full">
              <Clock className="w-4 h-4" />
              <span>{stats.studyTime}h this week</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-full">
              <Award className="w-4 h-4" />
              <span>{stats.totalPoints} points</span>
            </div>
            {stats.rank && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full">
                <Trophy className="w-4 h-4" />
                <span>Rank #{stats.rank}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
        <StatusCard
          icon={<Book className="w-6 h-6" />}
          value={stats?.totalCourses || 0}
          label="Total Courses Taken"
          color="from-blue-500 to-cyan-500"
          trend={`+${stats?.enrolledCourses || 0} enrolled`}
        />
        <StatusCard
          icon={<Users className="w-6 h-6" />}
          value={stats?.enrolledCourses || 0}
          label="Courses Enrolled"
          color="from-emerald-500 to-green-500"
          trend="Active now"
        />
        <StatusCard
          icon={<CheckCircle className="w-6 h-6" />}
          value={`${stats?.completionRate || 0}%`}
          label="Completion Rate"
          color="from-violet-500 to-purple-500"
          trend={`${stats?.completedCourses || 0} completed`}
        />
        <StatusCard
          icon={<CreditCard className="w-6 h-6" />}
          value={`$${stats?.totalFeesPaid || 0}`}
          label="Total Fees Paid"
          color="from-amber-500 to-orange-500"
          trend="Learning investment"
        />
        <StatusCard
          icon={<Award className="w-6 h-6" />}
          value={stats?.totalPoints || 0}
          label="Total Points Earned"
          color="from-yellow-500 to-amber-500"
          trend="Keep learning!"
        />
        <StatusCard
          icon={<Trophy className="w-6 h-6" />}
          value={stats?.rank ? `#${stats.rank}` : 'N/A'}
          label="Leaderboard Rank"
          color={stats?.rank && stats.rank <= 3 ? "from-yellow-500 to-orange-500" : "from-purple-500 to-pink-500"}
          trend={stats?.rank && stats.rank <= 3 ? "🏆 Top performer!" : "Global ranking"}
        />
      </div>

      {/* Main Content Area */}
     <CourseTable enrollments={dashboardData?.recentEnrollments || []} />
    </div>
  );
}