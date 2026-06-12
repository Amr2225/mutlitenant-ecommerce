import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "FunRoad",
  description: "Multi-tenant Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={cn("antialiased", dmSans.className)}>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
