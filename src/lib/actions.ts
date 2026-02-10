// ficheiro para criação das server actions:
// ações que interagem com a base de dados utilizando as queries e logica de negócio.
// queries de INSERT, UPDATE, DELETE.
"use server";

import { sql } from "../db";
import type { Produto, CreateProduto } from "../db/definitions";

import type {
  Categoria,
  CriarCategoria,
  CriarSubCategoria,
} from "../db/definitions";

import { z } from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ========== PRODUTOS ==========

// 1) LISTAR TODOS
export async function getAllProdutos(): Promise<Produto[]> {
  const result = await sql`
    SELECT *
    FROM produtos
    ORDER BY created_at DESC
  `;
  return result as unknown as Produto[];
}

// 2) CRIAR
export async function createProduto(produto: CreateProduto): Promise<Produto> {
  const result = await sql`
    INSERT INTO produtos (
      nome,
      quantidade,
      preco,
      img_url,
      descricao,
      id_categoria,
      adicionado_por
    )
    VALUES (
      ${produto.nome},
      ${Number(produto.quantidade)},
      ${Number(produto.preco)},
      ${produto.img_url ?? null},
      ${produto.descricao ?? null},
      ${produto.id_categoria},
      ${produto.adicionado_por}
    )
    RETURNING *
  `;
  const rows = result as unknown as Produto[];
  return rows[0];
}

// 3) BUSCAR POR ID
export async function getProdutoById(id: string): Promise<Produto | null> {
  const result = await sql`
    SELECT *
    FROM produtos
    WHERE id = ${id}
  `;
  const rows = result as unknown as Produto[];
  return rows[0] ?? null;
}

// 4) ATUALIZAR
export async function updateProduto(
  idUUID: string,
  prevState: Produto,
  data: Partial<CreateProduto>,
): Promise<Produto> {
  const result = await sql`
    UPDATE produtos
    SET
      nome       = COALESCE(${data.nome ?? null}, nome),
      quantidade = COALESCE(${data.quantidade ?? null}, quantidade),
      preco      = COALESCE(${data.preco ?? null}, preco),
      img_url    = COALESCE(${data.img_url ?? null}, img_url),
      descricao  = COALESCE(${data.descricao ?? null}, descricao),
      updated_at = NOW()
    WHERE id = ${idUUID}
    RETURNING *
  `;
  const rows = result as unknown as Produto[];
  return rows[0];
}

// 5) DELETAR
export async function deleteProduto(idUUID: string): Promise<void> {
  await sql`
    DELETE FROM produtos
    WHERE id = ${idUUID}
  `;
}

// ========== USUÁRIO ==========

export async function criarUsuario(formData: FormData) {
  const email = formData.get("email") as string;
  const senha = formData.get("senha") as string;

  if (!email || !senha) {
    throw new Error("Dados inválidos");
  }

  console.log("Usuário:", email);
  console.log("Senha:", senha);
}

// ========== CATEGORIAS ==========

// 1) LISTAR TODAS AS CATEGORIAS RAIZ
export async function getAllCategorias(): Promise<Categoria[]> {
  const result = await sql`
    SELECT *
    FROM categorias
    WHERE parent_id IS NULL
    ORDER BY created_at DESC
  `;
  return result as unknown as Categoria[];
}

// 2) BUSCAR CATEGORIA POR ID
export async function getCategoriaById(id: string): Promise<Categoria | null> {
  const result = await sql`
    SELECT *
    FROM categorias
    WHERE id_categoria = ${id}
  `;
  const rows = result as unknown as Categoria[];
  return rows[0] ?? null;
}

// const criarCategoriaSchema = z.object({
//   nome: z
//     .string()
//     .min(3, "O nome deve ter pelo menos 3 caracteres")
//     .max(50, "O nome deve ter no máximo 50 caracteres")
//     .trim(),

//   adicionado_por: z.string().uuid(),
// });

// ========== CATEGORIAS ==========

// 1. Definição do Tipo (Unificado para evitar erros)
export type CreateCategoriaState = {
  errors?: {
    nome?: string[];
    parent_id?: string[]; // Adicionado para suportar subcategorias
  };
  message?: string | null;
};

// 2. Schemas de Validação
const CategoriaSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .trim(),
});

