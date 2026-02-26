//categoriaActions.ts

"use server";
import "server-only";

import { sql } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { Categoria } from "../db/definitions";

// ❌ SEM NENHUM IMPORT DE CLERK NO TOPO

// ========== SCHEMAS & TYPES ==========

export type CreateCategoriaState = {
  errors?: {
    nome?: string[];
    parent_id?: string[];
  };
  message?: string | null;
};

export type DeleteState = {
  message?: string | null;
  errors?: {
    id?: string[];
  };
};

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

const DeleteSchema = z.object({
  id: z.string().uuid({ message: "ID de categoria inválido." }),
});

// ========== QUERIES ==========

export async function getAllCategorias(): Promise<Categoria[]> {
  const result = await sql`
    SELECT * FROM categorias
    WHERE parent_id IS NULL
    ORDER BY created_at DESC
  `;
  return result as unknown as Categoria[];
}

export async function getCategoriaById(id: string): Promise<Categoria | null> {
  const result = await sql`
    SELECT * FROM categorias
    WHERE id_categoria = ${id as string}
  `;
  const rows = result as unknown as Categoria[];
  return rows[0] ?? null;
}

// ========== ACTIONS ==========

export async function createCategoriaAction(
  prevState: CreateCategoriaState,
  formData: FormData,
): Promise<CreateCategoriaState> {
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
  const currentOrgId = (orgId as string) ?? "";

  try {
    if (!clerkUserId) return { message: "Não autenticado." };

    const userInDB =
      await sql`SELECT id FROM usuarios WHERE clerk_user_id = ${clerkUserId as string}`;
    if (userInDB.length === 0)
      return { message: "Utilizador não sincronizado." };

    const dbUserId = userInDB[0].id;

    await sql`
      INSERT INTO categorias (nome, parent_id, adicionado_por, clerk_org_id)
      VALUES (${nome}, NULL, ${dbUserId as string}, ${currentOrgId})
    `;
  } catch (error) {
    console.error(error);
    return { message: "Erro na base de dados." };
  }

  revalidatePath(`/aplicacao/${currentOrgId}/categorias`);
  redirect(`/aplicacao/${currentOrgId}/categorias`);
}

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
      message: "Erro de validação.",
    };
  }

  const { nome, parent_id } = validatedFields.data;
  const { auth } = await import("@clerk/nextjs/server");
  const { orgId, userId: clerkUserId } = await auth();
  const currentOrgId = (orgId as string) ?? "";

  try {
    const userInDB =
      await sql`SELECT id FROM usuarios WHERE clerk_user_id = ${clerkUserId as string}`;
    const dbUserId = userInDB[0]?.id || "11111111-1111-1111-1111-111111111111";

    const existing = await sql`
      SELECT id_categoria FROM categorias 
      WHERE LOWER(nome) = LOWER(${nome}) AND parent_id = ${parent_id as string}
    `;

    if (existing.length > 0) {
      return {
        errors: { nome: ["Nome já existe."] },
        message: "Erro: Duplicado.",
      };
    }

    await sql`
      INSERT INTO categorias (nome, parent_id, adicionado_por, clerk_org_id)
      VALUES (${nome}, ${parent_id as string}, ${dbUserId as string}, ${currentOrgId})
    `;
  } catch (error) {
    return { message: "Erro ao criar subcategoria." };
  }

  revalidatePath(`/aplicacao/${currentOrgId}/categorias`);
  revalidatePath(`/aplicacao/${currentOrgId}/categorias/${parent_id}/detalhes`);
  redirect(`/aplicacao/${currentOrgId}/categorias/${parent_id}/detalhes`);
}

export async function deleteCategoriaAction(
  id: string,
  orgId: string,
  prevState: DeleteState,
): Promise<DeleteState> {
  try {
    const result = await sql`
      DELETE FROM categorias
      WHERE id_categoria = ${id as string}
    `;
    if (result.count === 0) return { message: "Não encontrada." };
  } catch (error: any) {
    if (error.code === "23503")
      return { message: "Existem produtos vinculados." };
    return { message: "Erro ao eliminar." };
  }

  revalidatePath(`/aplicacao/${orgId}/categorias`);
  redirect(`/aplicacao/${orgId}/categorias`);
}

export async function deleteSubcategoriaAction(
  subcategoriaId: string,
  orgId: string,
) {
  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) return { message: "Não autorizado." };

  try {
    await sql`DELETE FROM categorias WHERE id_categoria = ${subcategoriaId as string}`;
    revalidatePath(`/aplicacao/${orgId}/categorias`);
    return { message: "" };
  } catch (error) {
    return { message: "Erro ao excluir." };
  }
}
