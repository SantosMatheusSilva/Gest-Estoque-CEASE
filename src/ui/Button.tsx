import { Button as HeroUIButton, ButtonProps } from "@heroui/react";

interface EnhancedButtonProps extends ButtonProps {
  className?: string;
}

export function Button({ className, ...props }: EnhancedButtonProps) {
  return <HeroUIButton {...props} className={className} />;
}
