"use client";

import { useActionState } from "react";
import { deleteCategoriaAction } from "@/src/lib/delete-actions";
import { IconButton } from "../IconButton";
import { TrashBin } from "@gravity-ui/icons";

type DeleteCategoriaButtonProps = {
  categoriaId: string;
  orgId: string;
};

export default function DeleteCategoriaButton({
  categoriaId,
  orgId,
}: DeleteCategoriaButtonProps) {
  const action = deleteCategoriaAction.bind(null, categoriaId, orgId);

  const [state, formAction] = useActionState(action, {
    message: "",
  });

  return (
    <form action={formAction}>
      <IconButton type="submit" variant="danger" startIcon={<TrashBin />}>
        Excluir Categoria
      </IconButton>

      {state?.message && <p className="text-red-500">{state.message}</p>}
    </form>
  );
}
