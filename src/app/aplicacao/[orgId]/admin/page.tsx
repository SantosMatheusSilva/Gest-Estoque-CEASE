// src/app/aplicacao/[orgId]/admin/page.tsx

import { auth } from "@clerk/nextjs/server";
import { Protect } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { sql } from "@/src/db/index";
import {
  fetchDashboardKPIs,
  fetchDashboardProducts,
  fetchMovimentosComProduto,
} from "@/src/db/data";
import AdminPageLayout from "@/src/ui/Admin/AdminPageLayout";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  const { userId, orgRole } = await auth();

  // Verificar se é admin — se não for, redirecionar
  /*   const membershipResult = await sql`
    SELECT bm.role
    FROM business_memberships bm
    INNER JOIN usuarios u ON u.id = bm.user_id
    INNER JOIN business b ON b.id = bm.business_id
    WHERE u.clerk_user_id = ${userId}
      AND b.clerk_org_id = ${orgId}
    LIMIT 1
  `; */

  //const isAdmin = membershipResult?.[0]?.role === "admin";
  const isAdmin = orgRole === "org:admin";
  if (!isAdmin) redirect(`/aplicacao/${orgId}`);

  // Fetch de dados em paralelo
  const [kpis, produtos, movimentosRaw] = await Promise.all([
    fetchDashboardKPIs(orgId),
    fetchDashboardProducts(orgId),
    fetchMovimentosComProduto(orgId),
  ]);

  return (
    <main>
      <Protect
        condition={(has) =>
          has({ role: "org:admin" }) && has({ plan: "o:pro" })
        }
        fallback={
          <div>
            <h1>Painel Administrativo</h1>
            <p>Apenas disponivel para Admins de planos Pro </p>
          </div>
        }
      >
        <AdminPageLayout
          data={{
            kpis,
            produtos,
            movimentos: movimentosRaw as unknown as any[],
          }}
        />
      </Protect>
    </main>
  );
}