// Criamos o SubCategoriaSchema baseado no anterior, mas com parent_id
const SubCategoriaSchema = CategoriaSchema.extend({
  parent_id: z.string().uuid("ID da categoria pai inválido."),
});

// 3. Action para Categoria Raiz
export async function createCategoriaAction(
  prevState: CreateCategoriaState,
  formData: FormData,
): Promise<CreateCategoriaState> {
  const validatedFields = CategoriaSchema.safeParse({
    nome: formData.get("nome"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. Falha ao criar categoria.",
    };
  }

  const { nome } = validatedFields.data;
  const userId = "id_temporario_usuario";

  // passa parent_is por parametro ou dropdow

  try {
    const existing = await sql`
      SELECT id_categoria FROM categorias 
      WHERE LOWER(nome) = LOWER(${nome}) AND parent_id IS NULL
    `;

    // verificar depois se existe uma equals()

    if (existing.length > 0) {
      return {
        errors: { nome: ["Já existe uma categoria com este nome."] },
        message: "Erro: Nome duplicado.",
      };
    }

    await sql`
      INSERT INTO categorias (nome, parent_id, adicionado_por)
      VALUES (${nome}, NULL, ${userId})
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Erro de base de dados: Não foi possível criar a categoria.",
    };
  }

  console.log("Categoria Criada com sucesso!");

  revalidatePath("/aplicacao/categorias");
  redirect("/aplicacao/categorias");
}

// 4) CRIAR SUBCATEGORIA
export async function createSubCategoria(
  data: CriarSubCategoria,
): Promise<Categoria> {
  const result = await sql`
    INSERT INTO categorias (nome, parent_id, adicionado_por)
    VALUES (${data.nome}, ${data.parent_id}, ${data.adicionado_por})
    RETURNING *
  `;
  const rows = result as unknown as Categoria[];
  return rows[0];
}

// 4. VERSAO ADPTADA - Action para Subcategoria
export async function createSubCategoriaAction(
  prevState: CreateCategoriaState,
  formData: FormData,
): Promise<CreateCategoriaState> {
  const validatedFields = SubCategoriaSchema.safeParse({
    nome: formData.get("nome"),
    parent_id: formData.get("parent_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro de validação na subcategoria.",
    };
  }

  const { nome, parent_id } = validatedFields.data;
  const userId = "11111111-1111-1111-1111-111111111111";

  try {
    const existing = await sql`
      SELECT id_categoria FROM categorias 
      WHERE LOWER(nome) = LOWER(${nome}) AND parent_id = ${parent_id}
    `;

    // EXPLICAÇÃO:
    if (existing.length > 0) {
      return {
        errors: {
          nome: ["Já existe esta subcategoria dentro desta categoria pai."],
        },
        message: "Erro: Nome duplicado no mesmo nível.",
      };
    }

    await sql`
      INSERT INTO categorias (nome, parent_id, adicionado_por)
      VALUES (${nome}, ${parent_id}, ${userId})
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Erro de base de dados ao criar subcategoria." };
  }

  console.log(formData.get("parent_id"));

  revalidatePath("/aplicacao/categorias");
  revalidatePath(`/aplicacao/categorias/${parent_id}/detalhes`);
  redirect(`/aplicacao/categorias/${parent_id}/detalhes`);
}

// 5) ATUALIZAR CATEGORIA
export async function updateCategoria(
  id: string,
  nome: string,
): Promise<Categoria> {
  const result = await sql`
    UPDATE categorias
    SET nome = ${nome}, updated_at = NOW()
    WHERE id_categoria = ${id}
    RETURNING *
  `;
  const rows = result as unknown as Categoria[];
  return rows[0];
}

// 6) DELETAR CATEGORIA
export async function deleteCategoria(id: string): Promise<void> {
  await sql`
    DELETE FROM categorias
    WHERE id_categoria = ${id}
  `;
}

// ========== PRODUTOS - ACTIONS COM VALIDAÇÃO ZOD ==========

// 1. Schema de Validação para Criar Produto
const CreateProdutoSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres")
    .trim(),

  quantidade: z.string().transform((val) => {
    const num = Number(val);
    if (isNaN(num)) throw new Error("A quantidade deve ser um número");
    if (!Number.isInteger(num))
      throw new Error("A quantidade deve ser um número inteiro");
    if (num < 0) throw new Error("A quantidade não pode ser negativa");
    return num;
  }),

  preco: z.string().transform((val) => {
    const num = Number(val);
    if (isNaN(num)) throw new Error("O preço deve ser um número");
    if (num <= 0) throw new Error("O preço deve ser maior que zero");
    return num;
  }),

  id_categoria: z.string().uuid("Selecione uma categoria válida"),

  descricao: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),

  img_url: z
    .string()
    .url("Digite uma URL válida para a imagem")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
});

