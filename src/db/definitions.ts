// "entidades" e tipos de dados do banco de dados

// Type User

// Type Categoria

// Type Produto

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
    descricao: "Mecanico hibrido",
  },
];

let proximoId: number = 2;

// alterações:
/* Export type Produto {
id: string,
nome: string,
quantidade: number,
preco: number,
img_url?: string
descricao?: string,
id_categoria: string, 
} */

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

// USUARIO
export type Usuario = {
  id: string;
  img_url: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  adm: boolean;
  criado_em: Date;
  };
