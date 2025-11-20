import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cream-house.vercel.app';

export const metadata: Metadata = {
  title: {
    default: "Cream House - Premium Artisanal Ice Cream", 
    template: "%s | Cream House", 
  },
  description: "Crafting premium ice cream experiences by blending timeless traditions with modern innovation.",

  icons: {
    icon: '/logo.jpg', 
    shortcut: '/logo.jpg',
    apple: '/logo.jpg', 
  },

  keywords: ['ice cream', 'artisanal', 'premium', 'dessert', 'Guntur', 'Cream House', 'natural ingredients'],

  openGraph: {
    title: "Cream House - Premium Artisanal Ice Cream",
    description: "Crafting premium ice cream experiences by blending timeless traditions with modern innovation.",
    url: siteUrl, 
    siteName: "Cream House",
    images: [
      {
        url: `${siteUrl}/logo.jpg`,
        width: 600,
        height: 600,
        alt: "Cream House Logo",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: "Cream House - Premium Artisanal Ice Cream",
    description: "Crafting premium ice cream experiences by blending timeless traditions with modern innovation.",
    images: [`${siteUrl}/logo.jpg`], 
  },

  manifest: '/manifest.json', 
  robots: 'index, follow', 
};

export const viewport: Viewport = {
  themeColor: '#F01B4E',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
          <Toaster position="top-center" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
