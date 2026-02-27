// // src/db/bootstrapUser.ts
// import { sql } from "./index";
// import type { UsuarioType } from "./definitions";

// type BootstrapUserInput = {
//   clerkUserId: string;
//   email: string;
// };

// type BootstrapUserOutput = {
//   usuario: UsuarioType;
// };

// export async function bootstrapUser(
//   input: BootstrapUserInput,
// ): Promise<BootstrapUserOutput> {
//   const { clerkUserId, email } = input;

//   try {
//     // 1️⃣ Verificar se o usuário já existe
//     const [existingUser] = await sql<UsuarioType[]>`
//       SELECT *
//       FROM usuarios
//       WHERE clerk_user_id = ${clerkUserId}
//     `;

//     if (existingUser) return { usuario: existingUser };

//     // 2️⃣ Criar novo usuário se não existir
//     const [novoUsuario] = await sql<UsuarioType[]>`
//       INSERT INTO usuarios (
//         clerk_user_id,
//         email,
//         created_at
//       )
//       VALUES (
//         ${clerkUserId},
//         ${email ?? null},
//         NOW()
//       )
//       RETURNING *
//     `;

//     if (!novoUsuario) {
//       throw new Error("Falha ao criar usuário.");
//     }

//     return { usuario: novoUsuario };
//   } catch (error) {
//     console.error("bootstrapUser Error:", error);
//     throw new Error(
//       `Falha ao bootstrapar usuário: ${error instanceof Error ? error.message : "Unknown error"}`,
//     );
//   }
// }

// src/db/bootstrapUser.ts
import { sql } from "./index";
import type { UsuarioType } from "./definitions";

type BootstrapUserInput = {
  clerkUserId: string;
  email: string;
  orgId?: string;
  orgName?: string;
  orgRole?: string; // ex: 'org:admin' | 'org:member'
};

type BootstrapUserOutput = {
  usuario: UsuarioType;
};

export async function bootstrapUser(
  input: BootstrapUserInput,
): Promise<BootstrapUserOutput> {
  const { clerkUserId, email, orgId, orgName, orgRole } = input;

  try {
    // 1️⃣ Verificar se o utilizador já existe, se não, criar
    let usuario: UsuarioType;

    const [existingUser] = await sql<UsuarioType[]>`
      SELECT * FROM usuarios
      WHERE clerk_user_id = ${clerkUserId}
    `;

    if (existingUser) {
      usuario = existingUser;
    } else {
      const [novoUsuario] = await sql<UsuarioType[]>`
        INSERT INTO usuarios (clerk_user_id, email, created_at)
        VALUES (${clerkUserId}, ${email ?? null}, NOW())
        RETURNING *
      `;
      if (!novoUsuario) throw new Error("Falha ao criar utilizador.");
      usuario = novoUsuario;
    }

    // 2️⃣ Se há uma org ativa, garantir que existe business + membership
    if (orgId) {
      // Verificar se o business já existe para esta org
      const [existingBusiness] = await sql`
        SELECT id FROM business
        WHERE clerk_org_id = ${orgId}
        LIMIT 1
      `;

      let businessId: string;

      if (existingBusiness) {
        businessId = existingBusiness.id;
      } else {
        // Criar o business para esta org
        const [novoBusiness] = await sql`
          INSERT INTO business (nome, plano, clerk_org_id, created_by_user_id, created_at)
          VALUES (
            ${orgName ?? "Minha Organização"},
            'free',
            ${orgId},
            ${usuario.id},
            NOW()
          )
          RETURNING id
        `;
        if (!novoBusiness) throw new Error("Falha ao criar business.");
        businessId = novoBusiness.id;
      }

      // 3️⃣ Verificar se o membership já existe
      const [existingMembership] = await sql`
        SELECT id FROM business_memberships
        WHERE user_id = ${usuario.id}
          AND business_id = ${businessId}
        LIMIT 1
      `;

      if (!existingMembership) {
        // Usar o role do Clerk — org:admin → 'admin', qualquer outro → 'member'
        const role = orgRole === "org:admin" ? "admin" : "member";

        await sql`
          INSERT INTO business_memberships (user_id, business_id, role, created_at)
          VALUES (${usuario.id}, ${businessId}, ${role}, NOW())
        `;
      }
    }

    return { usuario };
  } catch (error) {
    console.error("bootstrapUser Error:", error);
    throw new Error(
      `Falha ao bootstrapar utilizador: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
