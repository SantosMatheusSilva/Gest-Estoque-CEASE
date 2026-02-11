// src/db/bootstrapUser.ts
import { sql } from "./index";
import type { UsuarioType } from "./definitions";

type BootstrapUserInput = {
  clerkUserId: string;
  email?: string; // opcional, se quiseres atualizar
};

type BootstrapUserOutput = {
  usuario: UsuarioType;
};

export async function bootstrapUser(
  input: BootstrapUserInput,
): Promise<BootstrapUserOutput> {
  const { clerkUserId, email } = input;

  try {
    // 1️⃣ Verificar se o usuário já existe
    const [existingUser] = await sql<UsuarioType[]>`
      SELECT *
      FROM usuarios
      WHERE clerk_user_id = ${clerkUserId}
    `;

    if (existingUser) return { usuario: existingUser };

    // 2️⃣ Criar novo usuário se não existir
    const [novoUsuario] = await sql<UsuarioType[]>`
      INSERT INTO users (
        clerk_user_id,
        email,
        created_at
      )
      VALUES (
        ${clerkUserId},
        ${email ?? null},
        NOW()
      )
      RETURNING *
    `;

    if (!novoUsuario) {
      throw new Error("Falha ao criar usuário.");
    }

    return { usuario: novoUsuario };
  } catch (error) {
    console.error("bootstrapUser Error:", error);
    throw new Error(
      `Falha ao bootstrapar usuário: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
