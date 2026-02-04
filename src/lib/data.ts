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
export async function fetchAllProdutos(): Promise<Produto[]> {
  return await getAllProdutos();
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
export async function editarProduto(
  idUUID: string,
  data: Partial<CreateProduto>,
): Promise<Produto> {
  return await updateProduto(idUUID, data);
}

// DELETE
export async function removerProduto(idUUID: string): Promise<void> {
  return await deleteProduto(idUUID);
}
