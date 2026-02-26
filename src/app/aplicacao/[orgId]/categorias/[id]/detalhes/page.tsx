import { auth } from "@clerk/nextjs/server";
import DetailPageLayout from "@/src/ui/Categorias/DetailPageLayout";
import { fetchCategoriaComSubcategoriaPorId } from "@/src/db/data";
import CreateSubcategoryForm from "@/src/ui/Categorias/CreateSubcategoryForm";
import { CreateCategoryForm } from "@/src/ui/Categorias/CreateCategoryForm";

type PageProps = {
  params: Promise<{
    id: string;
    orgId: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { id, orgId } = await params;

  // 1. Obter o userId aqui (Server Side)
  const { userId } = await auth();

  const categoriaInfo = await fetchCategoriaComSubcategoriaPorId(id);

  if (!categoriaInfo) {
    return <div>Categoria não encontrada.</div>;
  }

  return (
    <main>
      <DetailPageLayout
        categoriaInfo={categoriaInfo}
        orgId={orgId}
        userId={userId} // 2. Passar o userId para satisfazer as Props
        parent_id={id}
      />
    </main>
  );
}
