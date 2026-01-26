import { NextResponse } from 'next/server';
import { listarProdutos, criarProduto } from '../../../lib/actions';
import type { Produto } from '../../../db/definitions';

export async function GET() {
  const todos = listarProdutos();
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const novo: Omit<Produto, 'id'> = await request.json();
  const criado = criarProduto(novo);
  return NextResponse.json(criado, { status: 201 });
}
