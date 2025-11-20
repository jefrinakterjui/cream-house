"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  ClipboardList,
  LogOut,
  Package,
  User,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarGroups = [
  {
    links: [
      { 
        href: "/dashboard", 
        label: "Dashboard", 
        icon: <Home size={20} /> 
      },
    ],
  },
  {
    title: "Management",
    links: [
      {
        href: "/dashboard/products",
        label: "Products",
        icon: <Package size={20} />,
      },
      {
        href: "/dashboard/categories",
        label: "Categories",
        icon: <ClipboardList size={20} />,
      },
      {
        href: "/dashboard/users",
        label: "Create Dealer",
        icon: <User size={20} />,
      },
      {
        href: "/dashboard/orders", 
        label: "Orders",
        icon: <ShoppingCart size={20} />, 
      },
    ],
  },
];

interface SidebarProps {
  className?: string;
  onLinkClick?: () => void; 
}

export default function Sidebar({ className, onLinkClick }: SidebarProps) {
  const pathname = usePathname() || "/";
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
    if (onLinkClick) onLinkClick();
  };

  return (
    <aside className={cn("flex h-full flex-col justify-between bg-[#F01B4E] p-6 overflow-y-auto custom-scrollbar", className)}>
      <div>
        <nav className="flex flex-col gap-y-6">
          {sidebarGroups.map((group, index) => (
            <div key={group.title || index}>
              {group.title && (
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-pink-200/70">
                  {group.title}
                </h3>
              )}
              <div className="flex flex-col gap-y-1">
                {group.links.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (pathname.startsWith(link.href) && link.href !== "/dashboard");
                  const isDashboardActive = link.href === "/dashboard" && pathname === "/dashboard";

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onLinkClick}
                      className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition-colors ${
                        isActive || isDashboardActive
                          ? "bg-white/10 text-white shadow-sm" 
                          : "text-pink-100 hover:bg-white/10 hover:text-white" 
                      }`}
                      aria-current={isActive || isDashboardActive ? "page" : undefined}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg p-3 text-sm font-medium text-pink-100 transition-colors hover:bg-white/10 hover:text-white mt-4"
          type="button"
        >
          <LogOut size={20} />
          <span>Signout</span>
        </button>
      </div>
    </aside>
  );
}