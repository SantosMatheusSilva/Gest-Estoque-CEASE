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
import { useActionState, useState } from "react"; // Next.js 15+

// Se Next.js 14: import { useFormState } from "react-dom";

interface CreateProductFormProps {
  categorias: CategoriaRaiz[];
  //subcategorias: SubCategoria[];
}

function CreateProductForm({ categorias }: CreateProductFormProps) {
  const [state, formAction] = useActionState(createProdutoAction, {
    errors: {},
    message: null,
  });

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [subcategoriasFiltradas, setSubcategoriasFiltradas] = useState<
    SubCategoria[]
  >([]);
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState("");

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
                <form action={formAction}>
                  <InputField
                    label="Nome"
                    description="Digite o nome do produto"
                    inputProps={{
                      id: "nome",
                      name: "nome",
                      type: "text",
                      required: true,
                    }}
                    error={state?.errors?.nome?.[0]}
                  />

                  <InputField
                    label="Quantidade"
                    description="Digite a quantidade do produto"
                    inputProps={{
                      id: "quantidade",
                      name: "quantidade",
                      type: "number",
                      required: true,
                      min: 0,
                      step: 1,
                    }}
                    error={state?.errors?.quantidade?.[0]}
                  />

                  <InputField
                    label="Preço"
                    description="Digite o preço (de custo) do produto"
                    inputProps={{
                      id: "preco",
                      name: "preco",
                      type: "number",
                      required: true,
                      min: 0,
                      step: 0.01,
                    }}
                    error={state?.errors?.preco?.[0]}
                  />
                  <SelectField
                    label="Categoria"
                    name="id_categoria"
                    options={categorias.map((c) => ({
                      id: c.id_categoria,
                      label: c.nome,
                    }))}
                    value={categoriaSelecionada}
                    required
                    error={state?.errors?.id_categoria?.[0]}
                    onValueChange={(categoriaId) => {
                      console.log("Categoria selecionada:", categoriaId);

                      setCategoriaSelecionada(categoriaId);

                      const subcats =
                        categorias.find((c) => c.id_categoria === categoriaId)
                          ?.subcategorias || [];

                      console.log("Subcategorias encontradas:", subcats);
                      setSubcategoriasFiltradas(subcats);
                      setSubcategoriaSelecionada("");
                    }}
                  />

                  <SelectField
                    label="Subcategoria"
                    name="id_subcategoria"
                    options={subcategoriasFiltradas.map((s) => ({
                      id: s.id_categoria,
                      label: s.nome,
                    }))}
                    value={subcategoriaSelecionada}
                    onValueChange={(subcatId) =>
                      setSubcategoriaSelecionada(subcatId)
                    }
                    required={false}
                  />

                  <InputField
                    label="Descrição (opcional)"
                    description="Digite uma descrição ou informação adicional"
                    inputProps={{
                      id: "descricao",
                      name: "descricao",
                      type: "text",
                    }}
                    error={state?.errors?.descricao?.[0]}
                  />

                  <InputField
                    label="Imagem (opcional)"
                    description="Digite o link da imagem do produto"
                    inputProps={{
                      id: "img_url",
                      name: "img_url",
                      type: "url",
                    }}
                    error={state?.errors?.img_url?.[0]}
                  />

                  {state?.message && (
                    <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                      {state.message}
                    </div>
                  )}

                  <div className="mt-4 flex gap-2 justify-end">
                    <Button slot="close" variant="secondary" type="button">
                      Cancelar
                    </Button>
                    <Button type="submit">Criar</Button>
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
