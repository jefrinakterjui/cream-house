"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import CartSheet from "../CartSheet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  return (
    <nav
      className={`fixed top-6 inset-x-4 h-16 max-w-screen-xl mx-auto rounded-full z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F01B4E] backdrop-blur-lg"
          : "bg-[#F01B4E]" 
      }`}
    >
      <div className="flex h-full items-center justify-start md:justify-between px-6 md:px-8">
        <Link href="/" className="flex-shrink-0 ">
          <Logo />
        </Link>
        <NavMenu className="hidden md:block" />
        <div className="ml-auto md:ml-0 text-white">
            <CartSheet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;