// 2. Schema para Editar Produto (partial do anterior)
const UpdateProdutoSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres")
    .trim()
    .optional(),

  quantidade: z
    .string()
    .transform((val) => {
      if (!val) return undefined;
      const num = Number(val);
      if (isNaN(num)) throw new Error("A quantidade deve ser um número");
      if (!Number.isInteger(num))
        throw new Error("A quantidade deve ser um número inteiro");
      if (num < 0) throw new Error("A quantidade não pode ser negativa");
      return num;
    })
    .optional(),

  preco: z
    .string()
    .transform((val) => {
      if (!val) return undefined;
      const num = Number(val);
      if (isNaN(num)) throw new Error("O preço deve ser um número");
      if (num <= 0) throw new Error("O preço deve ser maior que zero");
      return num;
    })
    .optional(),

  id_categoria: z.string().uuid("Selecione uma categoria válida").optional(),

  descricao: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),

  img_url: z
    .string()
    .url("Digite uma URL válida para a imagem")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
});

// 3. Tipo de Estado para o Form
export type CreateProdutoState = {
  errors?: {
    nome?: string[];
    quantidade?: string[];
    preco?: string[];
    id_categoria?: string[];
    descricao?: string[];
    img_url?: string[];
  };
  message?: string | null;
};

// 4. Action para CRIAR Produto
export async function createProdutoAction(
  prevState: CreateProdutoState,
  formData: FormData,
): Promise<CreateProdutoState> {
  // Validar campos com Zod
  const validatedFields = CreateProdutoSchema.safeParse({
    nome: formData.get("nome"),
    quantidade: formData.get("quantidade"),
    preco: formData.get("preco"),
    id_categoria: formData.get("id_categoria"),
    descricao: formData.get("descricao"),
    img_url: formData.get("img_url"),
  });

  // Se validação falhar, retornar erros
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. Falha ao criar produto.",
    };
  }

  const { nome, quantidade, preco, id_categoria, descricao, img_url } =
    validatedFields.data;

  // ID do usuário (temporário - substituir por Clerk userId)
  const userId = "11111111-1111-1111-1111-111111111111";

  try {
    // Verificar se já existe produto com mesmo nome na mesma categoria
    const existing = await sql`
      SELECT id FROM produtos 
      WHERE LOWER(nome) = LOWER(${nome}) 
        AND id_categoria = ${id_categoria}
    `;

    if (existing.length > 0) {
      return {
        errors: {
          nome: ["Já existe um produto com este nome nesta categoria."],
        },
        message: "Erro: Nome duplicado na categoria.",
      };
    }

    // Preparar valores para inserção
    const imgUrlValue = img_url ?? null;
    const descricaoValue = descricao ?? null;

    // Inserir produto na BD
    await sql`
      INSERT INTO produtos (
        nome,
        quantidade,
        preco,
        img_url,
        descricao,
        id_categoria,
        adicionado_por
      )
      VALUES (
        ${nome},
        ${quantidade},
        ${preco},
        ${imgUrlValue},
        ${descricaoValue},
        ${id_categoria},
        ${userId}
      )
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Erro de base de dados: Não foi possível criar o produto.",
    };
  }

  // Revalidar e redirecionar
  revalidatePath("/aplicacao/produtos");
  redirect("/aplicacao/produtos");
}

// 5. Action para EDITAR Produto
export async function updateProdutoAction(
  id: string,
  prevState: CreateProdutoState,
  formData: FormData,
): Promise<CreateProdutoState> {
  // Obter ID do formData
  /*   const id = formData.get("id") as string;

  if (!id) {
    return {
      message: "ID do produto não fornecido.",
    };
  } */

  // Validar campos com Zod (partial)
  const validatedFields = UpdateProdutoSchema.safeParse({
    nome: formData.get("nome"),
    quantidade: formData.get("quantidade"),
    preco: formData.get("preco"),
    id_categoria: formData.get("id_categoria"),
    descricao: formData.get("descricao"),
    img_url: formData.get("img_url"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. Falha ao atualizar produto.",
    };
  }

  const { nome, quantidade, preco, id_categoria, descricao, img_url } =
    validatedFields.data;

  try {
    // Verificar se produto existe
    const produtoExistente = await sql`
      SELECT id, id_categoria FROM produtos WHERE id = ${id}
    `;

    if (produtoExistente.length === 0) {
      return {
        message: "Produto não encontrado.",
      };
    }

    // Se o nome foi alterado, verificar duplicação
    if (nome) {
      const categoriaAtual =
        id_categoria || (produtoExistente[0] as any).id_categoria;
      const existing = await sql`
        SELECT id FROM produtos 
        WHERE LOWER(nome) = LOWER(${nome}) 
          AND id_categoria = ${categoriaAtual}
          AND id != ${id}
      `;

      if (existing.length > 0) {
        return {
          errors: {
            nome: ["Já existe outro produto com este nome nesta categoria."],
          },
          message: "Erro: Nome duplicado.",
        };
      }
    }

    // Preparar valores para update
    const nomeValue = nome ?? null;
    const quantidadeValue = quantidade ?? null;
    const precoValue = preco ?? null;
    const imgUrlValue = img_url ?? null;
    const descricaoValue = descricao ?? null;
    const idCategoriaValue = id_categoria ?? null;

    // Atualizar produto (apenas campos fornecidos)
    await sql`
      UPDATE produtos
      SET
        nome = COALESCE(${nomeValue}, nome),
        quantidade = COALESCE(${quantidadeValue}, quantidade),
        preco = COALESCE(${precoValue}, preco),
        img_url = COALESCE(${imgUrlValue}, img_url),
        descricao = COALESCE(${descricaoValue}, descricao),
        id_categoria = COALESCE(${idCategoriaValue}, id_categoria),
        updated_at = NOW()
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Erro de base de dados: Não foi possível atualizar o produto.",
    };
  }

  revalidatePath("/aplicacao/produtos");
  revalidatePath(`/aplicacao/produtos/${id}/detalhes`);
  redirect("/aplicacao/produtos");
}

