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


export type Produto = {
  idUUID: string;
  nome: string;
  quantidade: number;
  preco: number;
  img_url?: string | null;
  descricao?: string | null;
  id_categoria: string;
  criado_em: string;
  atualizado_em: string;
  adicionado_por: string;
}

export interface CreateProduto {
  nome: string;
  quantidade: number;
  preco: number;
  img_url?: string | null;        
  descricao?: string | null;      
  id_categoria: string;
  adicionado_por: string;
}

// USUARIO

/*
ALTERAÇOES
export type Usuario = {
  id: string;
  img_url: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha_hash: string; // alteraçao
  adm: boolean;
  criado_em: Date;
  }; */


// =====================
// USUÁRIO (Banco)
// =====================
export type UsuarioDB = {
  id: string;
  img_url?: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha_hash: string;
  adm: boolean;
  criado_em: Date;
};

// =====================
// INPUT (Action)
// =====================
export type CriarUsuarioInput = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
};

// =====================
// OUTPUT (Seguro)
// =====================
export type UsuarioPublico = {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  adm: boolean;
  img_url?: string;
};
