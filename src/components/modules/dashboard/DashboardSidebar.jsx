
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Home, BookOpen, Users, Settings, ShoppingBag, MessageSquare, ClipboardList, BarChart3, Award, User, HelpCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

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
    { title: "Quiz Results", href: "/dashboard/instructor/quize-results", icon: BarChart3 },
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

// ===== Sidebar Navigation Component ===== //
export function SidebarNav({ items, className = "", ...props }) {
    const pathname = usePathname();

    return (
        <nav
            className={`flex flex-col space-y-2 px-4 py-6 text-[var(--color-text)] ${className}`}
            {...props}
        >
            {items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors ${isActive
                            ? "bg-[var(--color-primary)] text-white shadow-md"
                            : "hover:bg-[var(--color-primary-hover)] hover:text-white"
                            }`}
                    >
                        {Icon && <Icon size={18} />}
                        <span>{item.title}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

// ===== Sidebar Layout Component ===== //
export function DashboardSidebar() {
    const user = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const sidebarNavItems =
        user?.role === "admin"
            ? adminMenu
            : user?.role === "instructor"
                ? instructorMenu
                : studentMenu;

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col bg-[var(--color-background)] text-[var(--color-text)] border-r border-gray-200 min-h-screen w-[220px] shadow-sm">
                <div className="flex items-center justify-center h-16 border-b border-gray-200 font-semibold text-lg">
                    Dashboard
                </div>
                <SidebarNav items={sidebarNavItems} />
            </aside>

            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Mobile Drawer */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-background)] text-[var(--color-text)] border-r border-gray-200 shadow-lg transform transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:hidden`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[var(--color-primary)]"
                    >
                        <X size={24} />
                    </button>
                </div>
                <SidebarNav items={sidebarNavItems} />
            </aside>

            {/* Mobile Header with Toggle */}
            <div className="md:hidden px-4 flex justify-between h-16 items-center bg-[var(--color-background)] sticky top-0 z-20 w-full border-b border-gray-200">
                <h2 className="font-bold text-[var(--color-primary)]">
                    Hi, {user?.name || "User"}
                </h2>
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 rounded-md bg-[var(--color-primary)] text-white shadow-md"
                >
                    <Menu size={22} />
                </button>
            </div>
        </>
    );
}
