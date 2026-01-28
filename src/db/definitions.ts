// "entidades" e tipos de dados do banco de dados

// Type User

// Type Categoria

export type Categoria = {
  id_categoria: string;
  nome: string;
  parentId?: string;
};

// Type Produto

// alterações:
/* Export type Produto = {
id: string,
nome: string,
quantidade: number,
preco: number,
img_url?: string
descricao?: string,
id_categoria: string, 
} */

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
