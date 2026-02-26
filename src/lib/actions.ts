// ficheiro para criação das server actions:
// ações que interagem com a base de dados utilizando as queries e logica de negócio.
// queries de INSERT, UPDATE, DELETE.
"use server";

import { sql } from "../db";
import type { Produto, CreateProduto } from "../db/definitions";
import { auth } from "@clerk/nextjs/server"; // ← NOVO

import type {
  Categoria,
  CriarCategoria,
  CriarSubCategoria,
  UsuarioType,
} from "../db/definitions";

import { string, z } from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchUsuarioDB } from "../db/data";

// ========== PRODUTOS ==========

// 1) LISTAR TODOS
export async function getAllProdutos(clerk_org_id: string): Promise<Produto[]> {
  const result = await sql`
    SELECT *
    FROM produtos
    WHERE clerk_org_id = ${clerk_org_id}
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

// ========== PRODUTOS - ACTIONS COM VALIDAÇÃO ZOD ==========

// 1. Schema de Validação para Criar Produto
const CreateProdutoSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres")
    .trim(),

  quantidade_estoque: z.string().transform((val) => {
    const num = Number(val);
    if (isNaN(num)) throw new Error("A quantidade deve ser um número");
    if (!Number.isInteger(num))
      throw new Error("A quantidade deve ser um número inteiro");
    if (num < 0) throw new Error("A quantidade não pode ser negativa");
    return num;
  }),

  preco_custo: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      const num = Number(val);
      if (isNaN(num)) throw new Error("O preço de custo deve ser um número");
      if (num <= 0) throw new Error("O preço de custo deve ser maior que zero");
      return num;
    }),

  preco_venda: z.string().transform((val) => {
    const num = Number(val);
    if (isNaN(num)) throw new Error("O preço de venda deve ser um número");
    if (num <= 0) throw new Error("O preço de venda deve ser maior que zero");
    return num;
  }),

  id_categoria: z.string().uuid("Selecione uma categoria válida"),

  clerk_org_id: z.string().min(1, "Organização inválida."),
  clerk_user_id: z.string().min(1, "Utilizador inválido."),

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

  // ✅ NOVOS CAMPOS
  sku: z
    .string()
    .max(100, "O SKU deve ter no máximo 100 caracteres")
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),

  estoque_minimo: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === "") return undefined;
      const num = Number(val);
      if (isNaN(num)) throw new Error("O estoque mínimo deve ser um número");
      if (num < 0) throw new Error("O estoque mínimo não pode ser negativo");
      return num;
    }),

  unidade: z
    .string()
    .max(20, "A unidade deve ter no máximo 20 caracteres")
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),

  is_final: z
    .string()
    .nullable() // ✅ aceita null
    .optional()
    .transform((val) => val === "true"),

  ativo: z
    .string()
    .nullable() // ✅ aceita null
    .optional()
    .transform((val) => val !== "false"),
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
    quantidade_estoque?: string[];
    preco_custo?: string[];
    preco_venda?: string[];
    id_categoria?: string[];
    clerk_org_id?: string[];
    clerk_user_id?: string[];
    descricao?: string[];
    img_url?: string[];
    // ✅ NOVOS CAMPOS
    sku?: string[];
    estoque_minimo?: string[];
    unidade?: string[];
    is_final?: string[];
    ativo?: string[];
  };
  message?: string | null;
};

// 4. Action para CRIAR Produto
export async function createProdutoAction(
  prevState: CreateProdutoState,
  formData: FormData,
): Promise<CreateProdutoState> {
  const { orgId, userId: clerkUserId } = await auth();

  const validatedFields = CreateProdutoSchema.safeParse({
    nome: formData.get("nome"),
    quantidade_estoque: formData.get("quantidade"),
    preco_custo: formData.get("preco"),
    preco_venda: formData.get("preco_venda"),
    id_categoria: formData.get("produto_categoria_id"),
    clerk_org_id: orgId ?? "",
    clerk_user_id: clerkUserId ?? "",
    descricao: formData.get("descricao"),
    img_url: formData.get("img_url"),
    // ✅ NOVOS CAMPOS
    sku: formData.get("sku"),
    estoque_minimo: formData.get("estoque_minimo"),
    unidade: formData.get("unidade"),
    is_final: formData.get("is_final"),
    ativo: formData.get("ativo"),
  });

  if (!validatedFields.success) {
    console.log(
      "❌ Erros de validação:",
      validatedFields.error.flatten().fieldErrors,
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. Falha ao criar produto.",
    };
  }

  const {
    nome,
    quantidade_estoque,
    preco_custo,
    preco_venda,
    id_categoria,
    clerk_org_id,
    clerk_user_id,
    descricao,
    img_url,
    sku,
    estoque_minimo,
    unidade,
    is_final,
    ativo,
  } = validatedFields.data;

  const dbUser = await fetchUsuarioDB(clerk_user_id);
  if (!dbUser) {
    return { message: "Utilizador não encontrado na base de dados." };
  }

  try {
    await sql`
      INSERT INTO produtos (
        nome,
        quantidade_estoque,
        preco_custo,
        preco_venda,
        img_url,
        descricao,
        id_categoria,
        business_id,
        clerk_org_id,
        adicionado_por,
        sku,
        estoque_minimo,
        unidade,
        is_final,
        ativo
      )
      VALUES (
        ${nome},
        ${quantidade_estoque},
        ${preco_custo ?? null},
        ${preco_venda},
        ${img_url ?? null},
        ${descricao ?? null},
        ${id_categoria},
        ${null},
        ${clerk_org_id},
        ${dbUser.id},
        ${sku ?? null},
        ${estoque_minimo ?? null},
        ${unidade ?? null},
        ${is_final ?? false},
        ${ativo ?? true}
      )
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Erro de base de dados: Não foi possível criar o produto.",
    };
  }

  revalidatePath("/aplicacao/produtos");
  redirect("/aplicacao/produtos");
}

