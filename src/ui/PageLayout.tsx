type PageLayoutProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
};

export function PageLayout({ header, children }: PageLayoutProps) {
  return (
    <div className="flex h-full flex-col px-6 py-4 gap-6">
      {header && <div className="shrink-0">{header}</div>}

      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
