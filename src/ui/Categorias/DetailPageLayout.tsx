import { PageLayout } from "../PageLayout";
import BaseSurface from "../Surface";
import { CategoriaRaiz } from "@/src/db/definitions";
import { formatDateToLocal } from "@/src/lib/utils";
import { ListBox, Label, Description } from "@heroui/react";
import { IconButton } from "../IconButton";
import { TrashBin } from "@gravity-ui/icons";

import CreateSubcategoryForm from "./CreateSubcategoryForm";
import DeleteCategoriaButton from "@/src/ui/Categorias/DeleteCategoriaButton";
import DeleteSubcategoriaButton from "./DeleteSubcategoriaButton";

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
          <CreateSubcategoryForm parent_id={categoriaInfo.id_categoria} />

          <DeleteCategoriaButton
            categoriaId={categoriaInfo.id_categoria}
            orgId={orgId}
          />
        </div>
      }
    >
      {/* ============================= */}
      {/* INFORMAÇÕES DA CATEGORIA */}
      {/* ============================= */}
      <BaseSurface variant="default">
        <div>
          <p>
            <strong>ID:</strong> {categoriaInfo.id_categoria}
          </p>

          <div className="flex flex-row flex-wrap gap-4 mt-2">
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

      {/* ============================= */}
      {/* SUBCATEGORIAS */}
      {/* ============================= */}
      <BaseSurface variant="default" className="mt-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Subcategorias</h2>

          <ListBox>
            <ListBox.Section>
              {categoriaInfo.subcategorias &&
              categoriaInfo.subcategorias.length > 0 ? (
                categoriaInfo.subcategorias.map((subcategoria) => (
                  <ListBox.Item
                    key={subcategoria.id_categoria}
                    className="flex justify-between items-center"
                  >
                    <div className="flex flex-col">
                      <Label>{subcategoria.nome}</Label>

                      <Description>
                        <div>
                          {`Produtos relacionados: ${
                            subcategoria.total_produtos || 0
                          }`}
                          {` | Criada em: ${formatDateToLocal(
                            subcategoria.created_at,
                          )}`}
                        </div>
                      </Description>
                    </div>

                    <DeleteSubcategoriaButton
                      subcategoriaId={subcategoria.id_categoria}
                      orgId={orgId}
                    />
                  </ListBox.Item>
                ))
              ) : (
                <ListBox.Item className="block text-gray-500">
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
