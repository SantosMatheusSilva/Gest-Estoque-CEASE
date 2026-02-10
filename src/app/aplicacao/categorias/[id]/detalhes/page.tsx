import DetailPageLayout from "@/src/ui/Categorias/DetailPageLayout";
import { fetchCategoriaComSubcategoriaPorId } from "@/src/db/data";
import  CreateSubcategoryForm  from "@/src/ui/Categorias/CreateSubcategoryForm";

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
      <DetailPageLayout categoriaInfo={categoriaInfo } parent_id={categoriaInfo.id_categoria } />
      {/* <CreateSubcategoryForm /> */}
    </main>
  );
}
