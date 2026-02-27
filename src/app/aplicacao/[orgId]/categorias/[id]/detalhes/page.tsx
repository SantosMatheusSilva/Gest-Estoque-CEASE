import { auth } from "@clerk/nextjs/server";
import DetailPageLayout from "@/src/ui/Categorias/DetailPageLayout";
import { fetchCategoriaComSubcategoriaPorId } from "@/src/db/data";

type PageProps = { params: Promise<{ orgId: string; id: string }> };

export default async function Page({ params }: PageProps) {
  const { orgId, id } = await params; // await nos params
  const { userId } = await auth();

  if (!id) return <div>ID inválido.</div>;

  const categoriaInfo = await fetchCategoriaComSubcategoriaPorId(id);
  if (!categoriaInfo) return <div>Categoria não encontrada.</div>;

  return (
    <main className="space-y-6">
      <DetailPageLayout
        categoriaInfo={categoriaInfo}
        parent_id={id}
        orgId={orgId}
        userId={userId ?? ""}
      />
    </main>
  );
}
