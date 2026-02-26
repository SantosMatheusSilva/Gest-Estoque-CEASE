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
  const action = deleteSubcategoriaAction.bind(null, subcategoriaId, orgId);

  const [state, formAction] = useActionState(action, {
    message: "",
  });

  return (
    <form action={formAction}>
      <IconButton type="submit" variant="tertiary" startIcon={<TrashBin />} />

      {state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
    </form>
  );
}
