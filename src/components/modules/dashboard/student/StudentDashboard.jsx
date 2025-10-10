"use client";

import { Book, Users, CheckCircle, CreditCard } from "lucide-react";
import StatusCard from "@/components/modules/dashboard/student/StatsCard";
import CourseTable from "@/components/modules/dashboard/student/CourseTable";

export default function Dashboard() {
  return (
    <div className="min-h-screen container mx-auto bg-white text-[var(--color-text)]">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">My Status</h1>

      {/* Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatusCard icon={<Book />} value="15" label="Total Courses Taken" />
        <StatusCard icon={<Users />} value="11" label="Courses Enrolled" />
        <StatusCard icon={<CheckCircle />} value="95+" label="Courses Completed" />
        <StatusCard icon={<CreditCard />} value="$95" label="Total Fees Paid" />
      </div>

      {/* Enrolled Courses */}
      <CourseTable />
    </div>
  );
}
