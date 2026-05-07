import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { AuthInitializer } from "@/components/AuthInitializer";

const siteUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}`;

export const metadata: Metadata = {
  
  title: {
    default: "Toeic Việt",
    template: "%s | ToeicViet"
  },
  alternates: {
    canonical: siteUrl
  },
  robots: {
    index: true,
    follow: true,
  }
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
      <body className="bg-slate-50 text-slate-900 md:pb-0">
        <AuthInitializer />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
