//src/ui/Categorias/CategoryCard.tsx

"use client";

type Props = {
  categoriasComSubcategorias?: any[];
  orgId: string;
  userId: string;
};

export default function CategoryCards({
  categoriasComSubcategorias = [],
  orgId,
  userId,
}: Props) {
  if (categoriasComSubcategorias.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        Nenhuma categoria encontrada.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {categoriasComSubcategorias.map((categoria) => (
        <div key={categoria.id} className="rounded-lg border p-4">
          <h2 className="font-semibold">{categoria.nome}</h2>

          {categoria.subcategorias?.length > 0 && (
            <ul className="mt-2 space-y-1">
              {categoria.subcategorias.map((sub: any) => (
                <li key={sub.id}>{sub.nome}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
