"use server";

import { sql } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { Categoria, CriarSubCategoria } from "../db/definitions";

import { auth } from "@clerk/nextjs/server";

// ========== CATEGORIAS ==========

// 1) LISTAR TODAS AS CATEGORIAS RAIZ
export async function getAllCategorias(): Promise<Categoria[]> {
  const result = await sql`
    SELECT *
    FROM categorias
    WHERE parent_id IS NULL
    ORDER BY created_at DESC
  `;

  console.log("DEBUG: Categorias vindas da DB:", result);
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

// ========== Shcemas ==========

// 1. Definição do Tipo (Unificado para evitar erros)
export type CreateCategoriaState = {
  errors?: {
    nome?: string[];
    parent_id?: string[];
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

const SubCategoriaSchema = CategoriaSchema.extend({
  parent_id: z.string().uuid("ID da categoria pai inválido."),
});

// Schema Delete Categoria
const DeleteSchema = z.object({
  id: z.string().uuid({ message: "ID de categoria inválido." }),
});

export type DeleteState = {
  message?: string | null;
  errors?: {
    id?: string[];
  };
};

// 3. Action para Categoria Raiz
export async function createCategoriaAction(
  prevState: CreateCategoriaState,
  formData: FormData,
): Promise<CreateCategoriaState> {
  // ID Clerk
  const { auth } = await import("@clerk/nextjs/server");
  const { orgId, userId: clerkUserId } = await auth();

  const validatedFields = CategoriaSchema.safeParse({
    nome: formData.get("nome"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos.",
    };
  }

  const { nome } = validatedFields.data;

  try {
    if (!clerkUserId) {
      return { message: "Erro: Utilizador não autenticado no Clerk." };
    }

    const userInDB = await sql`
      SELECT id FROM usuarios WHERE clerk_user_id = ${clerkUserId}
    `;

    if (userInDB.length === 0) {
      return { message: "Erro: Utilizador não sincronizado na base de dados." };
    }

    const dbUserId = userInDB[0].id;
    const currentOrgId = orgId as string;

    await sql`
      INSERT INTO categorias (nome, parent_id, adicionado_por, clerk_org_id)
      VALUES (${nome}, NULL, ${dbUserId}, ${currentOrgId})
    `;

    console.log(`Sucesso! Categoria "${nome}" criada.`);
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Erro ao gravar categoria." };
  }

  revalidatePath(`/aplicacao/${orgId}/categorias`);
  redirect(`/aplicacao/${orgId}/categorias`);
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
  prevState: CreateCategoriaState,
  formData: FormData,
): Promise<CreateCategoriaState> {
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
        errors: {
          nome: ["Já existe esta subcategoria dentro desta categoria pai."],
        },
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

  console.log("add subcategoria");
  const { auth } = await import("@clerk/nextjs/server");
  const { orgId } = await auth();

  revalidatePath(`/aplicacao/${orgId}/categorias`);
  revalidatePath(`/aplicacao/${orgId}/categorias/${parent_id}/detalhes`);

  redirect(`/aplicacao/${orgId}/categorias/${parent_id}/detalhes`);
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
// export async function deleteCategoria(id: string): Promise<void> {
//   await sql`
//     DELETE FROM categorias
//     WHERE id_categoria = ${id}
//   `;
// }

// Substitui a action pura de DELETE

export async function deleteCategoriaAction(
  id: string,
  orgId: string, // <-- Agora recebemos por argumento
  prevState: DeleteState,
): Promise<DeleteState> {
  // 1. Validar o ID com o Zod
  const validatedFields = DeleteSchema.safeParse({ id });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ID de categoria inválido.",
    };
  }

  // Já não precisamos do 'await auth()' aqui dentro,
  // pois o orgId vem por parâmetro!

  try {
    const result = await sql`
      DELETE FROM categorias
      WHERE id_categoria = ${id}
    `;

    if (result.count === 0) {
      return { message: "Categoria não encontrada." };
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    if (error.code === "23503") {
      return {
        message:
          "Não é possível excluir: existem subcategorias ou produtos vinculados.",
      };
    }
    return { message: "Erro de base de dados ao tentar excluir." };
  }

  // 3. Revalidar e sair
  revalidatePath(`/aplicacao/${orgId}/categorias`);
  redirect(`/aplicacao/${orgId}/categorias`);
}

export async function deleteSubcategoriaAction(
  subcategoriaId: string,
  orgId: string,
) {
  const { userId } = await auth();

  if (!userId) {
    return { message: "Não autorizado." };
  }

  try {
    await sql`
  DELETE FROM categorias
  WHERE id_categoria = ${subcategoriaId}
`;

    revalidatePath(`/aplicacao/${orgId}/categorias`);

    return { message: "" };
  } catch (error) {
    console.error(error);
    return { message: "Erro ao excluir subcategoria." };
  }
}
