"use client";

import { Topbar } from "@/src/ui/Topbar";
import { UsuarioPublico } from "@/src/db/definitions";
import Sidenav from "@/src/ui/Sidenav";

// Mock user data - this will be replaced with actual authentication later
const mockUser: UsuarioPublico = {
  id: "1",
  nome: "João Silva",
  sobrenome: "Silva",
  email: "joao.silva@empresa.pt",
  img_url: "https://via.placeholder.com/150", // or a placeholder image URL
  adm: false,
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar esquerda */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0 ">
        <Sidenav />
      </aside>

      {/* Coluna direita */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar usuario={mockUser} />

        {/* Conteúdo */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
