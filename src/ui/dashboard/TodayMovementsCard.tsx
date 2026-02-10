import React from "react";
import { KpiCard } from "./KpiCard";
import { ArrowsRotateLeft } from "@gravity-ui/icons";

interface TodayMovementsCardProps {
  entradas: number;
  saidas: number;
}

export function TodayMovementsCard({ entradas, saidas }: TodayMovementsCardProps) {
  const net = entradas - saidas;
  
  return (
    <KpiCard
      title="Movimentos Hoje"
      value={`+${entradas} / -${saidas}`}
      icon={<ArrowsRotateLeft className="w-6 h-6" />}
      variant="warning"
      trend={{
        value: `Net ${net >= 0 ? '+' : ''}${net}`,
        direction: net >= 0 ? "up" : "down"
      }}
    />
  );
}
