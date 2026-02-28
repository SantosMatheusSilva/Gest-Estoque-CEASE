import { PageLayout } from "../PageLayout";
import MovimentsTable from "./MovimentsTable";
import CreateMovimentForm from "./CreateMovimentForm";
import { MovimentsTableProps } from "./MovimentsTable";
import { fetchMovimentosComProduto } from "@/src/db/data";
import { auth } from "@clerk/nextjs/server";
import BaseSurface from "../Surface";

export default async function MovimentsPageLayout() {
  const { orgId } = await auth();
  const data = await fetchMovimentosComProduto(orgId as string);
  return (
    <PageLayout
      title="Movimentos de Estoque"
      description="Movimentação de produtos em estoque"
      actions={
        <div className="flex gap-2">
          <CreateMovimentForm />
        </div>
      }
    >
      <MovimentsTable data={data} />
    </PageLayout>
  );
}
