//categoriaActions.ts

"use server";
import { sql } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type CreateCategoriaState = {
  message?: string | null;
  errors?: { nome?: string[]; parent_id?: string[] };
};

export type ActionState = {
  message?: string | null;
};

// Schemas
const CategoriaSchema = z.object({
  nome: z.string().min(3).max(50).trim(),
});

const SubCategoriaSchema = CategoriaSchema.extend({
  parent_id: z.string().uuid(),
});

const EditSchema = z.object({
  id_categoria: z.string().uuid(),
  nome: z.string().min(3).max(50).trim(),
});

// ─── CRIAR CATEGORIA RAIZ ───────────────────────────────────────────────────

export async function createCategoriaAction(
  prevState: CreateCategoriaState,
  formData: FormData,
): Promise<CreateCategoriaState> {
  const { auth } = await import("@clerk/nextjs/server");
  const { orgId, userId } = await auth();
  if (!userId) return { message: "Não autenticado." };
  if (!orgId) return { message: "Organização não encontrada." };

  const nome = formData.get("nome") as string;
  const validated = CategoriaSchema.safeParse({ nome });
  if (!validated.success)
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Erro de validação.",
    };

  try {
    const userDB =
      await sql`SELECT id FROM usuarios WHERE clerk_user_id = ${userId}`;
    const dbUserId = userDB[0]?.id ?? userId;

    await sql`
      INSERT INTO categorias (nome, parent_id, adicionado_por, clerk_org_id)
      VALUES (${nome}, NULL, ${dbUserId}, ${orgId})
    `;
  } catch (error) {
    return { message: "Erro ao criar categoria." };
  }

  revalidatePath(`/aplicacao/${orgId}/categorias`);
  redirect(`/aplicacao/${orgId}/categorias`);
}

// ─── CRIAR SUBCATEGORIA ──────────────────────────────────────────────────────

export async function createSubCategoriaAction(
  prevState: CreateCategoriaState,
  formData: FormData,
): Promise<CreateCategoriaState> {
  const { auth } = await import("@clerk/nextjs/server");
  const { orgId, userId } = await auth();
  if (!userId) return { message: "Não autenticado." };
  if (!orgId) return { message: "Organização não encontrada." };

  const nome = formData.get("nome") as string;
  const parent_id = formData.get("parent_id") as string;
  const validated = SubCategoriaSchema.safeParse({ nome, parent_id });

  if (!validated.success)
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Erro de validação.",
    };

  try {
    const userDB =
      await sql`SELECT id FROM usuarios WHERE clerk_user_id = ${userId}`;
    const dbUserId = userDB[0]?.id ?? userId;

    await sql`
      INSERT INTO categorias (nome, parent_id, adicionado_por, clerk_org_id)
      VALUES (${nome}, ${parent_id}, ${dbUserId}, ${orgId})
    `;
  } catch (error) {
    return { message: "Erro ao criar subcategoria." };
  }

  revalidatePath(`/aplicacao/${orgId}/categorias`);
  revalidatePath(`/aplicacao/${orgId}/categorias/${parent_id}/detalhes`);
  redirect(`/aplicacao/${orgId}/categorias/${parent_id}/detalhes`);
}

// ─── EDITAR CATEGORIA ────────────────────────────────────────────────────────

export async function editCategoriaAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { auth } = await import("@clerk/nextjs/server");
  const { orgId, userId } = await auth();
  if (!userId) return { message: "Não autenticado." };
  if (!orgId) return { message: "Organização não encontrada." };

  const id_categoria = formData.get("id_categoria") as string;
  const nome = formData.get("nome") as string;

  const validated = EditSchema.safeParse({ id_categoria, nome });
  if (!validated.success) return { message: "Erro de validação." };

  try {
    await sql`
      UPDATE categorias
      SET nome = ${nome}, updated_at = NOW()
      WHERE id_categoria = ${id_categoria}
        AND clerk_org_id = ${orgId}
    `;
  } catch (error) {
    return { message: "Erro ao editar categoria." };
  }

  revalidatePath(`/aplicacao/${orgId}/categorias`);
  revalidatePath(`/aplicacao/${orgId}/categorias/${id_categoria}/detalhes`);
  redirect(`/aplicacao/${orgId}/categorias/${id_categoria}/detalhes`);
}

// ─── EDITAR SUBCATEGORIA ─────────────────────────────────────────────────────

export async function editSubCategoriaAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { auth } = await import("@clerk/nextjs/server");
  const { orgId, userId } = await auth();
  if (!userId) return { message: "Não autenticado." };
  if (!orgId) return { message: "Organização não encontrada." };

  const id_categoria = formData.get("id_categoria") as string;
  const nome = formData.get("nome") as string;
  const parent_id = formData.get("parent_id") as string;

  const validated = EditSchema.safeParse({ id_categoria, nome });
  if (!validated.success) return { message: "Erro de validação." };

  try {
    await sql`
      UPDATE categorias
      SET nome = ${nome}, updated_at = NOW()
      WHERE id_categoria = ${id_categoria}
        AND clerk_org_id = ${orgId}
    `;
  } catch (error) {
    return { message: "Erro ao editar subcategoria." };
  }

  revalidatePath(`/aplicacao/${orgId}/categorias`);
  revalidatePath(`/aplicacao/${orgId}/categorias/${parent_id}/detalhes`);
  redirect(`/aplicacao/${orgId}/categorias/${parent_id}/detalhes`);
}

// ─── APAGAR SUBCATEGORIA ─────────────────────────────────────────────────────

export async function deleteSubcategoriaAction(
  subcategoriaId: string,
  orgId: string,
  prevState: ActionState,
): Promise<ActionState> {
  const idSchema = z.string().uuid();
  if (!idSchema.safeParse(subcategoriaId).success)
    return { message: "ID inválido." };

  try {
    const result = await sql`
      DELETE FROM categorias
      WHERE id_categoria = ${subcategoriaId}
        AND clerk_org_id = ${orgId}
    `;

    if (result.count === 0) return { message: "Subcategoria não encontrada." };
  } catch (error: any) {
    if (error.code === "23503")
      return {
        message: "Não é possível excluir: existem produtos vinculados.",
      };
    return { message: "Erro ao excluir subcategoria." };
  }

  revalidatePath(`/aplicacao/${orgId}/categorias`);
  redirect(`/aplicacao/${orgId}/categorias`);
}
