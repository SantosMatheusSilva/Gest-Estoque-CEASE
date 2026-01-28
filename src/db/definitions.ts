// "entidades" e tipos de dados do banco de dados

// Type User

// Type Categoria

export type Categoria = {
  // tipo de dado - como esta na db
  id: string;
  nome: string;
  parent_id: string | null;
  created_at: Date;
  updated_at: Date;
  adicionado_por: string;
};

export type CategoriaRaiz = Categoria & {
  // tipo de categoria raiz/pai
  parent_id: null;
};

export type SubCategoria = Categoria & {
  // tipo de subcategoria/filha
  parent_id: string;
};

// Adicionar categoria  e sub categoria
export type CriarCategoria = {
  nome: string;
  parent_id?: null;
  adicionado_por: string;
};
export type CriarSubCategoria = {
  nome: string;
  parent_id: string;
  adicionado_por: string;
};

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
  quantidade: number;
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
