import React from "react";
import { KpiCard } from "./KpiCard";
import { Box } from "@gravity-ui/icons";

export function TotalItemsCard() {
  // Mock data - replace with actual data fetching
  const totalItems = 1247;
  const trendValue = "+5.2%";

  return (
    <KpiCard
      title="Total de Itens em Stock"
      value={totalItems.toLocaleString("pt-PT")}
      icon={<Box />}
      variant="primary"
      trend={{
        value: trendValue,
        direction: "up"
      }}
    />
  );
}