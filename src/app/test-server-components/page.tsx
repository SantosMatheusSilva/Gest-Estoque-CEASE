import { fetchCategoriaComSubcategorias } from "@/src/db/data";

export default async function TestPage() {
  const categoriasComSubcategorias = await fetchCategoriaComSubcategorias();

  return (
    <div>
      <h1>Test Page</h1>
      <p>{JSON.stringify(categoriasComSubcategorias)}</p>
    </div>
  );
}
