import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import NavbarClient from "../components/NavbarClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kovács Bálint Fotó",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hu">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarClient />
        <main className="pt-[80px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
