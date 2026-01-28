import { Button as EnhancedButton } from "./Button";
import React from "react";

interface IconButtonProps extends React.ComponentProps<typeof EnhancedButton> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  iconOnly?: boolean;
}

export const IconButton = React.forwardRef<
  React.ElementRef<typeof EnhancedButton>,
  IconButtonProps
>(({ startIcon, endIcon, iconOnly, children, ...props }, ref) => {
  const isIconOnly = iconOnly || !children;
  
  const content = (
    <>
      {startIcon && !isIconOnly && startIcon}
      {children}
      {endIcon && !isIconOnly && endIcon}
      {isIconOnly && (startIcon || endIcon)}
    </>
  );

  return (
    <EnhancedButton 
      ref={ref} 
      {...props} 
      isIconOnly={isIconOnly}
    >
      {content}
    </EnhancedButton>
  );
});

IconButton.displayName = "IconButton";