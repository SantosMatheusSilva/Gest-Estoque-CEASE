"use client";

import { Button } from "@/src/ui/Button";
import FormSurface from "@/src/ui/Surface";
import { InputField } from "../InputField";
import { FieldError, Modal, Spinner } from "@heroui/react";
import { IconButton } from "@/src/ui/IconButton";
import { Plus } from "@gravity-ui/icons";
import { SelectField } from "../SelectField";
import { SearchComponent } from "../SearchComponent";
import { useState } from "react";
import { createMovimentoEstoqueAction } from "@/src/lib/actions";
import { searchProduct } from "@/src/db/data";
import { useActionState } from "react";
import { useOrganization } from "@clerk/nextjs";
import { ProdutoType } from "@/src/db/definitions";

export default function CreateMovimentForm() {
  const { organization } = useOrganization();
  const orgId = organization?.id;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [state, formAction] = useActionState(createMovimentoEstoqueAction, {
    errors: {},
    message: null,
  });

  //console.log(state);
  return (
    <Modal>
      <IconButton startIcon={<Plus />}>Adicionar Movimento</IconButton>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Criar Movimento</Modal.Heading>
              <p className="">
                Preencha o formulário para registrar um movimento.
              </p>
            </Modal.Header>
            <Modal.Body className="">
              <FormSurface variant="default">
                <form action={formAction} className="flex flex-col gap-4">
                  <input
                    type="hidden"
                    name="produto_id"
                    value={selectedProductId ?? ""}
                  />
                  <SearchComponent<ProdutoType>
                    label="Produto"
                    placeholder="Digite o nome do produto..."
                    description="Pesquise pelo nome do produto"
                    onSearch={(term) => {
                      return searchProduct(term, orgId as string);
                    }}
                    onSelect={(product) => {
                      setSelectedProductId(product.id);
                    }}
                    getLabel={(product) => product.nome}
                    isInvalid={!!state.errors?.produto_id}
                    error={
                      state.errors?.produto_id && state.errors.produto_id[0]
                    }
                    isRequired
                  />

                  <InputField
                    label="quantidade"
                    name="quantidade"
                    type="number"
                    isInvalid={!!state.errors?.quantidade}
                    error={
                      state.errors?.quantidade && state.errors.quantidade[0]
                    }
                  />

                  <SelectField
                    label="tipo"
                    name="tipo"
                    options={[
                      { id: "entrada", label: "entrada" },
                      { id: "saida", label: "saida" },
                      { id: "ajuste", label: "ajuste" },
                    ]}
                    isInvalid={!!state.errors?.tipo}
                    error={state.errors?.tipo && state.errors.tipo[0]}
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
                    isInvalid={!!state.errors?.motivo}
                    error={state.errors?.motivo && state.errors.motivo[0]}
                  />

                  <InputField
                    label="observação"
                    name="observacao"
                    type="text"
                    isInvalid={!!state.errors?.observacao}
                    error={
                      state.errors?.observacao && state.errors.observacao[0]
                    }
                  />

                  <div className="mt-4 flex gap-2 justify-end">
                    <Button slot="close" variant="secondary" type="button">
                      Cancelar
                    </Button>
                    <Button type="submit" isDisabled={isLoading}>
                      {isLoading ? <Spinner color="accent" /> : "Criar"}
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
