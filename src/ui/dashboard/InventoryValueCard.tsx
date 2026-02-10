import React from "react";
import { KpiCard } from "./KpiCard";
import { CircleDollar } from "@gravity-ui/icons";

interface InventoryValueCardProps {
  value: number;
}

export function InventoryValueCard({ value }: InventoryValueCardProps) {
  return (
    <KpiCard
      title="Valor em Stock"
      value={`€${value.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      icon={<CircleDollar className="w-6 h-6" />}
      variant="success"
    />
  );
}


