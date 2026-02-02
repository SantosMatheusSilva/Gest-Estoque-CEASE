// ficheiro para criação de queries a base de dados.
// Ficheiro responsável por definir as queries ao banco de dados.
// Apenas queries de leitura (SELECT). !!!

import { sql } from "@/src/db/index";

import { UsuarioDB, CategoriaRaiz } from "./definitions"; // ADD BY ANA

// USUARIO ADD BY ANA

// buscar usuário por email
export async function fetchUsuarioPorEmail(
  email: string,
): Promise<UsuarioDB | null> {
  try {
    const [user] = await sql<UsuarioDB[]>`
      SELECT
        id,
        nome,
        sobrenome,
        email,
        senha_hash,
        adm,
        img_url,
        criado_em
      FROM usuarios
      WHERE email = ${email}
      LIMIT 1;
    `;

    return user ?? null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch usuario.");
  }
}

export async function fetchCategorias() {
  try {
    const data = await sql`
      SELECT
        categorias.id_categoria,
        categorias.nome,
        categorias.created_at,
        categorias.updated_at,
        categorias.adicionado_por
      FROM categorias
      WHERE categorias.parent_id IS NULL
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categorias.");
  }
}


export async function fetchCategoriaPorId(id: string) {
  console.log("fetchCategoriaPorId received id:", id);
  try {
    const data = await sql<CategoriaRaiz[]>`
      SELECT
        categorias.id_categoria AS id_categoria,
        categorias.nome AS nome,
        categorias.created_at AS criada_em,
        categorias.updated_at AS atualizado_em,
        categorias.adicionado_por AS adicionado_por
      FROM categorias
      WHERE categorias.parent_id IS NULL 
        AND categorias.id_categoria = ${id}
    `;
    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    console.error("Full error object:", JSON.stringify(error, null, 2));
    throw new Error(
      `Failed to fetch categoria: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function fetchCategoriaComSubcategoriaPorId(id: string) {
  try {
    // Buscar todas as categorias de uma vez
    const categoria = await sql<CategoriaRaiz[]>`
      SELECT
    c.id_categoria,
    c.nome,
    c.parent_id,
    c.created_at,
    c.updated_at,
    c.adicionado_por,
    (
      SELECT COUNT(*)
      FROM produtos p
      WHERE p.id_categoria = c.id_categoria
    ) AS total_produtos
  FROM categorias c
  WHERE c.id_categoria = ${id}
     OR c.parent_id = ${id}
  ORDER BY c.nome
    `;

    // Criar um mapa para acesso rápido por ID
    const categoriaMap = new Map();

    // Inicializar todas as categorias com array vazio de subcategorias
    categoria.forEach((categoria) => {
      categoriaMap.set(categoria.id_categoria, {
        ...categoria,
        created_at: categoria.created_at,
        updated_at: categoria.updated_at,
        adicionado_por: categoria.adicionado_por,
        subcategorias: [],
      });
    });

    // Organizar em estrutura hierárquica
    let categoriaRaiz: CategoriaRaiz = {} as CategoriaRaiz;

    categoriaMap.forEach((categoria) => {
      if (categoria.parent_id === null) {
        categoriaRaiz = categoria;
      } else {
        const parent = categoriaMap.get(categoria.parent_id);
        if (parent) {
          parent.subcategorias.push(categoria);
        }
      }
    });

    console.log("Categorias com subcategorias:", categoriaRaiz);
    return categoriaRaiz;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categoria with subcategorias.");
  }
}

export async function fetchSubcategorias() {
  // APENAS SUBCATEGORIAS
  try {
    const data = await sql`
      SELECT
        categorias.id_categoria AS id,
        categorias.nome AS nome,
        /* categorias.parent_id AS parent_id, */
        categorias.created_at AS criado_em,
        categorias.updated_at AS atualizado_em
        categorias.adicionado_por AS adicionado_por
      FROM categorias;
      WHERE categorias.parent_id IS NOT NULL
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch subcategorias.");
  }
}

export async function fetchCategoriaComSubcategorias() {
  try {
    // Buscar todas as categorias de uma vez
    const categorias = await sql`
      SELECT
        id_categoria,
        nome,
        parent_id,
        created_at,
        updated_at,
        adicionado_por
      FROM categorias
      ORDER BY nome
    `;

    // Criar um mapa para acesso rápido por ID
    const categoriasMap = new Map();

    // Inicializar todas as categorias com array vazio de subcategorias
    categorias.forEach((categoria) => {
      categoriasMap.set(categoria.id_categoria, {
        id_categoria: categoria.id_categoria,
        nome: categoria.nome,
        parent_id: categoria.parent_id,
        created_at: categoria.created_at.toLocaleDateString(),
        updated_at: categoria.updated_at.toLocaleDateString(),
        adicionado_por: categoria.adicionado_por,
        subcategorias: [],
      });
    });

    // Organizar em estrutura hierárquica
    const categoriasRaiz: CategoriaRaiz[] = [];

    categoriasMap.forEach((categoria) => {
      if (categoria.parent_id === null) {
        // É uma categoria raiz
        categoriasRaiz.push(categoria);
      } else {
        // É uma subcategoria, adicionar apenas o objeto de subcategoria ao parent
        const parent = categoriasMap.get(categoria.parent_id);
        if (parent) {
          parent.subcategorias.push(categoria);
        }
      }
    });

    console.log("Categorias com subcategorias:", categoriasRaiz);
    return categoriasRaiz;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categoria with subcategorias.");
  }
}


// Função para criar categoria raiz

import { CriarCategoria, CriarSubCategoria, Categoria } from "./definitions";

// criar categoria raiz
export async function criarCategoria(
  data: CriarCategoria,
): Promise<Categoria> {
  try {
    const [categoria] = await sql<Categoria[]>`
      INSERT INTO categorias (
        nome,
        parent_id,
        adicionado_por
      )
      VALUES (
        ${data.nome},
        NULL,
        ${data.adicionado_por}
      )
      RETURNING
        id_categoria,
        nome,
        parent_id,
        created_at,
        updated_at,
        adicionado_por;
    `;
    return categoria;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create categoria.");
  }
}


// Função para criar subcategoria

export async function criarSubCategoria(
  data: CriarSubCategoria,
): Promise<Categoria> {
  try {
    const [subcategoria] = await sql<Categoria[]>`
      INSERT INTO categorias (
        nome,
        parent_id,
        adicionado_por
      )
      VALUES (
        ${data.nome},
        ${data.parent_id},
        ${data.adicionado_por}
      )
      RETURNING
        id_categoria,
        nome,
        parent_id,
        created_at,
        updated_at,
        adicionado_por;
    `;
    return subcategoria;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create subcategoria.");
  }
}


// Função para atualizar categoria ou subcategoria

export async function atualizarCategoria(
  id_categoria: string,
  nome: string,
): Promise<Categoria> {
  try {
    const [categoria] = await sql<Categoria[]>`
      UPDATE categorias
      SET
        nome = ${nome},
        updated_at = NOW()
      WHERE id_categoria = ${id_categoria}
      RETURNING
        id_categoria,
        nome,
        parent_id,
        created_at,
        updated_at,
        adicionado_por;
    `;
    return categoria;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update categoria.");
  }
}


// Função para deletar categoria


export async function deletarCategoria(
  id_categoria: string,
): Promise<void> {
  try {
    await sql`
      DELETE FROM categorias
      WHERE id_categoria = ${id_categoria};
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete categoria.");
  }
}


export async function testDbConnection() {
  const result = await sql`SELECT 1 as ok`;
  return result;
}
