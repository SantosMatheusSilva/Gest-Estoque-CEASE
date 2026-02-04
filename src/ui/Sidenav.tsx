import Link from "next/link";
import BaseSurface from "./Surface";
import Image from "next/image";
import { House, Box, Copy } from "@gravity-ui/icons";

function Sidenav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 ">
      <BaseSurface variant="default" className="rounded-3xl ">
        <div className=" flex flex-col h-20 items-center justify-center rounded-md p-4 md:h-50">
          <div className="w-32 text-white md:w-40">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={150}
              className="rounded-md"
            />
          </div>
          <div className="text-center text-lg font-semibold md:text-2xl">
            StockManager
          </div>
        </div>
      </BaseSurface>
      <BaseSurface
        variant="default"
        className="flex grow mt-4 flex-row justify-between rounded-3xl space-x-2 md:flex-col md:space-x-0 md:space-y-2"
      >
        <div className="flex flex-col gap-3 p-4">
          <Link
            href="/aplicacao"
            className="w-full flex justify-center items-center gap-2 px-4 py-2 rounded-4xl border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <House className="w-5 h-5" />
            <span>Home</span>
          </Link>

          <Link
            href="/aplicacao/produtos"
            className="w-full flex justify-center items-center gap-2 px-4 py-2 rounded-4xl border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <Box className="w-5 h-5" />
            <span>Produtos</span>
          </Link>

          <Link
            href="/aplicacao/categorias"
            className="w-full flex justify-center items-center gap-2 px-4 py-2 rounded-4xl border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <Copy className="w-5 h-5" />
            <span>Categorias</span>
          </Link>
        </div>
      </BaseSurface>
    </div>
  );
}

export default Sidenav;
