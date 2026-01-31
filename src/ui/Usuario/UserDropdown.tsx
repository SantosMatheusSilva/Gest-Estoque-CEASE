"use client";

import { Avatar, Dropdown } from "@heroui/react";
import type { UsuarioPublico } from "@/src/db/definitions";

export interface UserDropdownProps {
  usuario: UsuarioPublico;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

// Helper function to get initials from name
const getInitials = (nome: string, sobrenome: string): string => {
  return `${nome.charAt(0)}${sobrenome.charAt(0)}`.toUpperCase();
};

export function UserDropdown({
  usuario,
  onProfileClick,
  onLogoutClick,
}: UserDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Trigger className="flex items-center gap-2 p-2 rounded-lg hover:bg-default-100 transition-colors cursor-pointer">
        <Avatar size="sm" className="flex-shrink-0">
          {usuario.img_url ? (
            <Avatar.Image src={usuario.img_url} alt={usuario.nome} />
          ) : (
            <Avatar.Fallback color="accent">
              {getInitials(usuario.nome, usuario.sobrenome)}
            </Avatar.Fallback>
          )}
        </Avatar>
        <div className="text-left sm:block hidden">
          <div className="text-sm font-medium text-foreground">
            {usuario.nome}
          </div>
          <div className="text-xs text-foreground-500">{usuario.email}</div>
        </div>
      </Dropdown.Trigger>

      <Dropdown.Popover placement="bottom end" className="min-w-50">
        <Dropdown.Menu
          aria-label="User menu"
          onAction={(key) => {
            if (key === "profile" && onProfileClick) {
              onProfileClick();
            } else if (key === "logout" && onLogoutClick) {
              onLogoutClick();
            }
          }}
        >
          <Dropdown.Item key="profile" textValue="Perfil">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Perfil
            </div>
          </Dropdown.Item>
          <Dropdown.Item key="settings" textValue="Definições">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Definições
            </div>
          </Dropdown.Item>
          <Dropdown.Item key="logout" textValue="Sair" variant="danger">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sair
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
