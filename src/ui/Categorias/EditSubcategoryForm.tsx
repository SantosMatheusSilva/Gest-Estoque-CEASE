"use client";

import { useActionState } from "react";
import {
  editSubCategoriaAction,
  ActionState,
} from "@/src/lib/categoriaActions";
import { Button } from "@/src/ui/Button";
import { InputField } from "@/src/ui/InputField";
import Form from "next/form";

type SubCategoriaInfo = {
  id_categoria: string;
  nome: string;
  parent_id: string;
};

export interface EditSubcategoryFormProps {
  subcategory: SubCategoriaInfo;
  orgId: string;
}

export function EditSubcategoryForm({ subcategory }: EditSubcategoryFormProps) {
  const initialState: ActionState = { message: null };
  const [state, formAction] = useActionState(
    editSubCategoriaAction,
    initialState,
  );

  return (
    <Form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
      <input
        type="hidden"
        name="id_categoria"
        value={subcategory.id_categoria}
      />
      <input type="hidden" name="parent_id" value={subcategory.parent_id} />

      <InputField
        label="Nome da Subcategoria"
        inputProps={{
          name: "nome",
          required: true,
          defaultValue: subcategory.nome,
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
