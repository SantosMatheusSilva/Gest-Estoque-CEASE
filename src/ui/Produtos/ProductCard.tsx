import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Produto } from "@/src/db/definitions";
import { fetchAllProdutos } from "@/src/lib/data";
import { ArrowUpRightFromSquare } from "@gravity-ui/icons";

async function ProductCard() {
  const Listaprodutos: Produto[] = await fetchAllProdutos();
  console.log(Listaprodutos);
  if (Listaprodutos.length === 0) {
    return (
      <Card className="w-[200px] gap-2">
        <Card.Header>
          <Card.Title>Nenhum produto disponível</Card.Title>
        </Card.Header>
      </Card>
    );
  }
  return (
    <div className="flex flex-wrap gap-4">
      {Listaprodutos.map((produto) => (
        <Card key={produto.id} className="w-[200px] gap-2">
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
            <Link href={"apl"}>
              <ArrowUpRightFromSquare />
            </Link>
            {/* <span className="text-xs"></span> */}
          </Card.Footer>
        </Card>
      ))}
      {/*  <Card className="w-[200px] gap-2">
        <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[120px] sm:w-[120px]">
          <Image
            src={""}
            alt={""}
            width={200}
            height={200}
            className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
          />
        </div>
        <Card.Header>
          <Card.Title>Nome do produto</Card.Title>
          <Card.Description>Quantidade em stock</Card.Description>
        </Card.Header>
        <Card.Footer className="flex gap-2">
          <Link href={"apl"}>Detalhes</Link>
          <span className="text-xs"></span> 
        </Card.Footer>
      </Card> */}
    </div>
  );
}

export default ProductCard;
