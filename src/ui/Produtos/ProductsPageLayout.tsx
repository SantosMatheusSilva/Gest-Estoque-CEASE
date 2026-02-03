import { PageLayout } from "../PageLayout";
import { CreateProductForm } from "@/src/ui/Produtos/CreateProductForm";
import ProductCard from "./ProductCard";
import { CategoriaRaiz } from "@/src/db/definitions";

interface ProductsPageLayoutProps {
  categorias: CategoriaRaiz[];
}
function CategoryPageLayout({ categorias }: ProductsPageLayoutProps) {
  return (
    <PageLayout
      title="Produtos"
      description="Lista de produtos em stock"
      actions={
        <div className="flex gap-2">
          <CreateProductForm categorias={categorias} />
        </div>
      }
    >
      <ProductCard />
    </PageLayout>
  );
}

export default CategoryPageLayout;
