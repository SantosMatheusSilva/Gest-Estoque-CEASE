"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Plus } from "@gravity-ui/icons";
import { UserDropdown } from "@/src/ui/Usuario/UserDropdown";
import { UsuarioPublico } from "../db/definitions";

import BaseSurface from "./Surface";

interface TopbarProps {
  usuario: UsuarioPublico;
}

export function Topbar({ usuario }: TopbarProps) {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/aplicacao/perfil");
  };

  const handleLogoutClick = () => {
    // TODO: Implement logout logic
    router.push("/");
  };

  return (
    <BaseSurface
      variant="default"
      className="max-w-full rounded-3xl backdrop-blur mx-2 my-4"
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Side: Mobile Menu Button (visible on mobile) + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}

          {/* Logo and App Name */}
          <Link
            href="/aplicacao"
            className="flex sm:hidden items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.png"
              alt="StockManager Logo"
              width={40}
              height={40}
              priority
              className="rounded-md"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">
                StockManager
              </span>
              <span className="text-xs text-foreground-500">
                Gestão de Stock
              </span>
            </div>
          </Link>
        </div>

        {/* User Dropdown */}
        <div className="flex items-center gap-4">
          <UserDropdown
            usuario={usuario}
            onProfileClick={handleProfileClick}
            onLogoutClick={handleLogoutClick}
          />
        </div>
      </div>
    </BaseSurface>
  );
}
