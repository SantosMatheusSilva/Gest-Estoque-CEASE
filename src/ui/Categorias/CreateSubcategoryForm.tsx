"use client";
import { Button } from "@/src/ui/Button";
import FormSurface from "@/src/ui/Surface";
import Form from "next/form";
import { InputField } from "../InputField";
import { Modal } from "@heroui/react";
import { IconButton } from "@/src/ui/IconButton";
import { Plus } from "@gravity-ui/icons";
import { createSubCategoriaAction, CreateCategoriaState } from "@/src/lib/actions";
import { useActionState } from "react";


export default function CreateSubcategoryForm() {
  const initialState: CreateCategoriaState = { message: null, errors: {} };
    const [State, formAction] = useActionState(
      createSubCategoriaAction,
      initialState,
    )
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
                <Form action={""}>
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
