import DetailPageLayout from "@/src/ui/Produtos/ProductDetailPageLayout";
import { fetchProduto } from "@/src/lib/data";
import { CategoriaRaiz, Produto, ProdutoType } from "@/src/db/definitions";
import {
  fetchCategoriaComSubcategoriaPorId,
  fetchUsuarioDbById,
} from "@/src/db/data";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { fetchMovimentosEstoquePorProduto } from "@/src/db/data";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const { orgId } = await auth();

  //console.log("id: ", id);
  const data = await fetchMovimentosEstoquePorProduto(orgId as string, id);
  const produto: ProdutoType | null = await fetchProduto(id, orgId as string);
  if (!produto) return notFound();
  const { clerk_user_id } = await fetchUsuarioDbById(produto.adicionado_por);

  // ✅ Proteção contra id_categoria null (produtos antigos)
  const categoria = produto.id_categoria
    ? await fetchCategoriaComSubcategoriaPorId(produto.id_categoria)
    : null;

  return (
    <main>
      <DetailPageLayout
        produto={produto}
        categorias={categoria ? [categoria] : []}
        data={data ? data : []}
        clerk_user_id={clerk_user_id}
      />
    </main>
  );
}
