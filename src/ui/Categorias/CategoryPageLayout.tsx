import CategoryCardsServer from "./CategoryCardsServer";
import { CreateCategoryForm } from "./CreateCategoryForm";

type Props = {
  categoriasComSubcategorias: any[];
  orgId: string;
  userId: string;
};

export default function CategoryPageLayout({
  categoriasComSubcategorias,
  orgId,
  userId,
}: Props) {
  return (
    <main className="space-y-6">
      <CreateCategoryForm orgId={orgId} />

      <CategoryCardsServer
        categoriasComSubcategorias={categoriasComSubcategorias ?? []}
        orgId={orgId}
        userId={userId}
      />
    </main>
  );
}
