import { PageLayout } from "../PageLayout";
import { PricingTable } from "@clerk/nextjs";

export function PricingPageLayout() {
  return (
    <PageLayout
      title="Planos"
      description="Escolha o plano que melhor se adequa ao seu negócio"
      actions={<></>}
      className="w-full max-w-4xl mx-auto px-6 py-16 min-h-screen"
    >
      <div className="mt-15">
        <PricingTable for="organization" />
      </div>
    </PageLayout>
  );
}
