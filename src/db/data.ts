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
// import { sql } from "@/src/db/index";

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
  */

import { 
  createProduto, 
  getAllProdutos, 
  getProdutoById, 
  updateProduto, 
  deleteProduto 
} from '../lib/actions';
import type { Produto, CreateProduto } from '../db/definitions';

export async function fetchAllProdutos(): Promise<Produto[]> {
  return await getAllProdutos();
}

export async function fetchProduto(idUUID: string): Promise<Produto | null> {
  return await getProdutoById(idUUID);
}

export async function adicionarProduto(produto: CreateProduto): Promise<Produto> {
  return await createProduto(produto);
}

export async function editarProduto(idUUID: string, data: Partial<CreateProduto>): Promise<Produto> {
  return await updateProduto(idUUID, data);
}

export async function removerProduto(idUUID: string): Promise<void> {
  await deleteProduto(idUUID);
}

