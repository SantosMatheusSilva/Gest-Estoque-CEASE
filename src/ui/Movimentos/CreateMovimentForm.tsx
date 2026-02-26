"use client";

import { Button } from "@/src/ui/Button";
import FormSurface from "@/src/ui/Surface";
import { InputField } from "../InputField";
import { Modal } from "@heroui/react";
import { IconButton } from "@/src/ui/IconButton";
import { Plus } from "@gravity-ui/icons";
import { SelectField } from "../SelectField";
import { SearchProducts } from "../Produtos/SearchProducts";
import { useState } from "react";
import { createMovimentoEstoqueAction } from "@/src/lib/actions";
import { useActionState } from "react";

export default function CreateMovimentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [state, formAction] = useActionState(createMovimentoEstoqueAction, {
    errors: {},
    message: null,
  });
  return (
    <Modal>
      <IconButton startIcon={<Plus />}>Adicionar Produto</IconButton>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Criar Produto</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Preencha o formulário abaixo para criar um novo produto.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <FormSurface variant="default">
                <form action={formAction}>
                  <SearchProducts />

                  <InputField
                    label="quantidade"
                    name="quantidade"
                    type="number"
                  />

                  <SelectField
                    label="tipo"
                    name="tipo"
                    options={[
                      { id: "entrada", label: "entrada" },
                      { id: "saida", label: "saida" },
                      { id: "ajuste", label: "ajuste" },
                    ]}
                  />

                  <SelectField
                    label="motivo"
                    name="motivo"
                    options={[
                      { id: "compra", label: "compra" },
                      { id: "venda", label: "venda" },
                      { id: "perda", label: "perda" },
                      { id: "consumo", label: "consumo" },
                      { id: "correcao", label: "correcao" },
                    ]}
                  />

                  <InputField
                    label="observação"
                    name="observacao"
                    type="text"
                  />

                  <div className="mt-4 flex gap-2 justify-end">
                    <Button slot="close" variant="secondary" type="button">
                      Cancelar
                    </Button>
                    <Button type="submit" isDisabled={isLoading}>
                      {isLoading ? "A carregar..." : "Criar"}
                    </Button>
                  </div>
                </form>
              </FormSurface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
