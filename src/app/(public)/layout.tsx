import Footer from "@/components/shared/Footer";
import { MobileBottomNav } from "@/components/shared/Navbar/MobileBottomNav";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh">{children}</main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
