import DetailPageLayout from "@/src/ui/Produtos/ProductDetailPageLayout";
import { fetchProduto } from "@/src/lib/data";
import { CategoriaRaiz, Produto } from "@/src/db/definitions";
import { fetchCategoriaComSubcategoriaPorId } from "@/src/db/data";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id_Produto: string;
  };
};

export default async function ProductDetailsPage({ params }: Props) {
  const { id_Produto } = params;

  const produto: Produto | null = await fetchProduto(id_Produto);
  if (!produto) return notFound();

  const categoria: CategoriaRaiz = await fetchCategoriaComSubcategoriaPorId(
    produto.id_categoria,
  );

  return (
    <main>
      <DetailPageLayout produto={produto} categoria={categoria} />
    </main>
  );
}
