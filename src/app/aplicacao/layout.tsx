//"use client";

import { Topbar } from "@/src/ui/Topbar";
import Sidenav from "@/src/ui/Sidenav";
import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usuario = await currentUser();
  //test
  /*   console.log("Current User:", usuario);
  console.log("First Name:", usuario?.firstName);
  console.log("Last Name:", usuario?.lastName); */
  return (
    <SignedIn>
      <div className="h-screen flex bg-background">
        {/* Sidebar esquerda */}
        <aside className="hidden md:flex flex-col w-64 flex-shrink-0 ">
          <Sidenav />
        </aside>

        {/* Coluna direita */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Topbar */}
          <Topbar nome={usuario?.firstName} sobrenome={usuario?.lastName} />
          {/* Conteúdo */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SignedIn>
  );
}
