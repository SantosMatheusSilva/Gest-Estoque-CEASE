"use client";
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Produto } from "@/src/db/definitions";
import { ArrowUpRightFromSquare } from "@gravity-ui/icons";
import DeleteProductButton from "@/src/ui//Produtos/DeleteProductButton";
import { useParams } from "next/navigation";
import { Chip } from "@heroui/react";

interface ProductCardProps {
  produto: Produto;
}

export default function ProductCard({ produto }: ProductCardProps) {
  const { orgId } = useParams();

  return (
    <Card className="w-50 gap-2 hover:shadow-lg transition-shadow">
      <div className="relative h-35 w-full shrink-0 overflow-hidden rounded-2xl">
        <Image
          width={100}
          height={100}
          src={produto.img_url || "/placeholder.png"}
          alt={produto.nome}
          className="object-cover w-full h-full"
        />
      </div>

      <Card.Header>
        <Card.Title>{produto.nome} </Card.Title>
        <Card.Description className="flex items-center gap-2 mt-2">
          <p className="text-sm text-muted-foreground">
            {produto.descricao || "Sem descrição"}
          </p>
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <p>
          {produto.quantidade_estoque || 0} {produto.unidade} em estoque
        </p>
        <p>Custo: {produto.preco_custo}</p>
        <p>Venda: {produto.preco_venda}</p>
      </Card.Content>

      <Card.Footer className="flex gap-2 justify-between items-center">
        <Link
          href={`/aplicacao/${orgId}/produtos/${produto.id}/detalhes`}
          className="hover:underline flex items-center gap-1 text-sm"
        >
          <ArrowUpRightFromSquare />
        </Link>
        {produto.ativo ? (
          <Chip variant="primary" color="success">
            Ativo
          </Chip>
        ) : (
          <Chip variant="primary" color="danger">
            Inativo
          </Chip>
        )}
      </Card.Footer>
    </Card>
  );
}
