import Link from "next/link";
import BaseSurface from "@/src/ui/Surface";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <BaseSurface>
        <h2 className="text-xl font-semibold">404 Not Found</h2>
        <p>Não foi possivel encontrar o produto.</p>
        <Link
          href="/aplicacao/produtos"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        >
          Voltar
        </Link>
      </BaseSurface>
    </main>
  );
}
