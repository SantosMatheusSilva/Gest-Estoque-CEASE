// ficheiro para criação de queries a base de dados.
// Ficheiro responsável por definir as queries ao banco de dados.
// Apenas queries de leitura (SELECT). !!!
// exemplo de query fetch (apenas leitura):

/* 
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}
*/
import { sql } from "@/src/db/index";

import { UsuarioDB, CategoriaRaiz } from "./definitions"; // ADD BY ANA

/* export async function fetchProdutoPorId(id: string) {
  try {
    const data = await sql`
      SELECT
        produtos.id,
        produtos.nome,
        produtos.quantidade,
        produtos.peco,
        produtos.img_url,
        produtos.descricao,
        produtos.id_categoria,
        produtos.adicionado_em,
        produtos.atualizado_em,
        produtos.adicionado_por,
      FROM invoices
      WHERE produtos.id = ${id};
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch produtos.");
  }
}
<<<<<<< HEAD

*/

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
  // APENAS CATEGORIAS RAIZ
  try {
    const data = await sql`
      SELECT
        categorias.id_categoria AS id,
        categorias.nome AS nome,
        categorias.created_at AS criado_em,
        categorias.updated_at AS atualizado_em
        categorias.adicionado_por AS adicionado_por
      FROM categorias;
      WHERE categorias.parent_id IS NULL
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categorias.");
  }
}

export async function fetchCategiriaPorId(id: string) {
  try {
    const data = await sql`
      SELECT
        categorias.id_categoria AS id,
        categorias.nome AS nome,
        categorias.created_at AS criado_em,
        categorias.updated_at AS atualizado_em
        categorias.adicionado_por AS adicionado_por
      FROM categorias
      WHERE categorias.parent_id IS NULL AND
      WHERE categorias.id = ${id};
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categoria.");
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

export async function fetchCategoriaComSubcategoriasTeste() {
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
        id: categoria.id_categoria,
        nome: categoria.nome,
        parent_id: categoria.parent_id,
        created_at: categoria.created_at,
        updated_at: categoria.updated_at,
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
