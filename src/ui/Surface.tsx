import { Surface as HeroUISurface, SurfaceProps } from "@heroui/react";

interface BaseSurfaceProps extends SurfaceProps {
  className?: string;
  children: React.ReactNode;
}

export default function BaseSurface({
  className = "flex min-w-[320px] flex-col gap-3 rounded-3xl p-6 overflow-y-auto max-h-100",
  variant = "secondary",
  ...props
}: BaseSurfaceProps) {
  return <HeroUISurface {...props} className={className} variant={variant} />;
}
