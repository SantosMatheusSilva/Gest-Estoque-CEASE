// import {
//   fetchCategorias,
//   criarCategoria,
//   criarSubCategoria,
//   atualizarCategoria,
// } from "@/src/db/data";

// export default async function TestCategoriasPage() {
//   const categoriasAntes = await fetchCategorias();

//   const novaCategoria = await criarCategoria({
//     nome: "Categoria Teste",
//     adicionado_por: "11111111-1111-1111-1111-111111111111",
//   });

//   const novaSub = await criarSubCategoria({
//     nome: "Subcategoria Teste",
//     parent_id: novaCategoria.id_categoria,
//     adicionado_por: "11111111-1111-1111-1111-111111111111",
//   });

//   const categoriaAtualizada = await atualizarCategoria(
//     novaCategoria.id_categoria,
//     "Categoria Atualizada",
//   );

//   return (
//     <pre>
//       {JSON.stringify(
//         {
//           categoriasAntes,
//           novaCategoria,
//           novaSub,
//           categoriaAtualizada,
//         },
//         null,
//         2
//       )}
//     </pre>
//   );
// }

[{ ok: 1 }];

// src/app/categorias/page.tsx
import {
  fetchCategorias,
  criarCategoria,
  criarSubCategoria,
  atualizarCategoria,
} from "@/src/db/data";

import { CreateCategoryForm } from "@/src/ui/Categorias/CreateCategoryForm";

export default async function TestCategoriasPage() {
  // 1️⃣ Listar categorias existentes
  const categoriasAntes = await fetchCategorias();

  // 2️⃣ Criar uma nova categoria raiz
  const novaCategoria = await criarCategoria({
    nome: "Categoria Teste",
    adicionado_por: "11111111-1111-1111-1111-111111111111", // garanta que exista no DB
  });

  // 3️⃣ Criar uma subcategoria
  const novaSub = await criarSubCategoria({
    nome: "Subcategoria Teste",
    parent_id: novaCategoria.id_categoria,
    adicionado_por: "11111111-1111-1111-1111-111111111111",
  });

  // 4️⃣ Atualizar a categoria raiz
  const categoriaAtualizada = await atualizarCategoria(
    novaCategoria.id_categoria,
    "Categoria Atualizada",
  );

  // 5️⃣ Buscar categorias novamente para ver hierarquia atualizada
  const categoriasDepois = await fetchCategorias();

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
        2,
      )}
    </pre>
  );
}

[{ ok: 1 }];
