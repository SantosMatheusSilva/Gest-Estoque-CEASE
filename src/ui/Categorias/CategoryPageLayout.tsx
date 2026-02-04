import { PageLayout } from "../PageLayout";
import CategoryCards from "./CategoryCard";
import { CreateCategoryForm } from "./CreateCategoryForm";

function CategoryPageLayout() {
  return (
    <PageLayout
      title="Categorias"
      description="Lista de categorias e subcategorias"
      actions={<CreateCategoryForm />}
    >
      <CategoryCards />
    </PageLayout>
  );
}

export default CategoryPageLayout;
