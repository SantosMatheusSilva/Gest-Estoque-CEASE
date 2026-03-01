import { PageLayout } from "../PageLayout";
import BaseSurface from "../Surface";
import { ProdutoType, CategoriaRaiz } from "@/src/db/definitions";
import { formatDateToLocal } from "@/src/lib/utils";
import { Chip, ListBox } from "@heroui/react";
import EditProductForm from "./EditProductForm";
import DeleteProductButton from "./DeleteProductButton"; // ✅ importar o componente certo
import MovimentsTable from "../Movimentos/MovimentsTable";
import { MovimentRow } from "../Movimentos/MovimentsTable";
import { fetchUsuarioDB } from "@/src/db/data";
import UserAvatar from "../Usuario/UserAvatar";
import Image from "next/image";
type Props = {
  produto: ProdutoType;
  categorias: CategoriaRaiz[];
  data: MovimentRow[];
  clerk_user_id: string;
};
export default async function DetailPageLayout({
  produto,
  categorias,
  data,
  clerk_user_id,
}: Props) {
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
        <div className="flex flex-row">
          <div>
            <Image
              width={200}
              height={100}
              src={produto.img_url || "/placeholder.png"}
              alt={produto.nome}
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex flex-row gap-2">
              <p>
                <strong>SKU: </strong>
                {produto.sku || "Sem SKU"}
              </p>
              <p>
                <strong>Nome: </strong>
                {produto.nome}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p>
                <strong>Preço de Custo: </strong>
                {produto.preco_custo}
              </p>
              <p>
                <strong>Preço de Venda: </strong>
                {produto.preco_venda}
              </p>
            </div>
            <div>
              <p>
                <strong>Descrição: </strong> {produto.descricao}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p>
                <strong>Criada em:</strong>{" "}
                {formatDateToLocal(produto.created_at)}
              </p>
              <p>
                <strong>Ultima atualização:</strong>{" "}
                {formatDateToLocal(produto.updated_at)}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p>
                <strong>Total em estoque:</strong>{" "}
                {produto.quantidade_estoque || 0} {produto.unidade}
              </p>
              <p>
                <strong>Status: </strong>
                {produto.ativo ? (
                  <Chip size="md" color="success" variant="primary">
                    Ativo
                  </Chip>
                ) : (
                  <Chip color="warning">Desativado</Chip>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <strong>Autor:</strong> <UserAvatar clerkUserId={clerk_user_id} />
            </div>
            <p>
              <strong>Total de produtos em estoque:</strong>{" "}
              {produto.quantidade_estoque || 0}
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
