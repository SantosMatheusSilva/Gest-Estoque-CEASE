"use client";

import { Button } from "@/src/ui/Button";
import FormSurface from "@/src/ui/Surface";
import { InputField } from "../InputField";
import { FieldError, Modal } from "@heroui/react";
import { SelectField } from "../SelectField";
import { CategoriaRaiz, SubCategoria, Produto } from "@/src/db/definitions";
import { updateProdutoAction, CreateProdutoState } from "@/src/lib/actions";
import { useActionState, useState } from "react";

interface EditProductFormProps {
  produto: Produto;
  categorias: CategoriaRaiz[];
}

export default function EditProductForm({
  produto,
  categorias,
}: EditProductFormProps) {
  const initialState: CreateProdutoState = {
    message: null,
    errors: {},
  };
  const updateProdutoPorId = updateProdutoAction.bind(null, produto.id);

  const [state, formAction] = useActionState(updateProdutoPorId, initialState);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [subcategoriasFiltradas, setSubcategoriasFiltradas] = useState<
    SubCategoria[]
  >([]);
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState("");

  //debug:
  //console.log("categoriaRaiz[]: ", categorias);
  //console.log("categorias:", categorias);
  //console.log("Array?", Array.isArray(categorias));
  return (
    <Modal>
      <Modal.Trigger>
        <Button variant="secondary">Editar</Button>
      </Modal.Trigger>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Editar Produto</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Atualize as informações do produto.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <FormSurface variant="default">
                <form action={formAction}>
                  {/* Campo hidden com o ID do produto */}
                  <input type="hidden" name="id" value={produto.id} />

                  <InputField
                    label="Nome"
                    description="Digite o nome do produto"
                    defaultValue={produto.nome}
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
                    defaultValue={String(produto.quantidade)}
                    inputProps={{
                      id: "quantidade",
                      name: "quantidade",
                      type: "number",
                      required: true,
                      min: 0,
                      step: 1,
                    }}
                    error={state?.errors?.quantidade_estoque?.[0]}
                  />

                  <InputField
                    label="Preço"
                    description="Digite o preço (de custo) do produto"
                    defaultValue={String(produto.preco)}
                    inputProps={{
                      id: "preco",
                      name: "preco",
                      type: "number",
                      required: true,
                      min: 0,
                      step: 0.01,
                    }}
                    error={state?.errors?.preco_custo?.[0]}
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
                    defaultValue={produto.descricao || ""}
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
                    defaultValue={produto.img_url || ""}
                    inputProps={{
                      id: "img_url",
                      name: "img_url",
                      type: "url",
                    }}
                    error={state?.errors?.img_url?.[0]}
                  />

                  <div className="mt-4 flex gap-2 justify-end">
                    <Button slot="close" variant="secondary" type="button">
                      Cancelar
                    </Button>
                    <Button type="submit">Atualizar</Button>
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
