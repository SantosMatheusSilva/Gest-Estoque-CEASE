import { Surface, SurfaceProps } from "@heroui/react";

interface FormSurfaceProps extends SurfaceProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
}

export function FormSurface({
  className,
  children,
  title,
  ...props
}: FormSurfaceProps) {
  return (
    <Surface
      className={
        "flex min-w-[320px] max-w-100 flex-col gap-3 rounded-3xl border p-6"
      }
      variant="default"
      {...props}
    >
      <h2>{title}</h2>
      {children}
    </Surface>
  );
}
