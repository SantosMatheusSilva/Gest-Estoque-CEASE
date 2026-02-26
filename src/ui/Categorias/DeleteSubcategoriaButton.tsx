"use client";

import { useActionState } from "react";
import { deleteSubcategoriaAction } from "@/src/lib/categoriaActions";
import { IconButton } from "../IconButton";
import { TrashBin } from "@gravity-ui/icons";

type Props = {
  subcategoriaId: string;
  orgId: string;
};

export default function DeleteSubcategoriaButton({
  subcategoriaId,
  orgId,
}: Props) {
  // Prepara a action com os argumentos necessários
  const deleteActionWithArgs = async () => {
    return await deleteSubcategoriaAction(subcategoriaId, orgId);
  };

  const [state, formAction] = useActionState(deleteActionWithArgs, {
    message: "",
  });

  return (
    <form action={formAction}>
      <IconButton type="submit" variant="tertiary" startIcon={<TrashBin />} />

      {state?.message && (
        <p className="text-red-500 text-sm mt-1">{state.message}</p>
      )}
    </form>
  );
}
