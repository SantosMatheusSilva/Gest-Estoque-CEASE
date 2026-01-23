import { Text } from "@heroui/react";
import { ReactNode } from "react";

type TextoProps = {
  children: ReactNode;
};

export function Texto({ children }: TextoProps) {
  return (
    <Text size="base" color="foreground-muted">
      {children}
    </Text>
  );
}
