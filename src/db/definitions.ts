// "entidades" e tipos de dados do banco de dados

// Type User

// Type Categoria

// Type Produto

// Tipos de dados auxiliares ou derivados de entidades e interações

// src/db/definitions.ts - TIPOS para SQL/Frontend

// PRODUTO (exato da tabela Neon)
export type Produto = {
  id: number;           // SQL SERIAL
  nome: string;
  codigo: string;
  preco: number;
  stock_atual: number;  // snake_case do SQL
  stock_minimo?: number;
  unidade?: string;
  descricao?: string;
};

// CATEGORIA
export type Categoria = {
  id_categoria: string;
  nome: string;
  parentId?: string;
};

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

