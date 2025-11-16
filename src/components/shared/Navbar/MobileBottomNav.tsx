"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdHome, MdOutlineIcecream, MdInfoOutline, MdOutlineEmail } from 'react-icons/md';

const navLinks = [
  { href: '/', label: 'Home', icon: MdHome },
  { href: '/products', label: 'Products', icon: MdOutlineIcecream },
  { href: '/about', label: 'About Us', icon: MdInfoOutline },
  { href: '/contact', label: 'Contact', icon: MdOutlineEmail },
];

export const MobileBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav 
      className="fixed bottom-4 left-1/2 z-40 w-[95%] max-w-md -translate-x-1/2 
                 rounded-full border border-white/10 bg-gray-900/80 
                 p-3 shadow-lg backdrop-blur-lg md:hidden"
    >
      <div className="flex items-center justify-around">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center text-xs transition-colors
                ${isActive ? 'text-pink-400' : 'text-gray-300 hover:text-white'}
              `}
            >
              <link.icon className="h-5 w-5 mb-1" />
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};