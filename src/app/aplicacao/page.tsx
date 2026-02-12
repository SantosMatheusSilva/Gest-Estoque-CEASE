import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// esta função apenas é usada para apos a autenticação, ascedear ao id da org ativa (clerk cria primeira org automaticamente), e redirecionar para /[orgId]
export default async function AplicacaoIndex() {
  const { orgId: activeOrgId } = await auth();

  if (!activeOrgId) {
    redirect("/");
  }

  redirect(`/aplicacao/${activeOrgId}`);
}
