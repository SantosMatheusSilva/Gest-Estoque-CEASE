"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="w-full border-b">
      <nav className="mx-auto flex max-w-5xl  items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            priority
            className=""
          />
          <span className="hidden sm:block text-lg font-semibold">
            StockManager
          </span>
        </Link>

        {/* Center links (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={isActive("/") ? "font-semibold text-blue-500" : ""}
          >
            Home
          </Link>
          <Link
            href="/sobrenos"
            className={
              isActive("/sobrenos") ? "font-semibold text-blue-500" : ""
            }
          >
            Sobre
          </Link>
          <Link
            href="/funcionalidades"
            className={
              isActive("/funcionalidades") ? "font-semibold text-blue-500" : ""
            }
          >
            Funcionalidades
          </Link>
          <Link
            href="/faq"
            className={isActive("/faq") ? "font-semibold text-blue-500" : ""}
          >
            Faq
          </Link>
          <Link
            href="/contacto"
            className={
              isActive("/contacto") ? "font-semibold text-blue-500" : ""
            }
          >
            Contactos
          </Link>
        </div>

        {/* Right buttons (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" className={"text-blue-400"}>
            Login
          </Button>
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
          <Link
            href="/sobrenos"
            className={
              isActive("/sobrenos") ? "font-semibold text-blue-500" : ""
            }
          >
            Sobre
          </Link>
          <Link
            href="/funcionalidades"
            className={
              isActive("/funcionalidades") ? "font-semibold text-blue-500" : ""
            }
          >
            Funcionalidades
          </Link>
          <Link
            href="/faq"
            className={isActive("/faq") ? "font-semibold text-blue-500" : ""}
          >
            FAQ
          </Link>
          <Link
            href="/contacto"
            className={
              isActive("/contacto") ? "font-semibold text-blue-500" : ""
            }
          >
            Contactos
          </Link>

          <div className="pt-2 flex flex-col gap-2">
            <Button variant="outline" className={"text-blue-400"}>
              Login
            </Button>
            <Button variant="primary">Sign up</Button>
          </div>
        </div>
      )}
    </header>
  );
}
