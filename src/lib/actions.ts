// ficheiro para criação das server actions:
// ações que interagem com a base de dados utilizando as queries e logica de negócio.

import type { Produto } from '../db/definitions';
import { produtos} from '../db/definitions';

export function listarProdutos(): Produto[] {
  return produtos;
}

let proximoIdLocal = 2;

export function criarProduto(produto: Omit<Produto, 'id'>): Produto {
  const novoProduto: Produto = {
    id: proximoIdLocal++, 
    ...produto
  };
  produtos.push(novoProduto);
  return novoProduto;
}

export function buscarProdutoPorId(id: number): Produto | undefined {
  return produtos.find(p => p.id === id);
}

export function atualizarProduto(id: number, dados: Partial<Produto>): Produto | null {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return null;
  
  Object.assign(produto, dados);
  return produto;
}

export function removerProduto(id: number): boolean {
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) return false;
  produtos.splice(index, 1);
  return true;
}