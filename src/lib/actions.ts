// ficheiro para criação das server actions:
// ações que interagem com a base de dados utilizando as queries e logica de negócio.
// queries de INSERT, UPDATE, DELETE.
"use server";

import { sql } from "../db";
import type { Produto, CreateProduto } from "../db/definitions";

import type {
  Categoria,
  CriarCategoria as CriarCategoriaType,
  CriarSubCategoria,
} from "../db/definitions";

import { z } from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



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
  data: Partial<CreateProduto>,
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

// ========== CATEGORIAS ==========

// 1) LISTAR TODAS AS CATEGORIAS RAIZ
export async function getAllCategorias(): Promise<Categoria[]> {
  const result = await sql`
    SELECT *
    FROM categorias
    WHERE parent_id IS NULL
    ORDER BY created_at DESC
  `;
  return result as unknown as Categoria[];
}

// 2) BUSCAR CATEGORIA POR ID
export async function getCategoriaById(id: string): Promise<Categoria | null> {
  const result = await sql`
    SELECT *
    FROM categorias
    WHERE id_categoria = ${id}
  `;
  const rows = result as unknown as Categoria[];
  return rows[0] ?? null;
}

const criarCategoriaSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .trim(),

  adicionado_por: z.string().uuid(),
});

export type CriarCategoria = z.infer<typeof criarCategoriaSchema>;

// export type CreateCategoriaState = {
//   errors?: {
//     nome?: string[];
//   };
//   message?: string | null;
// };

// 3) CRIAR CATEGORIA RAIZ
export async function createCategoria(
  data: CriarCategoria,
): Promise<Categoria> {
  const result = await sql`
    INSERT INTO categorias (nome, parent_id, adicionado_por)
    VALUES (${data.nome}, NULL, ${data.adicionado_por})
    RETURNING *
  `;
  const rows = result as unknown as Categoria[];
  return rows[0];
}

// ADAPTAR
// ========== CATEGORIAS ==========

// 1. Definição do Tipo (Unificado para evitar erros)
export type CreateCategoriaState = {
  errors?: { 
    nome?: string[]; 
    parent_id?: string[]; // Adicionado para suportar subcategorias
  };
  message?: string | null;
};

// 2. Schemas de Validação
const CategoriaSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .trim(),
});

// Criamos o SubCategoriaSchema baseado no anterior, mas com parent_id
const SubCategoriaSchema = CategoriaSchema.extend({
  parent_id: z.string().uuid("ID da categoria pai inválido."),
});

// 3. Action para Categoria Raiz
export async function createCategoriaAction(
  prevState: CreateCategoriaState,
  formData: FormData
): Promise<CreateCategoriaState> {
  const validatedFields = CategoriaSchema.safeParse({
    nome: formData.get("nome"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. Falha ao criar categoria.",
    };
  }

  const { nome } = validatedFields.data;
  const userId = "id_temporario_usuario";

  try {
    const existing = await sql`
      SELECT id_categoria FROM categorias 
      WHERE LOWER(nome) = LOWER(${nome}) AND parent_id IS NULL
    `;

    if (existing.length > 0) {
      return {
        errors: { nome: ["Já existe uma categoria com este nome."] },
        message: "Erro: Nome duplicado.",
      };
    }

    await sql`
      INSERT INTO categorias (nome, parent_id, adicionado_por)
      VALUES (${nome}, NULL, ${userId})
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Erro de base de dados: Não foi possível criar a categoria." };
  }

  revalidatePath("/aplicacao/categorias");
  redirect("/aplicacao/categorias");
}


// 4) CRIAR SUBCATEGORIA
export async function createSubCategoria(
  data: CriarSubCategoria,
): Promise<Categoria> {
  const result = await sql`
    INSERT INTO categorias (nome, parent_id, adicionado_por)
    VALUES (${data.nome}, ${data.parent_id}, ${data.adicionado_por})
    RETURNING *
  `;
  const rows = result as unknown as Categoria[];
  return rows[0];
}


// 4. VERSAO ADPTADA - Action para Subcategoria
export async function createSubCategoriaAction(
  prevState: CreateCategoriaState, // CORRIGIDO: Era CategoriaState
  formData: FormData
): Promise<CreateCategoriaState> // CORRIGIDO: Era CategoriaState
{
  const validatedFields = SubCategoriaSchema.safeParse({
    nome: formData.get("nome"),
    parent_id: formData.get("parent_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro de validação na subcategoria.",
    };
  }

  const { nome, parent_id } = validatedFields.data;
  const userId = "11111111-1111-1111-1111-111111111111";

  try {
    const existing = await sql`
      SELECT id_categoria FROM categorias 
      WHERE LOWER(nome) = LOWER(${nome}) AND parent_id = ${parent_id}
    `;

    if (existing.length > 0) {
      return {
        errors: { nome: ["Já existe esta subcategoria dentro desta categoria pai."] },
        message: "Erro: Nome duplicado no mesmo nível.",
      };
    }

    await sql`
      INSERT INTO categorias (nome, parent_id, adicionado_por)
      VALUES (${nome}, ${parent_id}, ${userId})
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Erro de base de dados ao criar subcategoria." };
  }

  revalidatePath("/aplicacao/categorias");
  redirect("/aplicacao/categorias");
}


// 5) ATUALIZAR CATEGORIA
export async function updateCategoria(
  id: string,
  nome: string,
): Promise<Categoria> {
  const result = await sql`
    UPDATE categorias
    SET nome = ${nome}, updated_at = NOW()
    WHERE id_categoria = ${id}
    RETURNING *
  `;
  const rows = result as unknown as Categoria[];
  return rows[0];
}

// 6) DELETAR CATEGORIA
export async function deleteCategoria(id: string): Promise<void> {
  await sql`
    DELETE FROM categorias
    WHERE id_categoria = ${id}
  `;
}
