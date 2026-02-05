import { PageLayout } from "../PageLayout";
import { IconButton } from "../IconButton";
import { Plus } from "@gravity-ui/icons";

export default function DashboardPageLayout() {
  return (
    <PageLayout
      title="Dashboard"
      description="Bem vindo ao dashboard"
      actions={
        <div className="flex gap-2">
          <IconButton>
            <Plus></Plus>Movimento
          </IconButton>
        </div>
      }
    >
      <div>
        <h1 className="text-4xl font-semibold">coming soon</h1>
      </div>
    </PageLayout>
  );
}
