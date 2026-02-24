"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className = "" }: NavLinkProps) {
  const pathname = usePathname();
  //const isActive = pathname === href;
  const isActive =
    pathname === href ||
    (href.split("/").length > 3 && pathname.startsWith(href));

  console.log("pathname--->" + pathname);
  console.log(" isActive--->" + isActive);

  return (
    <Link
      href={href}
      className={[
        "w-full flex justify-center items-center gap-2 px-4 py-2 rounded-4xl border border-gray-300 transition-colors",
        isActive
          ? "bg-blue-100 border-blue-400 text-blue-700"
          : "hover:bg-gray-100",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
