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

  // ✅ Proteção contra id_categoria null (produtos antigos)
  const categoria = produto.id_categoria
    ? await fetchCategoriaComSubcategoriaPorId(produto.id_categoria)
    : null;

  return (
    <main>
      <DetailPageLayout
        produto={produto}
        categorias={categoria ? [categoria] : []}
      />
    </main>
  );
}

