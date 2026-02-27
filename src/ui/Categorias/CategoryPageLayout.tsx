"use client";
import { CreateCategoryForm } from "./CreateCategoryForm";
import CategoryCards from "./CategoryCard";

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
      <CategoryCards
        categoriasComSubcategorias={categoriasComSubcategorias ?? []}
        orgId={orgId}
        userId={userId}
      />
    </main>
  );
}
