import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import MobileHeader from "@/components/layout/MobileHeader";
import DesktopHeader from "@/components/layout/DesktopHeader";
import BottomNavigation from "@/components/layout/BottomNavigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Thi Thử Tiếng Anh | Mobile-First UI 2026",
  description: "Trang web thi thử tiếng anh ETS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></Script>
      </head>
      <body className="bg-slate-50 text-slate-900 pb-20 md:pb-0">
        <MobileHeader />
        <DesktopHeader />

        {children}

        <BottomNavigation />
        <Footer />
      </body>
    </html>
  );
}
