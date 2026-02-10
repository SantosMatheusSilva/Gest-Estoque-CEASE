import React from "react";
import { TotalItemsCard } from "./TotalItemsCard";
import { InventoryValueCard } from "./InventoryValueCard";
import { LowStockCard } from "./LowStockCard";
import { OutOfStockCard } from "./OutOfStockCard";

interface DashboardCardsProps {
  totalItems?: number;
  inventoryValue?: number;
  lowStockCount?: number;
  outOfStockCount?: number;
}

export function DashboardCards({
  totalItems = 0,
  inventoryValue = 0,
  lowStockCount = 0,
  outOfStockCount = 0,
}: DashboardCardsProps = {}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TotalItemsCard totalItems={totalItems} />
        <InventoryValueCard value={inventoryValue} />
        <LowStockCard lowStockCount={lowStockCount} />
        <OutOfStockCard count={outOfStockCount} />
      </div>
    </div>
  );
}

