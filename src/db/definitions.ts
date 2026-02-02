// "entidades" e tipos de dados do banco de dados

// Type User

// Type Categoria

export type Categoria = {
  // tipo de dado - como esta na db
  id_categoria: string;
  nome: string;
  parent_id: string | null;
  created_at: Date;
  updated_at: Date;
  adicionado_por: string;
};

export type CategoriaRaiz = Categoria & {
  // tipo de categoria raiz/pai
  parent_id: null;
  subcategorias?: SubCategoria[];
  total_produtos?: number;
};

export type SubCategoria = Categoria & {
  // tipo de subcategoria/filha
  parent_id: string;
  total_produtos?: number;
};

// Adicionar categoria  e sub categoria
export type CriarCategoria = {
  nome: string;
  //parent_id?: null;
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
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
  img_url?: string | null;
  descricao?: string | null;
  id_categoria: string;
  created_at: string;
  updated_at: string;
  adicionado_por: string;
};

export type CreateProduto ={
  nome: string;
  quantidade: number;
  preco: number;
  img_url?: string | null;
  descricao?: string | null;
  id_categoria: string;
  adicionado_por: string;
}

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
