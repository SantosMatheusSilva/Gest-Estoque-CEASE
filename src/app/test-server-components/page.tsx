import { fetchCategoriaComSubcategorias } from "@/src/db/data";
import { SubCategoria } from "@/src/db/definitions";
export default async function TestPage() {
  const categoriasComSubcategorias = await fetchCategoriaComSubcategorias();
  return (
    <div>
      <h1>Test Page</h1>
      <h2>Categorias</h2>
      <ul>
        {categoriasComSubcategorias.map((categoria, index) => (
          <li key={index}>
            <strong>{categoria.nome}</strong>
            {categoria.subcategorias && categoria.subcategorias.length > 0 && (
              <ul>
                {categoria.subcategorias.map(
                  (subcategoria: SubCategoria, index: number) => (
                    <li key={index}>{subcategoria.nome}</li>
                  ),
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
