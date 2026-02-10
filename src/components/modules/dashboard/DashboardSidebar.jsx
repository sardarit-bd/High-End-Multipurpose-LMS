"use client";
import { useState } from "react";
import { Menu, X, LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import SidebarNav from "./Sidebarnav";
import { getDashboardSideMenu } from "@/helpers/getDashboardSideMenu";

// ===== Sidebar Layout Component ===== //
export function DashboardSidebar() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const sidebarNavItems = getDashboardSideMenu(user?.role, user?.instructorRequest?.status || "none");

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className={`hidden md:flex flex-col bg-white text-gray-800 min-h-screen ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 border-r border-gray-100 shadow-sm sticky top-0 h-screen`}>
                {/* Header */}
                <div className={`flex items-center h-16 ${collapsed ? 'justify-center' : 'px-4 justify-between'} border-b border-gray-100`}>
                    {!collapsed ? (
                        <>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/80 flex items-center justify-center">
                                    <LayoutDashboard size={18} className="text-white" />
                                </div>
                                <span className="font-bold text-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/70 bg-clip-text text-transparent">
                                    Dashboard
                                </span>
                            </div>
                            <button
                                onClick={() => setCollapsed(true)}
                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Collapse sidebar"
                            >
                                <ChevronLeft size={16} className="text-gray-500" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setCollapsed(false)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Expand sidebar"
                        >
                            <ChevronRight size={16} className="text-gray-500" />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-4">
                    <SidebarNav items={sidebarNavItems} collapsed={collapsed} />
                </div>

                {/* User Profile */}
                {!collapsed && user && (
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 flex items-center justify-center">
                                <span className="font-semibold text-[var(--color-primary)]">
                                    {user.name?.charAt(0) || 'U'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{user.name || "User"}</p>
                                <p className="text-xs text-gray-500 capitalize">{user.role || "User"}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Collapsed User Icon */}
                {collapsed && user && (
                    <div className="p-4 border-t border-gray-100 flex justify-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 flex items-center justify-center">
                            <span className="font-semibold text-[var(--color-primary)] text-sm">
                                {user.name?.charAt(0) || 'U'}
                            </span>
                        </div>
                    </div>
                )}
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Drawer */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-white text-gray-800 shadow-xl transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:hidden`}
            >
                {/* Mobile Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/80 flex items-center justify-center">
                            <LayoutDashboard size={18} className="text-white" />
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/70 bg-clip-text text-transparent">
                            Dashboard
                        </span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* User Profile Mobile */}
                {user && (
                    <div className="px-4 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/80 flex items-center justify-center">
                                <span className="font-bold text-white text-lg">
                                    {user.name?.charAt(0) || 'U'}
                                </span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900">{user.name || "User"}</p>
                                <p className="text-sm text-gray-600 capitalize">{user.role || "User"}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Navigation */}
                <div className="overflow-y-auto h-[calc(100%-8rem)]">
                    <SidebarNav items={sidebarNavItems} mobile />
                </div>
            </aside>

            {/* Mobile Top Bar */}
            <div className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
                <div className="flex items-center justify-between h-16 px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 flex items-center justify-center">
                            <LayoutDashboard size={18} className="text-[var(--color-primary)]" />
                        </div>
                        <div>
                            <h1 className="font-semibold text-gray-900">Dashboard</h1>
                            <p className="text-xs text-gray-500">Hi, {user?.name?.split(' ')[0] || "Welcome"}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white shadow-md hover:shadow-lg transition-all"
                        aria-label="Open menu"
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </div>
        </>
    );
}