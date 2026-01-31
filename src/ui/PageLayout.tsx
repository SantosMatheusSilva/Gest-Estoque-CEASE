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
    <div className="flex h-full flex-col py-2 gap-6 w-full mx-auto">
      <div className="flex justify-between items-center sm:flex-row flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Tiitle>{title}</Tiitle>
          <h3>{description}</h3>
        </div>
        <div>{actions}</div>
      </div>
      {children}
    </div>
  );
}