// ========== DELETE PRODUTO COM VALIDAÇÃO ZOD ==========

// Schema para validar o ID antes de deletar
const DeleteProdutoSchema = z.object({
  id: z.string().uuid("ID do produto inválido"),
});

// Tipo de Estado para o Delete
export type DeleteProdutoState = {
  success?: boolean;
  error?: string;
  message?: string | null;
};

// 6. Action para DELETAR Produto (NOVA VERSÃO COM VALIDAÇÃO)
export async function deleteProdutoAction(
  prevState: DeleteProdutoState,
  formData: FormData,
): Promise<DeleteProdutoState> {
  // Validar ID com Zod
  const validatedFields = DeleteProdutoSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: "invalid_id",
      message: "Erro: ID do produto é inválido.",
    };
  }

  const { id } = validatedFields.data;

  try {
    // 1. Verificar se o produto existe antes de deletar
    const produtoExistente = await sql`
      SELECT id, nome FROM produtos WHERE id = ${id}
    `;

    if (produtoExistente.length === 0) {
      return {
        success: false,
        error: "not_found",
        message: "Produto não encontrado. Pode já ter sido removido.",
      };
    }

    // 2. (OPCIONAL) Verificar se há dependências
    // Descomente se precisar verificar vendas ou outras relações
    /*
    const vendasAssociadas = await sql`
      SELECT COUNT(*) as total FROM vendas WHERE produto_id = ${id}
    `;
    
    if (vendasAssociadas[0].total > 0) {
      return {
        success: false,
        error: "has_dependencies",
        message: "Não é possível deletar. Este produto tem vendas associadas.",
      };
    }
    */

    // 3. Deletar o produto
    await sql`
      DELETE FROM produtos
      WHERE id = ${id}
    `;

    // 4. Sucesso - revalidar cache
    revalidatePath("/aplicacao/produtos");

    return {
      success: true,
      message: "Produto deletado com sucesso!",
    };
  } catch (error) {
    console.error("Database Error ao deletar produto:", error);
    return {
      success: false,
      error: "database_error",
      message: "Erro de base de dados: Não foi possível deletar o produto.",
    };
  }
}


