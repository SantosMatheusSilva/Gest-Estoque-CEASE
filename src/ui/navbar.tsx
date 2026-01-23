"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Link as HeroLink } from "@heroui/react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={36} height={36} priority />
          <span className="hidden sm:block text-lg font-semibold">
            StockManager
          </span>
        </Link>

        {/* Center links (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <HeroLink href="/">Home</HeroLink>
          <HeroLink href="/sobrenos">Sobre</HeroLink>
          <HeroLink href="/funcionalidades">Funcionalidades</HeroLink>
          <HeroLink href="/faq">FAQ</HeroLink>
          <HeroLink href="/contactos">Contactos</HeroLink>
        </div>

        {/* Right buttons (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="secondary">Login</Button>
          <Button variant="primary">Sign up</Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="text-xl">☰</span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-4">
          <HeroLink href="/sobre">Sobre</HeroLink>
          <HeroLink href="/features">Features</HeroLink>
          <HeroLink href="/faq">FAQ</HeroLink>
          <HeroLink href="/contactos">Contactos</HeroLink>

          <div className="pt-2 flex flex-col gap-2">
            <Button variant="secondary">Login</Button>
            <Button variant="primary">Sign up</Button>
          </div>
        </div>
      )}
    </header>
  );
}
