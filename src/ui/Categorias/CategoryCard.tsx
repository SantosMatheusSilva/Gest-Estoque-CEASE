"use client";
import Link from "next/link";
import DeleteCategoriaButton from "./DeleteCategoriaButton";

type SubCategoria = {
  id_categoria: string;
  nome: string;
  total_produtos?: number;
  created_at: string;
};

type Categoria = {
  id_categoria: string;
  nome: string;
  total_produtos?: number;
  subcategorias?: SubCategoria[];
};

type Props = {
  categoriasComSubcategorias?: Categoria[];
  orgId: string;
  userId: string;
};

export default function CategoryCards({
  categoriasComSubcategorias = [],
  orgId,
  userId,
}: Props) {
  if (!categoriasComSubcategorias.length) {
    return <div>Nenhuma categoria encontrada.</div>;
  }

  return (
    <div className="grid gap-4">
      {categoriasComSubcategorias.map((categoria) => (
        <div key={categoria.id_categoria} className="rounded-lg border p-4">
          {/* Cabeçalho com nome e ações */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">{categoria.nome}</h2>
            <div className="flex gap-2">
              <Link
                href={`/aplicacao/${orgId}/categorias/${categoria.id_categoria}/detalhes`}
                className="px-3 py-1.5 text-sm rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Detalhes
              </Link>
              <DeleteCategoriaButton
                categoriaId={categoria.id_categoria}
                orgId={orgId}
              />
            </div>
          </div>

          {/* Subcategorias */}
          {categoria.subcategorias && categoria.subcategorias.length > 0 ? (
            <ul className="mt-2 divide-y text-sm text-gray-600 dark:text-gray-400">
              {categoria.subcategorias.map((sub) => (
                <li
                  key={sub.id_categoria}
                  className="py-1.5 flex justify-between"
                >
                  <span>{sub.nome}</span>
                  <span>Produtos: {sub.total_produtos ?? 0}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm mt-2">
              Nenhuma subcategoria associada.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
