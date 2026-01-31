import { ReactNode } from "react";
import { de } from "zod/locales";

type TituloProps = {
  children: ReactNode;
  className?: string;
};

export default function Titulo({ children, className }: TituloProps) {
  return (
    <h2 className={`text-2xl font-semibold text-foreground ${className ?? ""}`}>
      {children}
    </h2>
  );
}
