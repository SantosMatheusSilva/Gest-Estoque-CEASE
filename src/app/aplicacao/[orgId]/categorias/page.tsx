import { auth } from "@clerk/nextjs/server";
import CategoryPageLayout from "@/src/ui/Categorias/CategoryPageLayout";
import { fetchCategoriaComSubcategorias } from "@/src/db/data";

type PageProps = {
  params: Promise<{ orgId: string }>; // ✅ Promise
};

export default async function Page({ params }: PageProps) {
  const { orgId } = await params; // ✅ await
  const { userId } = await auth();

  if (!orgId) return <div>Organização inválida.</div>;

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
