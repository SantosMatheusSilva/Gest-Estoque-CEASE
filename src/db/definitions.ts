// >>>>>>>>>> NOVOS TIPOS PARA CORRIGIR O ERRO DE BUILD <<<<<<<<<<

export type CreateCategoriaState = {
  errors?: {
    nome?: string[];
    parent_id?: string[];
  };
  message?: string | null;
};

export type DeleteState = {
  message?: string | null;
  errors?: {
    id?: string[];
  };
};
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
  clerk_org_id: string;
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
  business_id?: string;
  clerk_org_id: string;
};

// >>>>>>>>>> Type Usuario <<<<<<<<<<
export type UsuarioType = {
  id: string;
  clerk_user_id: string; // id do Clerk
  //business_id: string;
  //role: "staff" | "owner" | "adm" | "manager";
  created_at: string;
  updated_at: string;
  email: string;
};

export type CreateUsuarioType = {
  clerk_user_id: string;
  business_id: string;
  //role?: "staff" | "owner" | "adm" | "manager"; // default: 'staff'
  email: string;
};

//>>>>>>>>>> Type Usuario - clerk <<<<<<<<<<

//>>>>>>>> Type Business <<<<<<<<<<<

// Dados que vem do DB
export type BusinessType = {
  id: string; // UUID
  nome: string;
  plano: string;
  created_at: string; // TIMESTAMPTZ
  created_by_user_id: string;
  clerk_org_id: string;
};

// Dados que envia para criar
export type CreateBusinessType = {
  nome: string;
  plano: "free" | "standard" | "pro"; // default: 'free'
  clerk_org_id: string;
  created_by_user_id: string;
};

//>>>>>>>> Type Movimentos_Estoque <<<<<<<<<<<

export type MovimentoEstoqueType = {
  id: string;
  produto_id: string;
  //business_id: string;
  quantidade: number;
  tipo: "entrada" | "saida" | "ajuste";
  motivo: "compra" | "venda" | "perda" | "consumo" | "correcao";
  observacao?: string;
  user_id: string;
  created_at: string;
  clerk_org_id: string;
};

export type CreateMovimentoEstoqueType = {
  produto_id: string;
  //business_id?: string;
  quantidade: number;
  tipo: "entrada" | "saida" | "ajuste";
  motivo: "compra" | "venda" | "perda" | "consumo" | "correcao";
  observacao?: string;
  user_id: string;
  clerk_org_id: string;
};

//>>>>>>>> MAIS Type Movimentos_Estoque <<<<<<<<<<<

// ADICIONADO POR ANA:

// Movimento enriquecido com dados do produto (útil para tabelas e listagens)
export type MovimentoComProdutoType = MovimentoEstoqueType & {
  produto: Pick<
    ProdutoType,
    "id" | "nome" | "unidade" | "sku" | "quantidade_estoque"
  >;
};

// Movimento enriquecido com dados do usuário (útil para auditoria)
export type MovimentoComUsuarioType = MovimentoEstoqueType & {
  usuario: Pick<UsuarioType, "id" | "clerk_user_id">;
};

// Movimento totalmente expandido (produto + usuário)
export type MovimentoDetalhadoType = MovimentoEstoqueType & {
  produto: Pick<
    ProdutoType,
    "id" | "nome" | "unidade" | "sku" | "quantidade_estoque"
  >;
  usuario: Pick<UsuarioType, "id" | "clerk_user_id">;
};

// Filtros disponíveis para queries de movimentos
export type FiltrosMovimentoType = {
  business_id: string;
  produto_id?: string;
  tipo?: "entrada" | "saida" | "ajuste";
  motivo?: "compra" | "venda" | "perda" | "consumo" | "correcao";
  user_id?: string;
  data_inicio?: string; // ISO 8601
  data_fim?: string; // ISO 8601
  page?: number; // para paginação
  limit?: number; // itens por página
};

// Resumo agregado de movimentos por produto (útil para dashboards)
export type ResumoEstoqueProdutoType = {
  produto_id: string;
  nome_produto: string;
  quantidade_estoque_atual: number;
  estoque_minimo: number;
  abaixo_minimo: boolean; // quantidade_estoque_atual < estoque_minimo
  total_entradas: number; // soma das quantidades com tipo = 'entrada'
  total_saidas: number; // soma das quantidades com tipo = 'saida' | 'quebra' | 'consumo_interno'
  ultimo_movimento: string | null; // created_at do último movimento
};

// Alerta de estoque mínimo
export type AlertaEstoqueType = {
  produto_id: string;
  nome_produto: string;
  sku?: string;
  quantidade_estoque: number;
  estoque_minimo: number;
  unidade: string;
  diferenca: number; // estoque_minimo - quantidade_estoque (sempre positivo neste contexto)
};

// Resposta paginada genérica para listagens de movimentos
export type PaginacaoMovimentosType = {
  data: MovimentoComProdutoType[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

// JUSTIFICATIVA DOS TIPOS ADICIONADOS:

// MovimentoComProdutoType — join com produto, para a tabela da pageMovimentosEstoque
// MovimentoComUsuarioType — join com utilizador, para logs de auditoria
// MovimentoDetalhadoType — versão completa (produto + utilizador), para páginas de detalhe
// FiltrosMovimentoType — parâmetros de filtragem para as queries (por tipo, motivo, datas, paginação)
// ResumoEstoqueProdutoType — agregado por produto, para o dashboard
// AlertaEstoqueType — produtos abaixo do estoque mínimo, para alertas no dashboard
// PaginacaoMovimentosType — wrapper de resposta paginada para a listagem

//>>>>>>>> FIM TIPOS ESTOQUE <<<<<<<<<<<