// 5. Action para EDITAR Produto
export async function updateProdutoAction(
  id: string,
  prevState: CreateProdutoState,
  formData: FormData,
): Promise<CreateProdutoState> {
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
    const produtoExistente = await sql`
      SELECT id, id_categoria FROM produtos WHERE id = ${id}
    `;

    if (produtoExistente.length === 0) {
      return {
        message: "Produto não encontrado.",
      };
    }

    if (nome) {
      const categoriaAtual =
        id_categoria || (produtoExistente[0] as Produto).id_categoria;
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

    const nomeValue = nome ?? null;
    const quantidadeValue = quantidade ?? null;
    const precoValue = preco ?? null;
    const imgUrlValue = img_url ?? null;
    const descricaoValue = descricao ?? null;
    const idCategoriaValue = id_categoria ?? null;

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

const DeleteProdutoSchema = z.object({
  id: z.string().uuid("ID do produto inválido"),
});

export type DeleteProdutoState = {
  success?: boolean;
  error?: string;
  message?: string | null;
};

// 6. Action para DELETAR Produto
export async function deleteProdutoAction(
  prevState: DeleteProdutoState,
  formData: FormData,
): Promise<DeleteProdutoState> {
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

    await sql`
      DELETE FROM produtos
      WHERE id = ${id}
    `;

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

  //business_id: z.string().uuid("Business ID inválido"),

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

  motivo: z.enum(["compra", "venda", "perda", "consumo", "correcao"], {
    message: "Motivo de movimento inválido.",
  }),

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
  prevState: CreateMovimentoEstoqueState,
  formData: FormData,
): Promise<CreateMovimentoEstoqueState> {
  const { orgId } = await auth();
  const dbUser = await fetchUsuarioDB(orgId as string);

  if (!dbUser) {
    return { message: "Utilizador não encontrado na base de dados." };
  }

  const validatedFields = CreateMovimentoEstoqueSchema.safeParse({
    produto_id: formData.get("produto_id"),
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

  const { produto_id, quantidade, tipo, motivo, observacao } =
    validatedFields.data;

  try {
    const produto = await sql`
      SELECT id, quantidade_estoque, estoque_minimo
      FROM produtos
      WHERE id = ${produto_id}
        AND clerk_org_id = ${orgId as string}
    `;

    if (produto.length === 0) {
      return {
        errors: { produto_id: ["Produto não encontrado neste business."] },
        message: "Erro: Produto inválido.",
      };
    }

    const estoqueAtual = Number(produto[0].quantidade_estoque);

    if (tipo === "saida" && estoqueAtual < quantidade) {
      return {
        errors: {
          quantidade: [`Stock insuficiente. Disponível: ${estoqueAtual}.`],
        },
        message: "Erro: Stock insuficiente para esta saída.",
      };
    }

    await sql`
      INSERT INTO movimentos_estoque (
        produto_id,
        clerk_org_id,
        quantidade,
        tipo,
        motivo,
        observacao,
        user_id
      )
      VALUES (
        ${produto_id},
        ${orgId as string},
        ${quantidade},
        ${tipo},
        ${motivo ?? null},
        ${observacao ?? null},
        ${dbUser.id}
      )
    `;

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
      AND clerk_org_id = ${orgId as string}
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
