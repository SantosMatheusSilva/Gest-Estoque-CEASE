import { PageLayout } from "../PageLayout";
import { IconButton } from "../IconButton";
import { Plus } from "@gravity-ui/icons";
import { TotalItemsCard } from "./TotalItemsCard";
import { LowStockCard } from "./LowStockCard";
import { InventoryValueCard } from "./InventoryValueCard";
import { TodayMovementsCard } from "./TodayMovementsCard";
import { ProductsTable } from "./ProductsTable";
import type { ProdutoType } from "@/src/db/definitions";
import CreateMovimentForm from "../Movimentos/CreateMovimentForm";

interface DashboardData {
  kpis: {
    totalStock: number;
    lowStockCount: number;
    todayMovements: { entradas: number; saidas: number; ajustes: number };
    inventoryValue: number;
  };
  produtos: ProdutoType[];
}

export default function DashboardPageLayout({ data }: { data: DashboardData }) {
  return (
    <PageLayout
      title="Dashboard"
      description="Visão geral do seu stock"
      actions={
        <div className="flex gap-2">
          <CreateMovimentForm />
        </div>
      }
    >
      {/* Grid de Cards KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TotalItemsCard
          totalItems={data.kpis.totalStock}
          trend={{ value: "+5%", direction: "up" }}
        />
        <LowStockCard lowStockCount={data.kpis.lowStockCount} />
        <TodayMovementsCard
          entradas={data.kpis.todayMovements.entradas}
          saidas={data.kpis.todayMovements.saidas}
        />
        <InventoryValueCard value={data.kpis.inventoryValue} />
      </div>

      {/* Tabela de Produtos */}
      <ProductsTable produtos={data.produtos} />
    </PageLayout>
  );
}
