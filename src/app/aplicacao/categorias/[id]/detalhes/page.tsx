import DetailPageLayout from "@/src/ui/Categorias/DetailPageLayout";
import { fetchCategoriaComSubcategoriaPorId } from "@/src/db/data";

type PageProps = {
  params: {
    id: string;
  };
};
export default async function page({ params }: PageProps) {
  const { id } = await params;
  const categoriaInfo = await fetchCategoriaComSubcategoriaPorId(id);

  return (
    <main>
      <DetailPageLayout categoriaInfo={categoriaInfo} />
    </main>
  );
}
