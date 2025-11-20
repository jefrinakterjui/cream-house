"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "../shared/Navbar/logo";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"; 
import Sidebar from "./Sidebar";

export default function DashNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-[#F01B4E] px-4 md:px-6 text-white shadow-md">
      <div className="flex items-center gap-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 rounded-md hover:bg-white/10 transition">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Open Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px] border-r-0 bg-[#F01B4E]">
            <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
            <SheetDescription className="sr-only">Main navigation menu for dashboard</SheetDescription>
            
            <div className="h-full">
              <div className="flex h-16 items-center px-6 border-b border-white/10">
                 <Logo />
              </div>
              <Sidebar onLinkClick={() => setIsOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex-shrink-0">
          <Logo />
        </Link>
      </div>

      {/* Optional: Add User Profile or Notifications here */}
      {/* <div className="flex items-center gap-4">...</div> */}
    </header>
  );
}