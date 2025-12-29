"use client"; // Required to use usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    // Helper function to apply styles if the link is active
    const getLinkStyle = (path: string) => {
        const baseStyle = "h-full px-4 flex items-center transition-colors font-medium";
        const activeStyle = "bg-orange-600 text-white"; // Style when selected
        const inactiveStyle = "hover:bg-orange-500 text-zinc-900 dark:text-zinc-100";

        return `${baseStyle} ${pathname === path ? activeStyle : inactiveStyle}`;
    };

    return (
        <nav className="w-full h-16 flex items-center justify-between px-8 bg-orange-400 border-b border-zinc-200 dark:bg-orange-700 dark:border-zinc-800 fixed top-0 z-50">
        <div className="font-bold text-xl">MyLogo</div>
        
        {/* Ensure the container for links is also h-full */}
        <div className="flex h-full">
            <Link href="/" className={getLinkStyle("/")}>
            Home
            </Link>
            
            {/* Fixed your Login URL from GitHub back to internal route */}
            <Link href="/auth/login" className={getLinkStyle("/auth/login")}>
            Login
            </Link>
            
            <Link href="/auth/register" className={getLinkStyle("/auth/register")}>
            Register
            </Link>
        </div>
        </nav>
    );
}