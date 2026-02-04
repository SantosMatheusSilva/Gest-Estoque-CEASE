"use client";

import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Produto } from "@/src/db/definitions";
import { ArrowUpRightFromSquare } from "@gravity-ui/icons";

interface ProductCardProps {
  produto: Produto;
  onEdit?: (produto: Produto) => void;
}

export default function ProductCard({ 
  produto, 
  onEdit 
}: ProductCardProps) {
  return (
    <Card className="w-[200px] gap-2 hover:shadow-lg transition-shadow">
      <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl">
        <Image
          src="/placeholder.png"  // Sem imgUrl por agora
          alt={produto.nome}
          fill
          className="object-cover"
        />
      </div>
      
      <Card.Header>
        <Card.Title>{produto.nome}</Card.Title>
        <Card.Description>
          {produto.quantidade || 0} un.  {/* Usa quantidade como no teu original */}
        </Card.Description>
      </Card.Header>
      
      <Card.Footer className="flex gap-2 justify-between items-center">
        <Link 
          href={`/aplicacao/produtos/${produto.id}`} 
          className="hover:underline flex items-center gap-1 text-sm"
        >
          Detalhes <ArrowUpRightFromSquare />
        </Link>
        
        {onEdit && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(produto);
            }}
            className="p-1 hover:bg-gray-100 rounded-full -m-1"
            title="Editar produto"
          >
            ✏️  {/* Emoji simples */}
          </button>
        )}
      </Card.Footer>
    </Card>
  );
}



