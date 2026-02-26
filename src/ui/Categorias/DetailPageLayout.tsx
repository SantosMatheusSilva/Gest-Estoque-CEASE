"use client";

import { PageLayout } from "../PageLayout";
import BaseSurface from "../Surface";
import { CategoriaRaiz, SubCategoria } from "@/src/db/definitions";
import { formatDateToLocal } from "@/src/lib/utils";
import { ListBox, Label, Description } from "@heroui/react";

import CreateSubcategoryForm from "./CreateSubcategoryForm";
import DeleteCategoriaButton from "./DeleteCategoriaButton";
import DeleteSubcategoriaButton from "./DeleteSubcategoriaButton";
import { EditCategoryForm } from "./EditCategoryForm";
import { EditSubcategoryForm } from "./EditSubcategoryForm";

type Props = {
  categoriaInfo: CategoriaRaiz;
  parent_id: string;
  orgId: string;
  userId: string | null;
};

export default function DetailPageLayout({
  categoriaInfo,
  parent_id,
  orgId,
  userId,
}: Props) {
  return (
    <PageLayout
      title={categoriaInfo.nome}
      description="Detalhes da categoria"
      actions={
        <div className="flex gap-2">
          {/* EDITAR CATEGORIA */}
          <EditCategoryForm
            category={categoriaInfo}
            onSubmit={async (data) => {
              console.log("Salvar categoria:", data);
              // aqui você chama sua API ou mutate do TRPC
            }}
          />

          {/* CRIAR SUBCATEGORIA */}
          <CreateSubcategoryForm parent_id={categoriaInfo.id_categoria} />

          {/* EXCLUIR CATEGORIA */}
          <DeleteCategoriaButton
            categoriaId={categoriaInfo.id_categoria}
            orgId={orgId}
          />
        </div>
      }
    >
      {/* ================= INFO CATEGORIA ================= */}
      <BaseSurface variant="default">
        <div>
          <p>
            <strong>ID:</strong> {categoriaInfo.id_categoria}
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <p>
              <strong>Nome:</strong> {categoriaInfo.nome}
            </p>

            <p>
              <strong>Criada em:</strong>{" "}
              {formatDateToLocal(categoriaInfo.created_at)}
            </p>

            <p>
              <strong>Última atualização:</strong>{" "}
              {formatDateToLocal(categoriaInfo.updated_at)}
            </p>

            <p>
              <strong>Adicionado por:</strong> {categoriaInfo.adicionado_por}
            </p>

            <p>
              <strong>Total de produtos:</strong>{" "}
              {categoriaInfo.total_produtos || 0}
            </p>
          </div>
        </div>
      </BaseSurface>

      {/* ================= SUBCATEGORIAS ================= */}
      <BaseSurface variant="default" className="mt-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Subcategorias</h2>

          <ListBox>
            <ListBox.Section>
              {categoriaInfo.subcategorias &&
              categoriaInfo.subcategorias.length > 0 ? (
                categoriaInfo.subcategorias.map((sub: SubCategoria) => (
                  <ListBox.Item
                    key={sub.id_categoria}
                    className="flex justify-between items-center"
                  >
                    <div className="flex flex-col">
                      <Label>{sub.nome}</Label>
                      <Description>
                        <div>
                          {`Produtos relacionados: ${sub.total_produtos || 0}`}
                          {` | Criada em: ${formatDateToLocal(sub.created_at)}`}
                        </div>
                      </Description>
                    </div>

                    {/* AÇÕES DA SUBCATEGORIA */}
                    <div className="flex gap-2">
                      <EditSubcategoryForm
                        subcategory={sub}
                        orgId={orgId}
                        onSubmit={async (data) => {
                          console.log("Salvar subcategoria:", data);
                          // ex: await api.updateSubcategoria(data)
                        }}
                      />

                      <DeleteSubcategoriaButton
                        subcategoriaId={sub.id_categoria}
                        orgId={orgId}
                      />
                    </div>
                  </ListBox.Item>
                ))
              ) : (
                <ListBox.Item className="text-gray-500">
                  Nenhuma subcategoria associada.
                </ListBox.Item>
              )}
            </ListBox.Section>
          </ListBox>
        </div>
      </BaseSurface>
    </PageLayout>
  );
}
