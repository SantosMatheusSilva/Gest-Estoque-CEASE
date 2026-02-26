import {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
} from "./actions";
import type { Produto, CreateProduto } from "../db/definitions";

// Camada “limpa” que o app vai usar

// FETCH (lista todos)
export async function fetchAllProdutos(
  clerk_org_id: string,
): Promise<Produto[]> {
  return await getAllProdutos(clerk_org_id);
}

// FETCH (um só produto)
export async function fetchProduto(id: string): Promise<Produto | null> {
  return await getProdutoById(id);
}

// CREATE
export async function adicionarProduto(data: CreateProduto): Promise<Produto> {
  return await createProduto(data);
}

// UPDATE
/* export async function editarProduto(
  idUUID: string,
  data: CreateProduto,
  prevState: Produto
): Produto{
  return await updateProduto(idUUID, data, prevState);
} */

// DELETE
export async function removerProduto(idUUID: string): Promise<void> {
  return await deleteProduto(idUUID);
}
