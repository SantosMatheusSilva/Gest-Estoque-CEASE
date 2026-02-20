import DashboardPageLayout from "@/src/ui/dashboard/DashLayoutPage";
import { fetchDashboardKPIs, fetchDashboardProducts } from "@/src/db/data";
import { ProdutoType } from "@/src/db/definitions";
import { currentUser, auth } from "@clerk/nextjs/server";
import { fetchUsuarioDB } from "@/src/db/data";

async function Page() {
  const user = await currentUser();
  const { orgId: org_id } = await auth();
  console.log("user -->", user);
  console.log("orgId -->", org_id);
  if (!user) {
    return <div className="p-8">Não autorizado</div>;
  }

  const usuario = await fetchUsuarioDB(user.id);

  if (!usuario) {
    return <div className="p-8">Utilizador não encontrado</div>;
  }

  // DEBUG - Ver business_id
  //console.log("=".repeat(50));
  //console.log("🔑 Clerk User ID:", user.id);
  //console.log("👤 Usuario:", usuario);
  //console.log("🏢 Business ID:", usuario.business_id);
  //console.log("=".repeat(50));

  let kpis = {
    totalStock: 0,
    lowStockCount: 0,
    todayMovements: { entradas: 0, saidas: 0, ajustes: 0 },
    inventoryValue: 0,
  };
  let produtos: ProdutoType[] = [];

  if (org_id) {
    kpis = await fetchDashboardKPIs(org_id);
    produtos = await fetchDashboardProducts(org_id);

    // DEBUG - Ver resultados
    console.log("📊 KPIs:", kpis);
    console.log("📦 Produtos:", produtos.length, "itens");
    if (produtos.length > 0) {
      console.log("📦 Primeiro produto:", produtos[0]);
    }
    console.log("=".repeat(50));
  }

  return (
    <main>
      <DashboardPageLayout
        data={{
          kpis,
          produtos,
        }}
      />
    </main>
  );
}

export default Page;
