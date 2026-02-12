import DetailPageLayout from "@/src/ui/Produtos/ProductDetailPageLayout";
import { fetchProduto } from "@/src/lib/data";
import { CategoriaRaiz, Produto } from "@/src/db/definitions";
import { fetchCategoriaComSubcategoriaPorId } from "@/src/db/data";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  console.log("id: ", id);

  const produto: Produto | null = await fetchProduto(id);
  if (!produto) return notFound();

  const categoria: CategoriaRaiz = await fetchCategoriaComSubcategoriaPorId(
    produto.id_categoria,
  );

  return (
    <main>
      <DetailPageLayout produto={produto} categorias={[categoria]} />
    </main>
  );
}
