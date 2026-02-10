import React from "react";
import { KpiCard } from "./KpiCard";
import { TriangleExclamation } from "@gravity-ui/icons";

interface LowStockCardProps {
  lowStockCount: number;
}

export function LowStockCard({ lowStockCount }: LowStockCardProps) {
  return (
    <KpiCard
      title="Itens com Stock Baixo"
      value={`${lowStockCount} itens`}
      icon={<TriangleExclamation className="w-6 h-6" />}
      variant="danger"
      trend={lowStockCount > 0 ? {
        value: "Requer atenção",
        direction: "up"
      } : undefined}
    />
  );
}
