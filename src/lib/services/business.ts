//import { sql } from "@/src/db/index";
import { syncMembershipForOrg } from "./business_membership";
import { getOrCreateBusiness } from "../actions";

// Função para garantir que o usuario pertence ao business com base no ID do org do Clerk
// se nao existir um membership com o mesmo id passado pelo clerk (clerk_org_id) cria um novo na db. -> usando o getOrCreateBusiness()
export async function ensureBusinessForOrg({
  clerkOrgId,
  clerkUserId,
}: {
  clerkOrgId: string;
  clerkUserId: string;
}) {
  //garantir business
  const business = await getOrCreateBusiness(clerkOrgId);

  //  garantir membership
  await syncMembershipForOrg({
    businessId: business.id,
    clerkOrgId,
    clerkUserId,
  });

  return business;
}
