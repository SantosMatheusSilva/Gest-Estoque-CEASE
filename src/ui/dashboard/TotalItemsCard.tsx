import React from "react";
import { KpiCard } from "./KpiCard";
import { LayoutList } from "@gravity-ui/icons";

interface TotalItemsCardProps {
  totalItems: number;
  trend?: { value: string; direction: "up" | "down" };
}

export function TotalItemsCard({ totalItems, trend }: TotalItemsCardProps) {
  return (
    <KpiCard
      title="Stock Total"
      value={`${totalItems.toLocaleString('pt-PT')} un.`}
      icon={<LayoutList className="w-6 h-6" />}
      variant="primary"
      trend={trend}
    />
  );
}

