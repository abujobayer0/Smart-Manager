import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Smart Manager",
  description: "Developed by Abu",
  openGraph: {
    title: "Smart Manager",
    description: "Developed by Abu",
    images: [
      {
        url: "https://i.ibb.co.com/MDK5vwp8/Smart-Manager-Logo-Flat-Vector-Design-3.png",
        width: 1200,
        height: 630,
        alt: "SmartManager – Project URL and Branch Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Manager",
    description: "Developed by Abu",
    images: [
      "https://i.ibb.co.com/MDK5vwp8/Smart-Manager-Logo-Flat-Vector-Design-3.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${montserrat.className}`}>
        {/* Session provider for client components */}
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
