"use client";
import { UserButton } from "@clerk/nextjs";

import BaseSurface from "./Surface";
import { OrganizationSwitcher } from "@clerk/nextjs";

interface TopbarProps {
  //id: string;
  nome?: string | null;
  sobrenome?: string | null;
}

export function Topbar({ nome, sobrenome }: TopbarProps) {
  //teste
  //console.log("Topbar usuario:", nome, sobrenome);

  function capitalize(value?: string | null) {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  return (
    <BaseSurface
      variant="default"
      className="max-w-full rounded-3xl backdrop-blur mx-2 my-4"
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <OrganizationSwitcher />
        {/* Left Side: Mobile Menu Button (visible on mobile) + Logo */}
        {/* <div className="flex items-center gap-3"> */}
        {/* Mobile Menu Button */}
        {/* ONDE ENCAIXAER O MENU DE ORGANIZAÇÃO <OrganizationSwitcher /> NO FORMATO MOBILE ?? */}
        {/* Logo and App Name */}
        {/*          <Link
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
        </div> */}

        {/* User Dropdown */}
        <div className="hidden md:flex items-center gap-2">
          <UserButton />
          <h3 className="font-semibold hidden md:block">{`${capitalize(nome)} ${capitalize(sobrenome)}`}</h3>
        </div>
      </div>
    </BaseSurface>
  );
}
