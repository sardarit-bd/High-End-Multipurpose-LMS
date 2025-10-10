import { Home, BookOpen, Users, Settings, ShoppingBag, MessageSquare, ClipboardList, BarChart3, Award, User, HelpCircle } from "lucide-react";
// ===== Menu Configs with Icons ===== //
const studentMenu = [
    { title: "Dashboard", href: "/dashboard", icon: Home },
    { title: "Courses", href: "/dashboard/student/courses", icon: BookOpen },
    { title: "Assignments", href: "/dashboard/student/assignments", icon: ShoppingBag },
    { title: "Discussion", href: "/dashboard/student/discussion", icon: MessageSquare },
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
    { title: "Overview", href: "/dashboard", icon: Home },
    { title: "Add Product", href: "/dashboard/admin/addProductForm/new", icon: ShoppingBag },
    { title: "Products", href: "/dashboard/admin/products", icon: BookOpen },
    { title: "Orders", href: "/dashboard/admin/orders", icon: ShoppingBag },
    { title: "Reviews", href: "/dashboard/admin/reviews", icon: MessageSquare },
    { title: "Users", href: "/dashboard/admin/users", icon: Users },
    { title: "Reports", href: "/dashboard/admin/reports", icon: BookOpen },
    { title: "Settings", href: "/dashboard/admin/settings", icon: Settings },
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