import Link from "next/link";
import BaseSurface from "./Surface";
import Image from "next/image";
import { House, Box, Copy } from "@gravity-ui/icons";
import { IconButton } from "./IconButton";

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
        className="flex grow mt-4 flex-row justify-between  rounded-3xl space-x-2 md:flex-col md:space-x-0 md:space-y-2"
      >
        <div className="flex flex-col gap-3 p-4">
          <Link href="/aplicacao">
            <IconButton
              className="w-full"
              variant="outline"
              startIcon={<House />}
            >
              Home
            </IconButton>
          </Link>

          <Link href="/aplicacao/produtos">
            <IconButton
              className="w-full"
              variant="outline"
              startIcon={<Box />}
            >
              Produtos
            </IconButton>
          </Link>

          <Link href="/aplicacao/categorias">
            <IconButton
              className="w-full"
              variant="outline"
              startIcon={<Copy />}
            >
              Categorias
            </IconButton>
          </Link>
        </div>
        {/* <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/auth/login" });
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form> */}
      </BaseSurface>
    </div>
  );
}

export default Sidenav;
