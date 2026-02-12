import Link from "next/link";
import BaseSurface from "@/src/ui/Surface";
import { ArrowLeft } from "@gravity-ui/icons";

export default function ProdutosNotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <BaseSurface>
        <h2 className="text-xl font-semibold">Nenhum Produto encontrado</h2>
        <p>Os recursos solicitados não existem.</p>
        <Link
          href="/aplicacao"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        >
          <ArrowLeft></ArrowLeft> Voltar
        </Link>
      </BaseSurface>
    </main>
  );
}
