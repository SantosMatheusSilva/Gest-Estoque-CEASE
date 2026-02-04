import React from "react";
import { KpiCard } from "./KpiCard";
import { Plus } from "@gravity-ui/icons";

export function LowStockCard() {
  // Mock data - replace with actual data fetching
  const lowStockItems = 23;
  const threshold = 10;

  return (
    <KpiCard
      title="Itens com Stock Baixo"
      value={`${lowStockItems} itens (< ${threshold})`}
      icon={<Plus />}
      variant="warning"
      trend={{
        value: "+3 novos",
        direction: "up"
      }}
    />
  );
}