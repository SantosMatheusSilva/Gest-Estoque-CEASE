import { PageLayout } from "../PageLayout";
import BaseSurface from "../Surface";
import { Produto, CategoriaRaiz } from "@/src/db/definitions";
import { formatDateToLocal } from "@/src/lib/utils";
import { ListBox } from "@heroui/react";
import EditProductForm from "./EditProductForm";
import DeleteProductButton from "./DeleteProductButton"; // ✅ importar o componente certo

type Props = {
  produto: Produto;
  categorias: CategoriaRaiz[];
};

export default function DetailPageLayout({ produto, categorias }: Props) {
  return (
    <PageLayout
      title={`${produto.nome}`}
      description="Detalhes do produto"
      actions={
        <div className="flex gap-2">
          <EditProductForm produto={produto} categorias={categorias} />
          {/* ✅ usar DeleteProductButton em vez do IconButton simples */}
          <DeleteProductButton produto={produto} variant="button" />
        </div>
      }
    >
      <BaseSurface variant="default">
        <div>
          <p>
            <strong>ID:</strong> {produto.id}
          </p>

          <div className="flex flex-row gap-4 mt-2">
            <p>
              <strong>Nome:</strong> {produto.nome}
            </p>
            <p>
              <strong>Descrição:</strong> {produto.descricao}
            </p>
            <p>
              <strong>Criada em:</strong>{" "}
              {formatDateToLocal(produto.created_at)}
            </p>
            <p>
              <strong>Ultima atualização:</strong>{" "}
              {formatDateToLocal(produto.updated_at)}
            </p>
            <p>
              <strong>Adicionado por:</strong> {produto.adicionado_por}
            </p>
            <p>
              <strong>Total de produtos em estoque:</strong>{" "}
              {produto.quantidade_estoque || 0} {/* ✅ nome correto */}
            </p>
          </div>
        </div>
      </BaseSurface>
      <BaseSurface variant="default">
        <div>
          <h2 className="text-lg font-semibold mb-2">Movimentos</h2>
          <ListBox>
            <ListBox.Section>
              <ListBox.Item className="block text-gray-500">
                Nenhuma movimento relacionado ao produto
              </ListBox.Item>
            </ListBox.Section>
          </ListBox>
        </div>
      </BaseSurface>
    </PageLayout>
  );
}

