// app/dashboard/page.tsx
"use client"
import AdminDashboard from "@/components/modules/dashboard/admin/AdminDashboard";
import InstructorDashboard from "@/components/modules/dashboard/instructorr/InstructorDashboard";
import StudentDashboard from "@/components/modules/dashboard/student/StudentDashboard";
import { useAuth } from "@/hooks/useAuth";


export default function DashboardHome() {
  const user = useAuth();

  if (!user) {
    return <p>Access denied</p>;
  }

  return user.role === "admin" ? <AdminDashboard /> : user.role === "instructor" ? <InstructorDashboard /> : <StudentDashboard />;
}