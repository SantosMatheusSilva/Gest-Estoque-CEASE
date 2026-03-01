//"use client";

import { Topbar } from "@/src/ui/Topbar";
import Sidenav from "@/src/ui/Sidenav";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { bootstrapUser } from "@/src/db/bootstrapUser";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{ orgId: string }>;
};

export default async function AppLayout({ children, params }: Props) {
  const { orgId } = await params;
  // Extrair dados do usuario da sessão (Clerk)
  const { userId, orgId: activeOrgId, sessionClaims } = await auth();
  // retornar caso nenhum id seja encontrado: MELHOR PARA REDIRECIONAR DEPOIS
  if (!userId) redirect("/");
  //console.log("authObj:", sessionClaims, orgId, activeOrgId);
  //chamar bootstrapUser para criar o usuario na db caso nao exista.
  /* const usuarioDb = */ await bootstrapUser({
    clerkUserId: userId,
    email: (sessionClaims.emailAdress ?? sessionClaims.email) as string, //add ANA
    orgId: activeOrgId ?? undefined,
    orgName: (sessionClaims.org_name as string) ?? undefined, //add ANA
    orgRole: (sessionClaims.org_role as string) ?? undefined, //add ANA
  });
  // se o usuario não tiver uma org, retornar: MELHOR PARA REDIRECIONAR DEPOIS
  if (!activeOrgId) redirect("/aplicacao");

  // ao trocar de org, redirecionar e actualizar o layout e params para o orgId ativo/atual -> muda toda a fonte de informações do layout
  // orgId(business_id) = activeOrgId
  if (orgId !== activeOrgId) {
    redirect(`/aplicacao/${activeOrgId}`);
  }

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
          <Topbar
            nome={sessionClaims.firstName as string}
            sobrenome={sessionClaims.lastName as string}
          />
          {/* Conteúdo */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SignedIn>
  );
}
