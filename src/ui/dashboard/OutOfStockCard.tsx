import React from "react";
import { KpiCard } from "./KpiCard";
import { TrashBin } from "@gravity-ui/icons";

export function OutOfStockCard() {
  // Mock data - replace with actual data fetching
  const outOfStockItems = 8;

  return (
    <KpiCard
      title="Itens Sem Stock"
      value={`${outOfStockItems} itens`}
      icon={<TrashBin />}
      variant="danger"
      trend={{
        value: "+2 desde ontem",
        direction: "up"
      }}
    />
  );
}