"use client";
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Produto } from "@/src/db/definitions";
import { ArrowUpRightFromSquare } from "@gravity-ui/icons";
import DeleteProductButton from "@/src/ui//Produtos/DeleteProductButton";
import { useParams } from "next/navigation";

interface ProductCardProps {
  produto: Produto;
}

export default function ProductCard({ produto }: ProductCardProps) {
  const { orgId } = useParams();

  return (
    <Card className="w-[200px] gap-2 hover:shadow-lg transition-shadow">
      <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl">
        <img
          src={produto.img_url || "/placeholder.png"}
          alt={produto.nome}
          className="object-cover w-full h-full"
        />
      </div>

      <Card.Header>
        <Card.Title>{produto.nome}</Card.Title>
        <Card.Description>
          {produto.quantidade_estoque || 0} un.
        </Card.Description>
      </Card.Header>

      <Card.Footer className="flex gap-2 justify-between items-center">
        <Link
          href={`/aplicacao/${orgId}/produtos/${produto.id}/detalhes`} // ✅ com orgId
          className="hover:underline flex items-center gap-1 text-sm"
        >
          Detalhes <ArrowUpRightFromSquare />
        </Link>
      </Card.Footer>
    </Card>
  );
}
