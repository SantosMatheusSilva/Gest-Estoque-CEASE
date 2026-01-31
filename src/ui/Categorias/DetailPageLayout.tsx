import { PageLayout } from "../PageLayout";
import { IconButton } from "../IconButton";
import { TrashBin, Plus } from "@gravity-ui/icons";
import BaseSurface from "../Surface";
import { CategoriaRaiz } from "@/src/db/definitions";

type Props = {
  categoriaInfo: CategoriaRaiz;
};
export default function DetailPageLayout({ categoriaInfo }: Props) {
  return (
    <PageLayout
      title={`${categoriaInfo.nome}`}
      description="Detalhes da categoria"
      actions={
        <div className="flex gap-2">
          <IconButton startIcon={<Plus />}>Adicionar Subcategoria</IconButton>
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
              {new Date(categoriaInfo.created_at).toLocaleDateString()}
            </p>
            <p>
              <strong>Atualizada em:</strong>{" "}
              {new Date(categoriaInfo.updated_at).toLocaleDateString()}
            </p>
            <p>
              <strong>Adicionado por:</strong> {categoriaInfo.adicionado_por}
            </p>
          </div>
        </div>
      </BaseSurface>
      <BaseSurface variant="default">
        <div>
          <h2 className="text-lg font-semibold mb-2">Subcategorias</h2>
          {categoriaInfo.subcategorias &&
          categoriaInfo.subcategorias.length > 0 ? (
            <ul className="list-disc list-inside">
              {categoriaInfo.subcategorias.map((subcategoria) => (
                <li key={subcategoria.id_categoria}>{subcategoria.nome}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhuma subcategoria associada.</p>
          )}
        </div>
      </BaseSurface>
    </PageLayout>
  );
}
