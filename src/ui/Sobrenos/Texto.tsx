import { Text } from "@heroui/react";
import { ReactNode } from "react";

type TextoProps = {
  children: ReactNode;
  className?: string;
  size?: "base" | "lg" | "sm" | "xl" | "xs";
  color?: string;
};

export function Texto({
  children,
  className,
  size = "base",
  color = "foreground-muted",
}: TextoProps) {
  return (
    <Text size={size} color={color} className={className}>
      {children}
    </Text>
  );
}
