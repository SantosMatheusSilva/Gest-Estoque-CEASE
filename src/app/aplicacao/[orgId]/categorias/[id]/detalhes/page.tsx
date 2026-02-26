import { auth } from "@clerk/nextjs/server";
import CategoryPageLayout from "@/src/ui/Categorias/CategoryPageLayout";
import { fetchCategoriaComSubcategorias } from "@/src/db/data";

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { orgId } = params;

  const { userId } = await auth();

  if (!orgId) {
    return <div>Organização não encontrada.</div>;
  }

  const categoriasComSubcategorias =
    await fetchCategoriaComSubcategorias(orgId);

  return (
    <CategoryPageLayout
      categoriasComSubcategorias={categoriasComSubcategorias ?? []}
      orgId={orgId}
      userId={userId ?? ""}
    />
  );
}
