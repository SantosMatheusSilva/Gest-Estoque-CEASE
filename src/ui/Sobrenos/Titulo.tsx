import { ReactNode } from "react";

type TituloProps = {
  children: ReactNode;
};

export function Titulo({ children }: TituloProps) {
  return (
    <h2 className="text-2xl font-semibold text-foreground">
      {children}
    </h2>
  );
}
