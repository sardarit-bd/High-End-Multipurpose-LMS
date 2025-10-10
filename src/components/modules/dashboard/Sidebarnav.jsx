import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNav({ items }) {
    const pathname = usePathname();

    return (
        <nav
            className={`flex flex-col space-y-2 px-4 py-6 text-[var(--color-text)]`}
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
            <Link
                href='/'
                className={`flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-primary-hover)] border border-[var-(color-text)] hover:text-white`}
            >

                < LogOut />
                <span>Logout</span>
            </Link>
        </nav>
    );
}