import { PageLayout } from "../PageLayout";
import BaseSurface from "../Surface";
import { formatDateToLocal } from "@/src/lib/utils";

import CreateSubcategoryForm from "./CreateSubcategoryForm";
import DeleteCategoriaButton from "./DeleteCategoriaButton";
import DeleteSubcategoriaButton from "./DeleteSubcategoriaButton";
import { EditCategoryForm } from "./EditCategoryForm";
import { EditSubcategoryForm } from "./EditSubcategoryForm";

type SubCategoria = {
  id_categoria: string;
  nome: string;
  parent_id: string;
  total_produtos?: number;
  created_at: string;
};

type CategoriaRaiz = {
  id_categoria: string;
  nome: string;
  created_at: string;
  updated_at: string;
  adicionado_por: string;
  total_produtos?: number;
  subcategorias?: SubCategoria[];
};

type Props = {
  categoriaInfo: CategoriaRaiz;
  parent_id: string;
  orgId: string;
  userId: string;
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
        <div className="flex gap-2 flex-wrap">
          <CreateSubcategoryForm parent_id={categoriaInfo.id_categoria} />
          <DeleteCategoriaButton
            categoriaId={categoriaInfo.id_categoria}
            orgId={orgId}
          />
        </div>
      }
    >
      {/* Informações da Categoria */}
      <BaseSurface variant="default" className="space-y-4">
        <h2 className="text-lg font-semibold">Informações</h2>
        <div className="space-y-2">
          <p>
            <strong>ID:</strong> {categoriaInfo.id_categoria}
          </p>
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
            {categoriaInfo.total_produtos ?? 0}
          </p>
        </div>

        {/* Formulário de edição inline */}
        <div className="pt-4 border-t">
          <h3 className="text-sm font-semibold mb-3">Editar Categoria</h3>
          <EditCategoryForm category={categoriaInfo} />
        </div>
      </BaseSurface>

      {/* Subcategorias */}
      <BaseSurface variant="default" className="mt-4 space-y-3">
        <h2 className="text-lg font-semibold">Subcategorias</h2>

        {categoriaInfo.subcategorias &&
        categoriaInfo.subcategorias.length > 0 ? (
          <ul className="divide-y">
            {categoriaInfo.subcategorias.map((sub) => (
              <li key={sub.id_categoria} className="py-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{sub.nome}</p>
                    <p className="text-sm text-gray-500">
                      Produtos: {sub.total_produtos ?? 0} | Criada em:{" "}
                      {formatDateToLocal(sub.created_at)}
                    </p>
                  </div>
                  <DeleteSubcategoriaButton
                    subcategoriaId={sub.id_categoria}
                    orgId={orgId}
                  />
                </div>
                {/* Edição inline da subcategoria */}
                <EditSubcategoryForm subcategory={sub} orgId={orgId} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">
            Nenhuma subcategoria associada.
          </p>
        )}
      </BaseSurface>
    </PageLayout>
  );
}
