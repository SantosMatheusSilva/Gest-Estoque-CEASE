import React from "react";
import { KpiCard } from "./KpiCard";
import { TriangleExclamation } from "@gravity-ui/icons";

interface OutOfStockCardProps {
  count?: number;
}

export function OutOfStockCard({ count = 0 }: OutOfStockCardProps) {
  return (
    <KpiCard
      title="Produtos Sem Stock"
      value={`${count} itens`}
      icon={<TriangleExclamation className="w-6 h-6" />}
      variant="danger"
    />
  );
}
