"use client";

import React from "react";
import { Button } from "@/src/ui/Button";
import { ArrowLeft } from "@gravity-ui/icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface PageLayoutProps {
  // Page Header
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  showBackButton?: boolean;
  backButtonHref?: string;
  
  // Layout Options
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  
  // Content
  children: React.ReactNode;
}

const maxWidthClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl', 
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full'
};

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-8',
  lg: 'p-12'
};

export const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(({
  title,
  description,
  breadcrumbs,
  actions,
  showBackButton = false,
  backButtonHref = '/',
  maxWidth = 'lg',
  padding = 'md',
  className = '',
  children,
  ...props
}, ref) => {
  const maxWidthClass = maxWidthClasses[maxWidth];
  const paddingClass = paddingClasses[padding];

  const handleBackClick = () => {
    window.location.href = backButtonHref;
  };

  return (
    <div 
      ref={ref}
      className={`${maxWidthClass} ${paddingClass} mx-auto w-full ${className}`}
      {...props}
    >
      {/* Page Header */}
      {(title || description || breadcrumbs || actions || showBackButton) && (
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Left side: Back button and title/description */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {/* Back Button */}
                {showBackButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackClick}
                    className="p-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                )}
                
                {/* Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                  <nav className="flex items-center space-x-1 text-sm text-gray-500">
                    {breadcrumbs.map((item, index) => (
                      <React.Fragment key={index}>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="hover:text-gray-700 transition-colors"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <span className={item.isActive ? "text-gray-900 font-medium" : ""}>
                            {item.label}
                          </span>
                        )}
                        {index < breadcrumbs.length - 1 && (
                          <span className="mx-2 text-gray-300">/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </nav>
                )}
              </div>
              
              {/* Title */}
              {title && (
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {title}
                </h1>
              )}
              
              {/* Description */}
              {description && (
                <p className="mt-2 text-lg text-gray-600">
                  {description}
                </p>
              )}
            </div>

            {/* Actions */}
            {actions && (
              <div className="flex flex-shrink-0 items-center gap-3">
                {actions}
              </div>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
});

PageLayout.displayName = "PageLayout";