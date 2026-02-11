import { sql } from "@/src/db/index";
import { fetchUsuarioDB, fetchUserBusinessMembership } from "@/src/db/data";
import { createBusinessMembership } from "../actions";
export async function syncMembershipForOrg({
  businessId,
  clerkOrgId,
  clerkUserId,
}: {
  businessId: string;
  clerkOrgId: string;
  clerkUserId: string;
}) {
  // 1️⃣ buscar usuário local
  const user = await fetchUsuarioDB(clerkUserId);
  /*  const [user] = await sql`
    SELECT id
    FROM users
    WHERE clerk_user_id = ${clerkUserId}
  `;
*/
  if (!user) {
    throw new Error("User not found in DB");
  }

  // 2️⃣ verificar membership local
  /*   const [membership] = await sql`
    SELECT *
    FROM business_memberships
    WHERE user_id = ${user.id}
      AND business_id = ${businessId}
  `; */

  const membership = await fetchUserBusinessMembership(user, businessId);

  if (membership) return membership;

  // 3️⃣ descobrir role no Clerk
  // (owner | admin | member)
  /*   const role = await resolveClerkRole({
    clerkOrgId,
    clerkUserId,
  }); */

  //se nenhuma membership existir, criar
  // 4️⃣ criar membership
  /*   const [created] = await sql`
    INSERT INTO business_memberships (
      user_id,
      business_id,
      role
    )
    VALUES (
      ${user.id},
      ${businessId},
      'admin'
    )
    RETURNING *
  `; */

  const criarMembership = await createBusinessMembership(user, businessId);

  if (criarMembership) return criarMembership;

  return membership;
}
