import { Home, BookOpen, Users, Settings, ShoppingBag, ClipboardList, BarChart3, Award, User, HelpCircle, HomeIcon, UserCheck, Shield, Trophy, CreditCard } from "lucide-react";
// ===== Menu Configs with Icons ===== //
const studentMenu = [
    { title: "Dashboard", href: "/dashboard", icon: Home },
    { title: "Courses", href: "/dashboard/student/courses", icon: BookOpen },
    { title: "Assignments", href: "/dashboard/student/assignments", icon: ShoppingBag },
    { title: "Certificates", href: "/dashboard/student/certificates", icon: Settings },
    // { title: "Leader Board", href: "/dashboard/student/leader-board", icon: Settings },
    {title: "Purchase History", href: "/dashboard/student/purchase-history", icon: BarChart3},
    { title: "Profile", href: "/dashboard/student/profile", icon: Settings },
];

const instructorMenu = [
    { title: "Dashboard", href: "/dashboard", icon: Home },
    { title: "Courses", href: "/dashboard/instructor/courses", icon: BookOpen },
    { title: "Students", href: "/dashboard/instructor/students", icon: Users },
    { title: "Assignments", href: "/dashboard/instructor/assignments", icon: ClipboardList },
    { title: "Quizzes", href: "/dashboard/instructor/quize", icon: HelpCircle },
    { title: "Profile", href: "/dashboard/instructor/profile", icon: User },
    { title: "Certificate", href: "/dashboard/instructor/certificate", icon: Award },
];

const adminMenu = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  

  { title: "Manage Students", href: "/dashboard/admin/students", icon: Users },
  { title: "Manage Instructors", href: "/dashboard/admin/instructors", icon: UserCheck },
  { title: "Manage Admins", href: "/dashboard/admin/admins", icon: Shield },


  { title: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
//   { title: "Assignments", href: "/dashboard/admin/assignments", icon: ClipboardList },
//   { title: "Quizzes", href: "/dashboard/admin/quizzes", icon: HelpCircle },
//   { title: "Certificates", href: "/dashboard/admin/certificates", icon: Award },


  { title: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },


  { title: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
  { title: "Purchase History", href: "/dashboard/admin/purchase-history", icon: ShoppingBag },

//   { title: "Site Settings", href: "/dashboard/admin/settings", icon: Settings },
//   { title: "Support Tickets", href: "/dashboard/admin/support", icon: LifeBuoy },
];



export function getDashboardSideMenu(role) {
    if (role === "admin") {
        return adminMenu;
    } else if (role === "instructor") {
        return instructorMenu;
    } else {
        return studentMenu;
    }
}