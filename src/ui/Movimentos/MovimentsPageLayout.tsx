import { PageLayout } from "../PageLayout";
import MovimentsTable from "./MovimentsTable";
import { IconButton } from "../IconButton";
import { Plus } from "@gravity-ui/icons";

export default function MovimentsPageLayout() {
  return (
    <PageLayout
      title="Movimentos de Estoque"
      description="Movimentação de produtos em estoque"
      actions={
        <div className="flex gap-2">
          <IconButton>
            <Plus />
            Movimento
          </IconButton>
        </div>
      }
    >
      <div className="mt-5">
        <MovimentsTable />
      </div>
    </PageLayout>
  );
}
