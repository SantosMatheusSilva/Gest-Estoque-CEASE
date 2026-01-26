// "entidades" e tipos de dados do banco de dados

// Type User

//Type Grupo

//Type Sub_Grupo

//Type Produto

// Tipos de dados auxiliares ou derivados de entidades e interações

export let produtos: Produto[] = [
  {
    id: 1,
    nome: "Teclado BENQ",
    codigo: "BENQ123",
    preco: 100.99,
    stockAtual: 50,
    stockMinimo: 10,
    unidade: "unidade",
    descricao: "Mecanico hibrido"
  }
];

let proximoId: number = 2;

export interface Produto {
  id: number;
  nome: string;
  codigo: string;
  preco: number;
  stockAtual: number;
  stockMinimo: number;
  unidade: string;
  descricao?: string;
}