// ADCIONADO A ACTIO PARA ESTOQUE
// ========== MOVIMENTOS DE ESTOQUE ==========

// 1. Schema de Validação
const CreateMovimentoEstoqueSchema = z.object({
  produto_id: z.string().uuid("Selecione um produto válido"),

  business_id: z.string().uuid("Business ID inválido"),

  quantidade: z.string().transform((val) => {
    const num = Number(val);
    if (isNaN(num)) throw new Error("A quantidade deve ser um número");
    if (!Number.isInteger(num))
      throw new Error("A quantidade deve ser um número inteiro");
    if (num <= 0) throw new Error("A quantidade deve ser maior que zero");
    return num;
  }),

  tipo: z.enum(["entrada", "saida", "ajuste"], {
    message: "Tipo de movimento inválido.",
  }),

  motivo: z
    .enum(["compra", "venda", "perda", "consumo", "correcao"])
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),

  observacao: z
    .string()
    .max(500, "A observação deve ter no máximo 500 caracteres")
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
});

// 2. Tipo de Estado para o Form
export type CreateMovimentoEstoqueState = {
  errors?: {
    produto_id?: string[];
    business_id?: string[];
    quantidade?: string[];
    tipo?: string[];
    motivo?: string[];
    observacao?: string[];
  };
  message?: string | null;
};

// 3. Action para CRIAR Movimento de Estoque
export async function createMovimentoEstoqueAction(
  userId: string,
  prevState: CreateMovimentoEstoqueState,
  formData: FormData,
): Promise<CreateMovimentoEstoqueState> {
  // 1. Validar campos com Zod
  const validatedFields = CreateMovimentoEstoqueSchema.safeParse({
    produto_id: formData.get("produto_id"),
    business_id: formData.get("business_id"),
    quantidade: formData.get("quantidade"),
    tipo: formData.get("tipo"),
    motivo: formData.get("motivo"),
    observacao: formData.get("observacao"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. Falha ao registar movimento.",
    };
  }

  const { produto_id, business_id, quantidade, tipo, motivo, observacao } =
    validatedFields.data;

  try {
    // 2. Verificar se o produto existe e pertence ao business
    const produto = await sql`
      SELECT id, quantidade_estoque, estoque_minimo
      FROM produtos
      WHERE id = ${produto_id}
        AND business_id = ${business_id}
    `;

    if (produto.length === 0) {
      return {
        errors: { produto_id: ["Produto não encontrado neste business."] },
        message: "Erro: Produto inválido.",
      };
    }

    const estoqueAtual = Number((produto[0] as any).quantidade_estoque);

    // 3. Para saídas, verificar se há stock suficiente
    if (tipo === "saida" && estoqueAtual < quantidade) {
      return {
        errors: {
          quantidade: [`Stock insuficiente. Disponível: ${estoqueAtual}.`],
        },
        message: "Erro: Stock insuficiente para esta saída.",
      };
    }

    // 4. Registar o movimento
    await sql`
      INSERT INTO movimentos (
        produto_id,
        business_id,
        quantidade,
        tipo,
        motivo,
        observacao,
        user_id
      )
      VALUES (
        ${produto_id},
        ${business_id},
        ${quantidade},
        ${tipo},
        ${motivo ?? null},
        ${observacao ?? null},
        ${userId}
      )
    `;

    // 5. Atualizar o stock do produto consoante o tipo
    await sql`
      UPDATE produtos
      SET
        quantidade_estoque = CASE
          WHEN ${tipo} = 'entrada' THEN quantidade_estoque + ${quantidade}
          WHEN ${tipo} = 'saida'   THEN quantidade_estoque - ${quantidade}
          WHEN ${tipo} = 'ajuste'  THEN ${quantidade}
        END,
        updated_at = NOW()
      WHERE id = ${produto_id}
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Erro de base de dados: Não foi possível registar o movimento.",
    };
  }

  revalidatePath("/aplicacao/produtos");
  revalidatePath("/aplicacao/movimentos");
  redirect("/aplicacao/movimentos");
}
