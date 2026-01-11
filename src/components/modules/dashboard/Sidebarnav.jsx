import { LogOut, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNav({ items, collapsed = false, mobile = false }) {
    const pathname = usePathname();

    return (
        <nav className={`flex flex-col space-y-1 ${collapsed ? 'px-2' : 'px-3'} py-4 text-gray-700`}>
            {items.map((item) => {
                let isActive = pathname === item.href;
                
                // Special handling for course-related paths
                if (item.href.includes('/courses')) {
                    isActive = isActive || 
                        pathname.includes('/courses/add') || 
                        pathname.includes('/courses/edit/') || 
                        (pathname.includes('/courses/') && pathname.split('/').length > 4);
                }
                
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${isActive
                            ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white shadow-lg"
                            : "hover:bg-gray-100 hover:text-[var(--color-primary)]"
                            } ${collapsed ? 'justify-center' : ''}`}
                        title={collapsed ? item.title : ''}
                    >
                        {Icon && <Icon size={20} className={isActive ? "text-white" : "text-gray-500"} />}
                        {!collapsed && <span className="flex-1">{item.title}</span>}
                        {isActive && !collapsed && (
                            <div className="w-2 h-2 rounded-full bg-white/80 ml-auto"></div>
                        )}
                    </Link>
                );
            })}
            
            {/* Home Link */}
            <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                    href='/'
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-[var(--color-primary)] ${collapsed ? 'justify-center' : ''}`}
                    title={collapsed ? "Return to Home" : ''}
                >
                    <Home size={20} className="text-gray-500" />
                    {!collapsed && <span className="flex-1">Return to Home</span>}
                </Link>
            </div>
        </nav>
    );
}