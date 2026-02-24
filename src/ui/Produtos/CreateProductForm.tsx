"use client";

import { Button } from "@/src/ui/Button";
import FormSurface from "@/src/ui/Surface";
import { InputField } from "../InputField";
import { Modal } from "@heroui/react";
import { IconButton } from "@/src/ui/IconButton";
import { Plus } from "@gravity-ui/icons";
import { SelectField } from "../SelectField";
import { CategoriaRaiz, SubCategoria } from "@/src/db/definitions";
import { createProdutoAction } from "@/src/lib/actions";
import { useActionState, useState } from "react";
import { supabase } from "@/src/lib/supabase";

interface CreateProductFormProps {
  categorias: CategoriaRaiz[];
}

function CreateProductForm({ categorias }: CreateProductFormProps) {
  const [state, formAction] = useActionState(createProdutoAction, {
    errors: {},
    message: null,
  });

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [subcategoriasFiltradas, setSubcategoriasFiltradas] = useState<SubCategoria[]>([]);
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setIsUploading(true);

    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("produtos")
      .upload(fileName, file);

    if (error) {
      console.error("Erro ao fazer upload:", error);
      setIsUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("produtos")
      .getPublicUrl(data.path);

    setImageUrl(publicData.publicUrl);
    setIsUploading(false);
  }

  return (
    <Modal>
      <IconButton startIcon={<Plus />}>Adicionar Produto</IconButton>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Criar Produto</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Preencha o formulário abaixo para criar um novo produto.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <FormSurface variant="default">
                <form action={async (formData) => {
                  console.log("📦 produto_categoria_id:", formData.get("produto_categoria_id"));
                  console.log("📦 categoriaSelecionada state:", categoriaSelecionada);
                  await formAction(formData);
                }}>

                  <InputField
                    label="Nome"
                    description="Digite o nome do produto"
                    inputProps={{ id: "nome", name: "nome", type: "text", required: true }}
                    error={state?.errors?.nome?.[0]}
                  />

                  <InputField
                    label="Quantidade"
                    description="Digite a quantidade do produto"
                    inputProps={{ id: "quantidade", name: "quantidade", type: "number", required: true, min: 0, step: 1 }}
                    error={state?.errors?.quantidade_estoque?.[0]}
                  />

                  <InputField
                    label="Preço"
                    description="Digite o preço (de custo) do produto"
                    inputProps={{ id: "preco", name: "preco", type: "number", required: true, min: 0, step: 0.01 }}
                    error={state?.errors?.preco_custo?.[0]}
                  />

                  <InputField
                    label="Preço de Venda"
                    description="Digite o preço de venda do produto"
                    inputProps={{
                      id: "preco_venda",
                      name: "preco_venda",
                      type: "number",
                      required: true,
                      min: 0,
                      step: 0.01,
                    }}
                    error={state?.errors?.preco_venda?.[0]}
                  />

                  <SelectField
                    label="Categoria"
                    name="id_categoria"
                    options={categorias.map((c) => ({ id: c.id_categoria, label: c.nome }))}
                    value={categoriaSelecionada}
                    required
                    error={state?.errors?.id_categoria?.[0]}
                    onValueChange={(categoriaId) => {
                      console.log("🔵 onValueChange disparou:", categoriaId);
                      // ✅ Guarda contra null — não apaga o estado
                      if (categoriaId) {
                        setCategoriaSelecionada(categoriaId);
                        const subcats = categorias.find((c) => c.id_categoria === categoriaId)?.subcategorias || [];
                        setSubcategoriasFiltradas(subcats);
                        setSubcategoriaSelecionada("");
                      }
                    }}
                  />

                  {/* nome único para evitar conflito com o SelectField */}
                  <input type="hidden" name="produto_categoria_id" value={categoriaSelecionada} />

                  <SelectField
                    label="Subcategoria"
                    name="id_subcategoria"
                    options={subcategoriasFiltradas.map((s) => ({ id: s.id_categoria, label: s.nome }))}
                    value={subcategoriaSelecionada}
                    onValueChange={(subcatId) => {
                      if (subcatId) setSubcategoriaSelecionada(subcatId);
                    }}
                    required={false}
                  />

                  <InputField
                    label="SKU (opcional)"
                    description="Código único do produto (ex: PROD-001)"
                    inputProps={{ id: "sku", name: "sku", type: "text" }}
                    error={state?.errors?.sku?.[0]}
                  />

                  <InputField
                    label="Estoque Mínimo (opcional)"
                    description="Quantidade mínima antes de alertar"
                    inputProps={{ id: "estoque_minimo", name: "estoque_minimo", type: "number", min: 0, step: 1 }}
                    error={state?.errors?.estoque_minimo?.[0]}
                  />

                  <InputField
                    label="Unidade (opcional)"
                    description="Ex: un, kg, L, m"
                    inputProps={{ id: "unidade", name: "unidade", type: "text" }}
                    error={state?.errors?.unidade?.[0]}
                  />

                  {/* is_final — produto acabado ou intermédio */}
                  <div className="mb-4 flex items-center gap-2">
                    <input type="checkbox" id="is_final" name="is_final" value="true" />
                    <label htmlFor="is_final" className="text-sm font-medium">
                      Produto Final (não é matéria-prima)
                    </label>
                  </div>

                  {/* ativo — true por defeito, hidden */}
                  <input type="hidden" name="ativo" value="true" />


                  <InputField
                    label="Descrição (opcional)"
                    description="Digite uma descrição ou informação adicional"
                    inputProps={{ id: "descricao", name: "descricao", type: "text" }}
                    error={state?.errors?.descricao?.[0]}
                  />

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Imagem (opcional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:cursor-pointer"
                    />
                    {isUploading && (
                      <p className="text-xs text-muted mt-1">A fazer upload...</p>
                    )}
                    {imagePreview && !isUploading && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2 h-24 w-24 rounded-md object-cover border"
                      />
                    )}
                    <input type="hidden" name="img_url" value={imageUrl} />
                  </div>

                  {state?.message && (
                    <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                      {state.message}
                    </div>
                  )}

                  <div className="mt-4 flex gap-2 justify-end">
                    <Button slot="close" variant="secondary" type="button">
                      Cancelar
                    </Button>
                    <Button type="submit" isDisabled={isUploading}>
                      {isUploading ? "A carregar..." : "Criar"}
                    </Button>
                  </div>
                </form>
              </FormSurface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export { CreateProductForm };



