import React from "react";
import { TotalItemsCard } from "./TotalItemsCard";
import { InventoryValueCard } from "./InventoryValueCard";
import { LowStockCard } from "./LowStockCard";
import { OutOfStockCard } from "./OutOfStockCard";

export function DashboardCards() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TotalItemsCard />
        <InventoryValueCard />
        <LowStockCard />
        <OutOfStockCard />
      </div>
    </div>
  );
}