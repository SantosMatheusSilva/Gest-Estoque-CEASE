"use client";

import { PageLayout } from "@/src/ui/PageLayout";
import { Button } from "@/src/ui/Button";
import { IconButton } from "@/src/ui/IconButton";
import { Plus, TrashBin } from "@gravity-ui/icons";
import { InputField } from "@/src/ui/InputField";
import { FormSurface } from "@/src/ui/FormSurface";
import Form from "next/form";
import { CreateCategoryForm } from "@/src/ui/Categorias/CreateCategoryForm";
//import { EditCategoryForm } from "@/src/ui/Categorias/EditCategoryForm";
//import { EditSubcategoryForm } from "@/src/ui/Categorias/EditSubcategoryForm";
import { DashboardCards } from "@/src/ui/dashboard";

export default function TestComponentsPage() {
  /*   const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/app' },
    { label: 'Component Testing', isActive: true }
  ];  */

  // Mock data for testing forms
  //const [nome, setNome] = useState("");
  //const [subcatNome, setSubcatNome] = useState("");

  // Mock category data
  /*   const mockCategory = {
    id_categoria: "cat-123",
    nome: "Bebidas",
  }; */

  /*   const mockSubcategory = {
    id_categoria: "subcat-456",
    nome: "Refrigerantes",
    parent_id: "cat-123",
  }; */

  /*   const mockParentCategories = [
    { id_categoria: "cat-123", nome: "Bebidas" },
    { id_categoria: "cat-789", nome: "Comidas" },
    { id_categoria: "cat-101", nome: "Laticínios" },
  ]; */

  /*   const mockParentCategory = {
    id_categoria: "cat-123",
    nome: "Bebidas",
  }; */

  // Mock submit handlers
  /*   const handleCreateCategory = async (data: {
    nome: string;
    adicionado_por: string;
  }) => {
    console.log("Create Category:", data);
    alert(`Categoria criada: ${data.nome}`);
  }; */

  /*   const handleEditCategory = async (data: {
    id_categoria: string;
    nome: string;
  }) => {
    console.log("Edit Category:", data);
    alert(`Categoria editada: ${data.nome}`);
  }; */

  /*   const handleCreateSubcategory = async (data: {
    nome: string;
    parent_id: string;
    adicionado_por: string;
  }) => {
    console.log("Create Subcategory:", data);
    alert(`Subcategoria criada: ${data.nome} (parent: ${data.parent_id})`);
  }; */

  /*   const handleEditSubcategory = async (data: {
    id_categoria: string;
    nome: string;
    parent_id: string;
  }) => {
    console.log("Edit Subcategory:", data);
    alert(`Subcategoria editada: ${data.nome} (parent: ${data.parent_id})`);
  }; */

  return (
    <PageLayout
      title="Component Testing"
      description="Test and demonstrate UI components and layouts"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">Reset</Button>
          <Button variant="primary">Export</Button>
        </div>
      }
    >
      {/* Enhanced Button Tests */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Enhanced Button</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white">
            Custom Style
          </Button>
          <Button isDisabled>Disabled</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* IconButton Tests */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Icon Button</h2>
        <div className="flex flex-wrap gap-4">
          <IconButton startIcon={<Plus />}>Add Item</IconButton>
          <IconButton endIcon={<TrashBin />}>Delete</IconButton>
          <IconButton iconOnly startIcon={<TrashBin />} />
          <IconButton
            startIcon={<Plus />}
            variant="primary"
            className="bg-green-500 hover:bg-green-600"
          >
            Create
          </IconButton>
          <IconButton iconOnly endIcon={<Plus />} variant="outline" />
        </div>
      </section>

      {/* Dashboard KPI Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Dashboard KPI Cards</h2>
        <DashboardCards />
      </section>

      {/* Back to Home */}
      <div className="mt-8">
        <Button onClick={() => (window.location.href = "/")}>
          Back to Home
        </Button>
      </div>

      {/* Category Forms Tests */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Category Forms</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Category Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Create Category Form</h3>
            <CreateCategoryForm
              orgId="test-org"
              //nome={nome}
            />
          </div>

          {/* Edit Category Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Edit Category Form</h3>
            {/*             <EditCategoryForm
              category={mockCategory}
              onSubmit={handleEditCategory}
              onCancel={() => alert("Edit Category Cancelled")}
            /> */}
          </div>

          {/* Create Subcategory Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Create Subcategory Form</h3>
            {/*             <CreateSubcategoryForm/>
             */}{" "}
          </div>

          {/* Edit Subcategory Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Edit Subcategory Form</h3>
            {/*             <EditSubcategoryForm
              subcategory={mockSubcategory}
              parentCategories={mockParentCategories}
              onSubmit={handleEditSubcategory}
              onCancel={() => alert("Edit Subcategory Cancelled")}
            /> */}
          </div>
        </div>
      </section>

      {/* Original Form tests (keeping for reference) */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Original Form Tests</h2>

        <div>
          <InputField
            label="Label"
            description="Description"
            //errorMessage="Error message"
            className="w-64"
          />
        </div>

        <div>
          <FormSurface className="p-4 w-80" title="Login" variant="transparent">
            <Form action={""}>
              <InputField label="Username" className="mb-4" />
              <InputField label="Password" />
              <Button variant="primary" className="w-full">
                Submit
              </Button>
            </Form>
          </FormSurface>
        </div>
      </section>
    </PageLayout>
  );
}
