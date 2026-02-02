// ficheiro para criação das server actions:
// ações que interagem com a base de dados utilizando as queries e logica de negócio.
// queries de INSERT, UPDATE, DELETE.
"use server";

import { sql } from '../db';
import type { Produto, CreateProduto } from '../db/definitions';

// ========== PRODUTOS ==========

// 1) LISTAR TODOS
export async function getAllProdutos(): Promise<Produto[]> {
  const result = await sql`
    SELECT *
    FROM produtos
    ORDER BY created_at DESC
  `;
  return result as unknown as Produto[];
}

// 2) CRIAR
export async function createProduto(produto: CreateProduto): Promise<Produto> {
  const result = await sql`
    INSERT INTO produtos (
      nome,
      quantidade,
      preco,
      img_url,
      descricao,
      id_categoria,
      adicionado_por
    )
    VALUES (
      ${produto.nome},
      ${Number(produto.quantidade)},
      ${Number(produto.preco)},
      ${produto.img_url ?? null},
      ${produto.descricao ?? null},
      ${produto.id_categoria},
      ${produto.adicionado_por}
    )
    RETURNING *
  `;
  const rows = result as unknown as Produto[];
  return rows[0];
}

// 3) BUSCAR POR ID
export async function getProdutoById(idUUID: string): Promise<Produto | null> {
  const result = await sql`
    SELECT *
    FROM produtos
    WHERE id = ${idUUID}
  `;
  const rows = result as unknown as Produto[];
  return rows[0] ?? null;
}

// 4) ATUALIZAR
export async function updateProduto(
  idUUID: string,
  data: Partial<CreateProduto>
): Promise<Produto> {
  const result = await sql`
    UPDATE produtos
    SET
      nome       = COALESCE(${data.nome ?? null}, nome),
      quantidade = COALESCE(${data.quantidade ?? null}, quantidade),
      preco      = COALESCE(${data.preco ?? null}, preco),
      img_url    = COALESCE(${data.img_url ?? null}, img_url),
      descricao  = COALESCE(${data.descricao ?? null}, descricao),
      updated_at = NOW()
    WHERE id = ${idUUID}
    RETURNING *
  `;
  const rows = result as unknown as Produto[];
  return rows[0];
}

// 5) DELETAR
export async function deleteProduto(idUUID: string): Promise<void> {
  await sql`
    DELETE FROM produtos
    WHERE id = ${idUUID}
  `;
}

// ========== USUÁRIO ==========

export async function criarUsuario(formData: FormData) {
  const email = formData.get("email") as string;
  const senha = formData.get("senha") as string;

  if (!email || !senha) {
    throw new Error("Dados inválidos");
  }

  console.log("Usuário:", email);
  console.log("Senha:", senha);
}

