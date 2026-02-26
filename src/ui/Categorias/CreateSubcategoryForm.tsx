"use client";
import { Button } from "@/src/ui/Button";
import FormSurface from "@/src/ui/Surface";
import Form from "next/form";
import { InputField } from "../InputField";
import { Modal } from "@heroui/react";
import { IconButton } from "@/src/ui/IconButton";
import { Plus } from "@gravity-ui/icons";
// import {
//   createSubCategoriaAction,
//   CreateCategoriaState,
// } from "@/src/lib/categoriaActions";
import { createSubCategoriaAction } from "@/src/lib/categoriaActions";
import type { CreateCategoriaState } from "@/src/lib/definitions";
import { useActionState } from "react";

// passando a props da page.tsx para o forms
type Props = {
  parent_id: string;
};

export default function CreateSubcategoryForm({ parent_id }: Props) {
  const initialState: CreateCategoriaState = { message: null, errors: {} };

  const [state, formAction] = useActionState(
    createSubCategoriaAction,
    initialState,
  );

  return (
    <Modal>
      <IconButton startIcon={<Plus />}>Adicionar Subcategoria</IconButton>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Criar Subcategoria</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Preencha o formulário abaixo para criar uma nova Subcategoria a
                esta categoria.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <FormSurface variant="default">
                <Form action={formAction} id="create-subcategory">
                  {" "}
                  {/* ALTERADO PARA PEGAR O parent_id subcategoria */}
                  {/* CAMPO HIDEN */}
                  <input type="hidden" name="parent_id" value={parent_id} />
                  <InputField
                    label="Nome"
                    description="Digite o nome da subcategoria"
                    inputProps={{
                      id: "nome",
                      name: "nome",
                      type: "text",
                      required: true,
                    }}
                  />
                  <Button slot="close" type="submit" form="create-subcategory">
                    {" "}
                    {/* ANA = ADD form="create-subcategory para botao funcionar fora do modal*/}
                    Criar
                  </Button>
                </Form>
              </FormSurface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
