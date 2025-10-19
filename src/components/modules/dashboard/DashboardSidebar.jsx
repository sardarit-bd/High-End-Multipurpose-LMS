"use client";;
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import SidebarNav from "./Sidebarnav";
import { getDashboardSideMenu } from "@/helpers/getDashboardSideMenu";



// ===== Sidebar Layout Component ===== //
export function DashboardSidebar() {
    const user = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const sidebarNavItems = getDashboardSideMenu(user?.role);

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
