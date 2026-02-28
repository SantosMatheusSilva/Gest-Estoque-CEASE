import { PageLayout } from "../PageLayout";
import BaseSurface from "../Surface";
import { ProdutoType, CategoriaRaiz } from "@/src/db/definitions";
import { formatDateToLocal } from "@/src/lib/utils";
import { ListBox } from "@heroui/react";
import EditProductForm from "./EditProductForm";
<<<<<<< Updated upstream
import DeleteProductButton from "./DeleteProductButton"; // ✅ importar o componente certo

=======
import MovimentsTable from "../Movimentos/MovimentsTable";
import { MovimentRow } from "../Movimentos/MovimentsTable";
import { fetchUsuarioDB } from "@/src/db/data";
import UserAvatar from "../Usuario/UserAvatar";
>>>>>>> Stashed changes
type Props = {
  produto: ProdutoType;
  categorias: CategoriaRaiz[];
  data: MovimentRow[];
  clerk_user_id: string;
};
<<<<<<< Updated upstream

export default function DetailPageLayout({ produto, categorias }: Props) {
=======
export default async function DetailPageLayout({
  produto,
  categorias,
  data,
  clerk_user_id,
}: Props) {
>>>>>>> Stashed changes
  return (
    <PageLayout
      title={`${produto.nome}`}
      description="Detalhes do produto"
      actions={
        <div className="flex gap-2">
<<<<<<< Updated upstream
          <EditProductForm produto={produto} categorias={categorias} />
          {/* ✅ usar DeleteProductButton em vez do IconButton simples */}
          <DeleteProductButton produto={produto} variant="button" />
=======
          {/* <EditProductForm produto={produto} categorias={categorias} /> */}
          <IconButton variant="danger" startIcon={<TrashBin />}>
            Excluir Produto
          </IconButton>
>>>>>>> Stashed changes
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
            <div>
              <strong>Adicionado por:</strong>{" "}
              <UserAvatar clerkUserId={clerk_user_id} />
            </div>
            <p>
              <strong>Total de produtos em estoque:</strong>{" "}
<<<<<<< Updated upstream
              {produto.quantidade_estoque || 0} {/* ✅ nome correto */}
=======
              {produto.quantidade_estoque || 0}
>>>>>>> Stashed changes
            </p>
          </div>
        </div>
      </BaseSurface>
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Historico de movimentos</h3>
        <p>Movimentos relacionados ao produto</p>
      </div>
      {/*  <BaseSurface variant="default"> */}
      <MovimentsTable data={data}></MovimentsTable>
      {/* </BaseSurface> */}
    </PageLayout>
  );
}

