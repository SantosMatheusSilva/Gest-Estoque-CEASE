"use server";

import { sql } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// 1. Definir o tipo que estava em falta
export type DeleteState = {
  message: string | null;
};

const DeleteSchema = z.object({
  id: z.string().uuid({ message: "ID de categoria inválido." }),
});

export async function deleteCategoriaAction(
  id: string,
  orgId: string,
  prevState: DeleteState, // Agora o TS já sabe o que é isto
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

    // Erro de chave estrangeira (Foreign Key Constraint)
    if (error.code === "23503") {
      return {
        message:
          "Não é possível excluir: existem subcategorias ou produtos vinculados.",
      };
    }
    return { message: "Erro de base de dados ao tentar excluir." };
  }

  // Se chegou aqui, deu certo. Revalidamos e saímos.
  revalidatePath(`/aplicacao/${orgId}/categorias`);
  redirect(`/aplicacao/${orgId}/categorias`);
}
