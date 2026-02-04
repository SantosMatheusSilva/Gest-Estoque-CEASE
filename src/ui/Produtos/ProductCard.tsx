import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Produto } from "@/src/db/definitions";
//import { fetchAllProdutos } from "@/src/lib/data"; -> fetch feito na pagina.
import { ArrowUpRightFromSquare } from "@gravity-ui/icons";

interface ProductCardProps {
  produto: Produto;
}
async function ProductCard({ produto }: ProductCardProps) {
  /*   if (Listaprodutos.length === 0) {
    return (
      <Card className="w-[200px] gap-2">
        <Card.Header>
          <Card.Title>Nenhum produto disponível</Card.Title>
        </Card.Header>
        <Card.Description className="flex gap-2">
          Comece por adicionar Categorias e Subcategorias e a seguir adicionar
          produtos.
        </Card.Description>
        <Card.Footer className="flex gap-2">
          <Link href="/aplicacao/categorias">
            Navegar para Categorias <ArrowUpRightFromSquare />
          </Link>
        </Card.Footer>
      </Card>
    );
  } */
  return (
    <Card className="w-[200px] gap-2">
      <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[120px] sm:w-[120px]">
        <Image
          src={"/placeholder.png"}
          alt={""}
          width={200}
          height={200}
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
        />
      </div>
      <Card.Header>
        <Card.Title>{produto.nome}</Card.Title>
        <Card.Description className="flex gap-2">
          {produto.quantidade} em estoque
        </Card.Description>
      </Card.Header>
      <Card.Footer className="flex gap-2">
        <Link
          className="hover:underline flex items-center gap-1"
          href={`/aplicacao/produtos/${produto.id}/detalhes`}
        >
          Detalhes <ArrowUpRightFromSquare />
        </Link>
        {/* <span className="text-xs"></span> */}
      </Card.Footer>
    </Card>
  );
}

export default ProductCard;
