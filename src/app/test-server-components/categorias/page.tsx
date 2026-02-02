import {
  fetchCategorias,
  criarCategoria,
  criarSubCategoria,
  atualizarCategoria,
} from "@/src/db/data";

export default async function TestCategoriasPage() {
  const categoriasAntes = await fetchCategorias();

  const novaCategoria = await criarCategoria({
    nome: "Categoria Teste",
    adicionado_por: "11111111-1111-1111-1111-111111111111",
  });

  const novaSub = await criarSubCategoria({
    nome: "Subcategoria Teste",
    parent_id: novaCategoria.id_categoria,
    adicionado_por: "11111111-1111-1111-1111-111111111111",
  });

  const categoriaAtualizada = await atualizarCategoria(
    novaCategoria.id_categoria,
    "Categoria Atualizada",
  );

  return (
    <pre>
      {JSON.stringify(
        {
          categoriasAntes,
          novaCategoria,
          novaSub,
          categoriaAtualizada,
        },
        null,
        2
      )}
    </pre>
  );
}


[{ "ok": 1 }]
