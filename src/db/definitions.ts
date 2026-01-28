// "entidades" e tipos de dados do banco de dados

// Type User

// Type Categoria

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

export type CreateProduto = {
  nome: string;
  quantidade: number;
  preco: number;
  img_url?: string | null;        
  descricao?: string | null;      
  id_categoria: string;
  adicionado_por: string;
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
