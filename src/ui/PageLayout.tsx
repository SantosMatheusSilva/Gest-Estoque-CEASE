import Tiitle from "./Usuario/Tiitle";

type PageLayoutProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function PageLayout({
  title,
  description,
  actions,
  children,
}: PageLayoutProps) {
  return (
    <div className="flex h-full flex-col px-6 py-4 gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Tiitle>{title}</Tiitle>
          <p>{description}</p>
        </div>
        <div>{actions}</div>
      </div>
      {children}
    </div>
  );
}
