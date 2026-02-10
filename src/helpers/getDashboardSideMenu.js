import { Home, BookOpen, Users, Settings, ShoppingBag, ClipboardList, BarChart3, Award, User, HelpCircle, HomeIcon, UserCheck, Shield, Trophy, CreditCard, Settings2, Badge, BadgeCent, LocateIcon, ShoppingBasket, Package, TrophyIcon } from "lucide-react";
import { FaProductHunt } from "react-icons/fa";
import { MdCategory, MdOutlineBorderStyle } from "react-icons/md";

// ===== Menu Configs with Icons ===== //
const studentMenu = [
    { title: "Dashboard", href: "/dashboard", icon: Home },
    { title: "Courses", href: "/dashboard/student/courses", icon: BookOpen },
     { title: "My Shop", href: "/dashboard/student/purchased-products", icon: ShoppingBasket },
    { title: "Assignments", href: "/dashboard/student/assignments", icon: ShoppingBag },
    { title: "My Badges", href: "/dashboard/student/my-badges", icon: Badge },
    // { title: "Leader Board", href: "/dashboard/student/leader-board", icon: Settings },
    {title: "Purchase History", href: "/dashboard/student/purchase-history", icon: BarChart3},
    { title: "Profile", href: "/dashboard/student/profile", icon: Settings },
];

const instructorMenu = [
    { title: "Dashboard", href: "/dashboard", icon: Home },
    { title: "Courses", href: "/dashboard/instructor/courses", icon: BookOpen },
    { title: "Students", href: "/dashboard/instructor/students", icon: Users },
    { title: "Task", href: "/dashboard/instructor/assignments", icon: ClipboardList },
    { title: "Quizzes", href: "/dashboard/instructor/quize", icon: HelpCircle },
    { title: "My Shop", href: "/dashboard/instructor/purchased-products", icon: ShoppingBasket },
    { title: "Profile", href: "/dashboard/instructor/profile", icon: User },
    // { title: "Certificate", href: "/dashboard/instructor/certificate", icon: Award },
];

const adminMenu = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  
{ title: "Categories", href: "/dashboard/admin/categories", icon: MdCategory },
{ title: "Packages", href: "/dashboard/admin/packages", icon: Package },
 { title: "Badges", href: "/dashboard/admin/badges", icon: BadgeCent },
  { title: "Products", href: "/dashboard/admin/products", icon: FaProductHunt },
  { title: "Manage Events", href: "/dashboard/admin/events", icon: TrophyIcon },
  { title: "Orders", href: "/dashboard/admin/orders", icon: MdOutlineBorderStyle },
 { title: "Location", href: "/dashboard/admin/location", icon: LocateIcon},
  { title: "Manage Students", href: "/dashboard/admin/students", icon: Users },
  { title: "Manage Instructors", href: "/dashboard/admin/instructors", icon: UserCheck },
  { title: "My Shop", href: "/dashboard/admin/purchased-products", icon: ShoppingBasket },
  { title: "Manage Admins", href: "/dashboard/admin/admins", icon: Shield },


//   { title: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
//   { title: "Assignments", href: "/dashboard/admin/assignments", icon: ClipboardList },
//   { title: "Quizzes", href: "/dashboard/admin/quizzes", icon: HelpCircle },
//   { title: "Certificates", href: "/dashboard/admin/certificates", icon: Award },


//   { title: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },


  { title: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
  {title: "Settings", href: "/dashboard/admin/settings", icon: Settings2}
//   { title: "Purchase History", href: "/dashboard/admin/purchase-history", icon: ShoppingBag },

//   { title: "Site Settings", href: "/dashboard/admin/settings", icon: Settings },
//   { title: "Support Tickets", href: "/dashboard/admin/support", icon: LifeBuoy },
];



export function getDashboardSideMenu(role, instructorStatus = "none") {
    console.log("User Role:", role);
    console.log("Instructor Status:", instructorStatus);
    if (role === "ADMIN" || role === "SUPER_ADMIN") {
        return adminMenu;
    } else if (role === "INSTRUCTOR" ) {
        if (instructorStatus === "pending") {
            return [];
        }
        return instructorMenu;
    } else {
        return studentMenu;
    }
}