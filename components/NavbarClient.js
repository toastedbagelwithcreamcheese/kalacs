// components/NavbarClient.js
"use client"; // Ez jelzi, hogy ez egy Client Component

import dynamic from 'next/dynamic';

// Itt importáljuk dinamikusan a Navbart SSR nélkül
const Navbar = dynamic(() => import('./Navbar'), { ssr: false });

export default function NavbarClient() {
  // Egyszerűen csak visszaadjuk a dinamikusan betöltött Navbar komponenst
  return <Navbar />;
}