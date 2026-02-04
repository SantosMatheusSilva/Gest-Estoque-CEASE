import React from "react";
import { Surface } from "@heroui/react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  variant: "primary" | "success" | "warning" | "danger";
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  className?: string;
}

export function KpiCard({ title, value, icon, variant, trend, className }: KpiCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950";
      case "success":
        return "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950";
      case "warning":
        return "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950";
      case "danger":
        return "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950";
      default:
        return "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "primary":
        return "text-blue-600 dark:text-blue-400";
      case "success":
        return "text-green-600 dark:text-green-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "danger":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <Surface
      className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${getVariantStyles()} ${className}`}
      variant="secondary"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.direction === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.direction === "up" ? "↑" : "↓"} {trend.value}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${getIconColor()}`}>
          {icon}
        </div>
      </div>
    </Surface>
  );
}