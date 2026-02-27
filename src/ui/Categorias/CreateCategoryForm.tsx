"use client";
import { useActionState } from "react";
import { createCategoriaAction } from "@/src/lib/categoriaActions";
import { Button } from "@/src/ui/Button";
import FormSurface from "@/src/ui/Surface";
import Form from "next/form";
import { InputField } from "../InputField";

type CreateCategoriaState = {
  message?: string | null;
  errors?: { nome?: string[] };
};

type Props = { orgId: string };

export function CreateCategoryForm({ orgId }: Props) {
  const initialState: CreateCategoriaState = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    createCategoriaAction,
    initialState,
  );

  return (
    <FormSurface variant="default">
      <Form action={formAction} id="create-category">
        <InputField
          label="Nome da Categoria"
          inputProps={{ name: "nome", required: true }}
        />
        <Button type="submit" form="create-category">
          Criar Categoria
        </Button>
        {state.message && <p className="text-sm mt-2">{state.message}</p>}
      </Form>
    </FormSurface>
  );
}
