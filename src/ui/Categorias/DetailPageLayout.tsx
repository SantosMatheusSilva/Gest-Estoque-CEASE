import { PageLayout } from "../PageLayout";
import { IconButton } from "../IconButton";
import { TrashBin } from "@gravity-ui/icons";
import BaseSurface from "../Surface";
import { CategoriaRaiz } from "@/src/db/definitions";
import { formatDateToLocal } from "@/src/lib/utils";
import { ListBox, Label, Description } from "@heroui/react";
import CreateSubcategoryForm from "./CreateSubcategoryForm";

type Props = {
  categoriaInfo: CategoriaRaiz;
};
export default function DetailPageLayout({ categoriaInfo }: Props) {
  console.log(categoriaInfo.created_at);
  return (
    <PageLayout
      title={`${categoriaInfo.nome}`}
      description="Detalhes da categoria"
      actions={
        <div className="flex gap-2">
          <CreateSubcategoryForm />
          <IconButton variant="danger" startIcon={<TrashBin />}>
            Excluir Categoria
          </IconButton>
        </div>
      }
    >
      <BaseSurface variant="default">
        <div>
          <p>
            <strong>ID:</strong> {categoriaInfo.id_categoria}
          </p>

          <div className="flex flex-row gap-4 mt-2">
            <p>
              <strong>Nome:</strong> {categoriaInfo.nome}
            </p>
            <p>
              <strong>Criada em:</strong>{" "}
              {formatDateToLocal(categoriaInfo.created_at)}
            </p>
            <p>
              <strong>Ultima atualização:</strong>{" "}
              {formatDateToLocal(categoriaInfo.updated_at)}
            </p>
            <p>
              <strong>Adicionado por:</strong> {categoriaInfo.adicionado_por}
            </p>
            <p>
              <strong>Total de produtos relacionados:</strong>{" "}
              {categoriaInfo.total_produtos || 0}
            </p>
          </div>
        </div>
      </BaseSurface>
      <BaseSurface variant="default">
        <div>
          <h2 className="text-lg font-semibold mb-2">Subcategorias</h2>
          <ListBox>
            <ListBox.Section>
              {categoriaInfo.subcategorias &&
              categoriaInfo.subcategorias.length > 0 ? (
                categoriaInfo.subcategorias.map((subcategoria) => (
                  <ListBox.Item
                    key={subcategoria.id_categoria}
                    className="flex justify-between"
                  >
                    <div className="flex flex-col">
                      <Label>{subcategoria.nome}</Label>
                      <Description>
                        <div>
                          {`Produtos relacionados: ${subcategoria.total_produtos || 0}`}
                          {` | Criada em: ${formatDateToLocal(subcategoria.created_at)}`}
                        </div>
                      </Description>
                    </div>
                    <IconButton variant="tertiary" startIcon={<TrashBin />} />
                  </ListBox.Item>
                ))
              ) : (
                <ListBox.Item className="block text-gray-500">
                  Nenhuma subcategoria associada.
                </ListBox.Item>
              )}
            </ListBox.Section>
          </ListBox>
          {/*           {categoriaInfo.subcategorias &&
          categoriaInfo.subcategorias.length > 0 ? (
            <ul className="list-disc list-inside">
              {categoriaInfo.subcategorias.map((subcategoria) => (
                <li key={subcategoria.id_categoria}>
                  {subcategoria.nome}
                  <p>{subcategoria.total_produtos}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhuma subcategoria associada.</p>
          )} */}
        </div>
      </BaseSurface>
    </PageLayout>
  );
}
