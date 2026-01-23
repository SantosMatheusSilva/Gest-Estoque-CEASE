import { ReactNode } from "react";

type TituloProps = {
  children: ReactNode;
  className?: string;
};

export function Titulo({ children, className }: TituloProps) {
  return (
    <h2 className={`text-2xl font-semibold text-foreground ${className ?? ""}`}>
      {children}
    </h2>
  );
}
