// app/dashboard/page.tsx
"use client"
import AdminDashboard from "@/components/modules/dashboard/admin/AdminDashboard";
import InstructorDashboard from "@/components/modules/dashboard/instructorr/InstructorDashboard";
import StudentDashboard from "@/components/modules/dashboard/student/StudentDashboard";
import { useAuth } from "@/hooks/useAuth";


export default function DashboardHome() {
  const {user} = useAuth();

  if (!user) {
    return ''
  }
 
  return user.role === "SUPER_ADMIN" ? <AdminDashboard /> : user.role === "INSTRUCTOR" ? <InstructorDashboard /> : <StudentDashboard />;
}