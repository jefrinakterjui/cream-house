"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import DashNav from "@/components/dashboard/DashNav";
import Sidebar from "@/components/dashboard/Sidebar";
import Loading from "@/components/ui/Loading";

const ADMIN_EMAIL = "admin@gmail.com"; 

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user || user.email !== ADMIN_EMAIL) {
        router.push("/login"); 
      } else {
        setIsAuthorized(true);
      }
    };

    checkAdmin();
  }, [router]);

  if (!isAuthorized) {
    return <div className="h-screen flex items-center justify-center"><Loading /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashNav />
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Desktop Sidebar - Hidden on mobile (md:block) */}
        <div className="hidden md:block w-64 shrink-0 border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 lg:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;