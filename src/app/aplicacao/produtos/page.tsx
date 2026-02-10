import { fetchCategoriaComSubcategorias } from "@/src/db/data";
import ProductPageLayout from "@/src/ui/Produtos/ProductsPageLayout";
import { CategoriaRaiz, Produto } from "@/src/db/definitions";
import { fetchAllProdutos } from "@/src/lib/data";
import { notFound } from "next/navigation";

export default async function ProdutosPage() {
  const produtos: Produto[] = await fetchAllProdutos();
  if (!produtos) notFound();
  const categorias: CategoriaRaiz[] = await fetchCategoriaComSubcategorias();
  //console.log("categorias:", categorias);
  return (
    <main>
      <ProductPageLayout categorias={categorias} produtos={produtos} />
    </main>
  );
}
