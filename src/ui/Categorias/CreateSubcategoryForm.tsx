"use client";

import { useActionState } from "react";
import { createSubCategoriaAction } from "@/src/lib/categoriaActions";

import { Button } from "@/src/ui/Button";
import FormSurface from "@/src/ui/Surface";
import Form from "next/form";
import { InputField } from "../InputField";
import { Modal } from "@heroui/react";
import { IconButton } from "@/src/ui/IconButton";
import { Plus } from "@gravity-ui/icons";

type Props = {
  parent_id: string;
};

type CreateCategoriaState = {
  message?: string | null;
  errors?: {
    nome?: string[];
    parent_id?: string[];
  };
};

export default function CreateSubcategoryForm({ parent_id }: Props) {
  const initialState: CreateCategoriaState = {
    message: null,
    errors: {},
  };

  const [state, formAction] = useActionState(
    createSubCategoriaAction,
    initialState,
  );

  return (
    <Modal>
      <IconButton startIcon={<Plus />}>Adicionar Subcategoria</IconButton>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Criar Subcategoria</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <FormSurface variant="default">
                <Form action={formAction} id="create-subcategory">
                  <input type="hidden" name="parent_id" value={parent_id} />

                  <InputField
                    label="Nome"
                    description="Nome da subcategoria"
                    inputProps={{
                      name: "nome",
                      required: true,
                    }}
                  />

                  <Button type="submit" form="create-subcategory">
                    Criar
                  </Button>
                </Form>
              </FormSurface>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" slot="close">
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
