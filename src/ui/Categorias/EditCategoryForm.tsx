"use client";

import { useActionState } from "react";
import { editCategoriaAction, ActionState } from "@/src/lib/categoriaActions";
import { Button } from "@/src/ui/Button";
import { InputField } from "@/src/ui/InputField";
import Form from "next/form";

type CategoriaInfo = {
  id_categoria: string;
  nome: string;
};

export interface EditCategoryFormProps {
  category: CategoriaInfo;
}

export function EditCategoryForm({ category }: EditCategoryFormProps) {
  const initialState: ActionState = { message: null };
  const [state, formAction] = useActionState(editCategoriaAction, initialState);

  return (
    <Form action={formAction} className="flex flex-col gap-4 w-full max-w-md">
      <input type="hidden" name="id_categoria" value={category.id_categoria} />

      <InputField
        label="Nome da Categoria"
        inputProps={{
          name: "nome",
          required: true,
          defaultValue: category.nome,
          minLength: 3,
          maxLength: 50,
        }}
      />

      {state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      <Button type="submit" variant="primary">
        Guardar Alterações
      </Button>
    </Form>
  );
}
