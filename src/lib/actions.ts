// ficheiro para criação das server actions:
// ações que interagem com a base de dados utilizando as queries e logica de negócio.
// queries de INSERT, UPDATE, DELETE.
//// exemplo de query de inserção:
/* 
export async function createInvoice(prevState: State, formData: FormData) {
  //vaçidate inputs with zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  //// If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
*/


'use server';
import { sql } from '../db';
import type { Produto, CreateProduto } from '../db/definitions';

type SqlResult<T> = any[];

export async function getAllProdutos(): Promise<Produto[]> {
  const result = await sql`SELECT * FROM produto ORDER BY criado_em DESC` as SqlResult<Produto>;
  return result as Produto[];
}

export async function createProduto(produto: CreateProduto): Promise<Produto> {
  const result = await sql`
    INSERT INTO produto (
      nome, quantidade, preco, img_url, descricao, 
      id_categoria, adicionado_por
    )
    VALUES (
      ${produto.nome},
      ${Number(produto.quantidade) ?? 0},    // ✅ number sempre
      ${Number(produto.preco) ?? 0},         // ✅ number sempre  
      ${produto.img_url ?? null},            // ✅ null OK
      ${produto.descricao ?? null},          // ✅ null OK
      ${produto.id_categoria},
      ${produto.adicionado_por}
    )
    RETURNING *
  ` as SqlResult<Produto>;
  return result[0] as Produto;
}


export async function getProdutoById(idUUID: string): Promise<Produto | null> {
  const result = await sql`SELECT * FROM produto WHERE idUUID = ${idUUID}` as SqlResult<Produto>;
  return result[0] ?? null;
}

export async function updateProduto(idUUID: string, data: Partial<CreateProduto>): Promise<Produto> {
  const result = await sql`
    UPDATE produto 
    SET nome = COALESCE(${data.nome ?? null}, nome),
    quantidade = COALESCE(${Number(data.quantidade) ?? null}, quantidade),
    preco = COALESCE(${Number(data.preco) ?? null}, preco),
    WHERE idUUID = ${idUUID}
    RETURNING *
  ` as SqlResult<Produto>;
  return result[0] as Produto;
}

export async function deleteProduto(idUUID: string): Promise<void> {
  await sql`DELETE FROM produto WHERE idUUID = ${idUUID}`;
}



