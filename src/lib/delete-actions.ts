"use server";

import { sql } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type DeleteState = {
  message: string | null;
};

const DeleteSchema = z.object({
  id: z.string().uuid({ message: "ID de categoria inválido." }),
});

export async function deleteCategoriaAction(
  id: string,
  orgId: string,
  prevState: DeleteState,
) {
  const validatedFields = DeleteSchema.safeParse({ id });

  if (!validatedFields.success) {
    return { message: "ID inválido." };
  }

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
          "Não é possível excluir: existem produtos vinculados a esta categoria.",
      };
    }
    return { message: "Erro de base de dados ao tentar excluir." };
  }

  // Sucesso: Revalidar o caminho da listagem
  revalidatePath(`/aplicacao/${orgId}/categorias`);
  // Redirecionar para sair da página de detalhes que já não existe
  redirect(`/aplicacao/${orgId}/categorias`);
}
