"use client";

import { Button } from "@/src/ui/Button";
import FormSurface from "@/src/ui/Surface";
import { InputField } from "../InputField";
import { Modal } from "@heroui/react";
import { SelectField } from "../SelectField";
import { CategoriaRaiz, SubCategoria, Produto } from "@/src/db/definitions";
import { updateProdutoAction } from "@/src/lib/actions";
import { useActionState } from "react";

interface EditProductFormProps {
  produto: Produto;
  categorias: CategoriaRaiz[];
}

export default function EditProductForm({
  produto,
  categorias,
}: EditProductFormProps) {
  const [state, formAction] = useActionState(
    updateProdutoAction,
    { errors: {}, message: null }
  );

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
                    inputProps={{
                      id: "nome",
                      name: "nome",
                      type: "text",
                      defaultValue: produto.nome,
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
                      defaultValue: produto.quantidade,
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
                      defaultValue: produto.preco,
                      required: true,
                      min: 0,
                      step: 0.01,
                    }}
                    error={state?.errors?.preco?.[0]}
                  />

                  <SelectField
                    label="Categoria"
                    name="id_categoria"
                    required
                    options={categorias.flatMap((c: CategoriaRaiz) => [
                      {
                        id: c.id_categoria,
                        label: c.nome,
                        selected: c.id_categoria === produto.id_categoria,
                      },
                      ...(c.subcategorias ?? []).map((s: SubCategoria) => ({
                        id: s.id_categoria,
                        label: `${c.nome} → ${s.nome}`,
                        selected: s.id_categoria === produto.id_categoria,
                      })),
                    ])}
                    error={state?.errors?.id_categoria?.[0]}
                  />

                  <InputField
                    label="Descrição (opcional)"
                    description="Digite uma descrição ou informação adicional"
                    inputProps={{
                      id: "descricao",
                      name: "descricao",
                      type: "text",
                      defaultValue: produto.descricao || "",
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
                      defaultValue: produto.img_url || "",
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
                    <Button type="submit">
                      Atualizar
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
