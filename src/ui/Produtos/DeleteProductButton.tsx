"use client";

import { Button } from "@/src/ui/Button";
import { Modal } from "@heroui/react";
import { IconButton } from "@/src/ui/IconButton";
import { TrashBin } from "@gravity-ui/icons";
import { deleteProdutoAction, type DeleteProdutoState } from "@/src/lib/actions";
import { useActionState, useState } from "react";
import { Produto } from "@/src/db/definitions";

interface DeleteProductButtonProps {
  produto: Produto;
  variant?: "button" | "icon";
}

export default function DeleteProductButton({ 
  produto,
  variant = "button" 
}: DeleteProductButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    deleteProdutoAction,
    { success: false, message: null } as DeleteProdutoState
  );

  // Fechar modal se delete foi bem-sucedido
  if (state.success && isOpen) {
    setIsOpen(false);
  }

  return (
    <>
      {/* Botão para abrir modal */}
      {variant === "icon" ? (
        <IconButton
          onClick={() => setIsOpen(true)}
          variant="ghost"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <TrashBin />
        </IconButton>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          variant="danger"
        >
          Eliminar
        </Button>
      )}

      {/* Modal de Confirmação */}
      {isOpen && (
        <Modal>
          <Modal.Backdrop>
            <Modal.Container placement="center">
              <Modal.Dialog className="sm:max-w-md">
                <Modal.CloseTrigger />
                
                <Modal.Header>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <TrashBin className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <Modal.Heading>Eliminar Produto</Modal.Heading>
                      <p className="mt-1 text-sm text-muted">
                        Esta ação não pode ser desfeita
                      </p>
                    </div>
                  </div>
                </Modal.Header>

                <Modal.Body className="p-6">
                  <div className="space-y-4">
                    {/* Informações do produto a ser deletado */}
                    <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {produto.nome}
                      </p>
                      <div className="mt-2 flex gap-4 text-xs text-gray-600">
                        <span>Quantidade: {produto.quantidade}</span>
                        <span>Preço: €{produto.preco}</span>
                      </div>
                    </div>

                    {/* Aviso */}
                    <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                      <p className="text-sm text-red-800">
                        <strong>Atenção:</strong> Tem a certeza que deseja eliminar este produto? 
                        Esta ação é permanente e não pode ser revertida.
                      </p>
                    </div>

                    {/* Mensagem de erro */}
                    {state.error && !state.success && (
                      <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                        {state.message}
                      </div>
                    )}

                    {/* Formulário com action */}
                    <form action={formAction}>
                      <input type="hidden" name="id" value={produto.id} />
                      
                      <div className="flex gap-3 justify-end mt-6">
                        <Button
                          slot="close"
                          type="button"
                          variant="secondary"
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          variant="danger"
                          isDisabled={isPending}
                        >
                          {isPending ? "A eliminar..." : "Sim, eliminar"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}
    </>
  );
}
