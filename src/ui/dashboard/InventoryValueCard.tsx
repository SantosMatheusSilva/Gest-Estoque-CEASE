import React from "react";
import { KpiCard } from "./KpiCard";
import { Copy } from "@gravity-ui/icons";

export function InventoryValueCard() {
  // Mock data - replace with actual data fetching
  const inventoryValue = 45890;
  const trendValue = "+12.3%";

  return (
    <KpiCard
      title="Valor Total do Inventário"
      value={`€${inventoryValue.toLocaleString("pt-PT")}`}
      icon={<Copy />}
      variant="success"
      trend={{
        value: trendValue,
        direction: "up"
      }}
    />
  );
}