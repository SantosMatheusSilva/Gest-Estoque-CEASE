import { fetchCategoriaComSubcategorias } from "@/src/db/data";
import ProductPageLayout from "@/src/ui/Produtos/ProductsPageLayout";
import { CategoriaRaiz, Produto } from "@/src/db/definitions";
import { fetchAllProdutos } from "@/src/lib/data";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function ProdutosPage() {
  const { orgId } = (await auth()) as { orgId: string };
  const produtos: Produto[] = await fetchAllProdutos();
  if (!produtos) notFound();
  const categorias: CategoriaRaiz[] =
    await fetchCategoriaComSubcategorias(orgId);
  //console.log("categorias:", categorias);
  return (
    <main>
      <ProductPageLayout categorias={categorias} produtos={produtos} />
    </main>
  );
}
