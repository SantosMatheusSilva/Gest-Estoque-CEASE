import { PageLayout } from "../PageLayout";
import CategoryCards from "./CategoryCard";
import { IconButton } from "../IconButton";
import { Plus } from "@gravity-ui/icons";

function CategoryPageLayout() {
  return (
    <PageLayout
      title="Categorias"
      description="Lista de categorias e subcategorias"
      actions={
        <IconButton startIcon={<Plus />}>Adicionar Categoria</IconButton>
      }
    >
      <CategoryCards />
    </PageLayout>
  );
}

export default CategoryPageLayout;
