interface TiitleProps {
  children: React.ReactNode;
  className?: string;
}

function Tiitle({ children, className }: TiitleProps) {
  return (
    <h2 className={`text-2xl font-semibold text-foreground ${className ?? ""}`}>
      {children}
    </h2>
  );
}

export default Tiitle;
