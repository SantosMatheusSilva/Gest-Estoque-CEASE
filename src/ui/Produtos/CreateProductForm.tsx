import { Button } from "@/src/ui/Button";
import FormSurface from "@/src/ui/Surface";
import Form from "next/form";
import { InputField } from "../InputField";
import { Modal } from "@heroui/react";
import { IconButton } from "@/src/ui/IconButton";
import { Plus } from "@gravity-ui/icons";
import { SelectField } from "../SelectField";
import { CategoriaRaiz, SubCategoria } from "@/src/db/definitions";

/* interface Subcategoria {
  id: string;
  nome: string;
}

interface Categoria {
  id: string;
  nome: string;
  subcategorias: Subcategoria[];
} */

interface CreateProductFormProps {
  categorias: CategoriaRaiz[];
}

function CreateProductForm({ categorias }: CreateProductFormProps) {
  return (
    <Modal>
      <IconButton startIcon={<Plus />}>Adicionar Produto</IconButton>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Criar Categoria</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Preencha o formulário abaixo para criar uma nova categoria.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <FormSurface variant="default">
                <Form action={""}>
                  <InputField
                    label="Nome"
                    description="Digite o nome do produto"
                    inputProps={{
                      id: "nome",
                      name: "nome",
                      type: "text",
                      required: true,
                    }}
                  />
                  <InputField
                    label="quantidade"
                    description="Digite a quantidade do produto"
                    inputProps={{
                      id: "quantidade",
                      name: "quantidade",
                      type: "number",
                      required: true,
                    }}
                  />

                  <SelectField
                    label="Categoria"
                    name="categoria"
                    required
                    options={categorias.map((c) => ({
                      id: c.id_categoria,
                      label: c.nome,
                    }))}
                  />

                  <SelectField
                    label="Subcategoria (opcional)"
                    name="subcategoria_id"
                    options={categorias.flatMap((c: CategoriaRaiz) =>
                      (c.subcategorias ?? []).map((s: SubCategoria) => ({
                        id: s.id_categoria, // usar id_categoria da subcategoria
                        label: `${c.nome} → ${s.nome}`, // opcional, ajuda no display
                      })),
                    )}
                  />

                  <InputField
                    label="Preço"
                    description="Digite o preço (de custo) do produto"
                    inputProps={{
                      id: "preco",
                      name: "preco",
                      type: "number",
                      required: true,
                    }}
                  />
                  <InputField
                    label="descrição"
                    description="Digite uma descrição ou informação adicional"
                    inputProps={{
                      id: "descricao",
                      name: "descricao",
                      type: "text",
                      required: true,
                    }}
                  />
                  <InputField
                    label="Imagem"
                    description="Digite o link da imagem do produto"
                    inputProps={{
                      id: "img_url",
                      name: "img_url",
                      type: "url",
                      required: true,
                    }}
                  />
                </Form>
              </FormSurface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancelar
              </Button>
              <Button slot="close" type="submit">
                Criar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
export { CreateProductForm };
