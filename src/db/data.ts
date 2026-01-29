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

import { UsuarioDB } from "./definitions"; // ADD BY ANA

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
  try {
    const data = await sql`
      SELECT
        categorias.id,
        categorias.nome,
        categorias.criado_em,
        categorias.atualizado_em
      FROM categorias;
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
        categorias.id,
        categorias.nome,
        categorias.criado_em,
        categorias.atualizado_em
      FROM categorias
      WHERE categorias.id = ${id};
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categoria.");
  }
}

export async function fetchCategoriaComSubcategorias() {
  try {
    const data = await sql`
    SELECT
    c.id_categoria AS categoria_id,
    c.nome AS categoria_nome,
    c.parent_id AS categoria_parent_id,
    sc.id_categoria AS subcategoria_id,
    sc.nome AS subcategoria_nome,
    c.created_at AS categoria_criada_em,
    c.updated_at AS categoria_atualizada_em,
    c.adicionado_por AS categoria_adicionado_por
FROM 
    categorias c
LEFT JOIN 
    categorias sc ON c.id_categoria = sc.parent_id
ORDER BY 
    c.nome, sc.nome;
    `;
    // Teste
    console.log("categorias com subcategorias:", data);
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categoria with subcategorias.");
  }
}

export async function fetchCategoriaComSubcategoriasTeste() {
  try {
    const data = await sql`
    SELECT
    c.id_categoria AS categoria_id,
    c.nome AS categoria_nome,
    c.parent_id AS categoria_parent_id,
    sc.id_categoria AS subcategoria_id,
    sc.nome AS subcategoria_nome,
    c.created_at AS categoria_criada_em,
    c.updated_at AS categoria_atualizada_em,
    c.adicionado_por AS categoria_adicionado_por
FROM 
    categorias c
ORDER BY 
    c.nome, sc.nome;
    `;
    // Teste
    console.log("categorias com subcategorias:", data);
    const categoriasMap = data.forEach((item, index) => {
      const data = sql`
      select * from categorias where parent_id = ${item.categoria_id};
      `;
      item.subcategoria = [data];
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categoria with subcategorias.");
  }
}
