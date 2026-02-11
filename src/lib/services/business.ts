//import { sql } from "@/src/db/index";
import { syncMembershipForOrg } from "./business_membership";
//import { getOrCreateBusiness } from "../actions";
import { sql } from "@/src/db/";
import { CreateBusinessType } from "@/src/db/definitions";

export async function getBusiness(clerkOrgId: string) {
  try {
    const business = await sql`
      SELECT *
      FROM businesses
      WHERE clerk_org_id = ${clerkOrgId}
    `;
    return business[0];
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Erro de base de dados ao buscar business" };
  }
}

export async function createBusiness(business: CreateBusinessType) {
  try {
    const businessData = await sql`
      INSERT INTO businesses (nome, plano, clerk_org_id, created_by_user_id)
      VALUES ( ${business.nome}, ${business.plano}, ${business.clerk_org_id}, ${business.created_by_user_id} )
      RETURNING *
    `;
    return businessData[0];
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Erro de base de dados ao criar business" };
  }
}
export async function getOrCreateBusiness({
  clerkOrgId,
  userId,
  orgName,
}: {
  clerkOrgId: string;
  userId: string;
  orgName: string;
}) {
  let business = await getBusiness(clerkOrgId);

  if (!business) {
    business = await createBusiness({
      nome: orgName,
      plano: "free",
      clerk_org_id: clerkOrgId,
      created_by_user_id: userId,
    });
  }

  return business;
}
// Função para garantir que o usuario pertence ao business com base no ID do org do Clerk
// se nao existir um membership com o mesmo id passado pelo clerk (clerk_org_id) cria um novo na db. -> usando o getOrCreateBusiness()
export async function ensureBusinessForOrg({
  clerkOrgId,
  userId,
  orgName,
}: {
  clerkOrgId: string;
  userId: string;
  orgName: string;
}) {
  //garantir business
  const business = await getOrCreateBusiness({
    clerkOrgId,
    userId,
    orgName,
  });

  //  garantir membership
  await syncMembershipForOrg({
    businessId: business.id,
    clerkOrgId,
    clerkUserId: userId,
  });

  return business;
}
