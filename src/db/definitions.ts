//>>>>>>>>>> Type Categoria <<<<<<<<<<<

export type Categoria = {
  // tipo de dado - como esta na db
  id_categoria: string;
  nome: string;
  parent_id: string | null;
  created_at: Date;
  updated_at: Date;
  adicionado_por: string;
  business_id?: string;
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

//>>>>>>>>>> Type Produto <<<<<<<<<<

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

export type CreateProduto = {
  nome: string;
  quantidade: number;
  preco: number;
  img_url?: string | null;
  descricao?: string | null;
  id_categoria: string;
  adicionado_por: string;
};

export type ProdutoType = {
  id: string;
  nome: string;
  quantidade_estoque: number;
  preco_venda: number;
  img_url?: string;
  descricao?: string;
  id_categoria: string;
  created_at: string;
  updated_at: string;
  adicionado_por: string; // user_id
  sku?: string;
  ativo: boolean;
  preco_custo?: number;
  estoque_minimo: number;
  is_final: boolean;
  unidade: string;
  business_id: string;
};

export type CreateProdutoType = {
  nome: string;
  quantidade_estoque: number;
  preco_venda: number;
  img_url?: string;
  descricao?: string;
  id_categoria: string;
  adicionado_por: string; // user_id
  sku?: string;
  ativo?: boolean;
  preco_custo?: number;
  estoque_minimo?: number;
  is_final?: boolean;
  unidade?: string;
  business_id: string;
};

// >>>>>>>>>> Type Usuario <<<<<<<<<<
export type UsuarioType = {
  id: string;
  clerk_user_id: string; // id do Clerk
  business_id: string;
  role: "staff" | "owner" | "adm" | "manager";
  created_at: string;
};

export type CreateUsuarioType = {
  clerk_user_id: string;
  business_id: string;
  role?: "staff" | "owner" | "adm" | "manager"; // default: 'staff'
};

//>>>>>>>>>> Type Usuario - clerk <<<<<<<<<<

//>>>>>>>> Type Business <<<<<<<<<<<

// Dados que vem do DB
export type BusinessType = {
  id: string; // UUID
  nome: string;
  plano: string;
  created_at: string; // TIMESTAMPTZ
};

// Dados que envia para criar
export type CreateBusinessType = {
  nome: string;
  plano?: string; // default: 'free'
};

//>>>>>>>> Type Movimentos_Estoque <<<<<<<<<<<

export type MovimentoEstoqueType = {
  id: string;
  produto_id: string;
  business_id: string;
  quantidade: number;
  tipo: "entrada" | "saida" | "ajuste";
  motivo?: "compra" | "venda" | "perda" | "consumo" | "correcao";
  observacao?: string;
  user_id: string;
  created_at: string;
};

export type CreateMovimentoEstoqueType = {
  produto_id: string;
  business_id: string;
  quantidade: number;
  tipo: "entrada" | "saida" | "ajuste";
  motivo?: "compra" | "venda" | "perda" | "consumo" | "correcao";
  observacao?: string;
  user_id: string;
};
