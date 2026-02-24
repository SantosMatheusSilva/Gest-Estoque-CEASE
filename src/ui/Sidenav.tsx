import Link from "next/link";
import BaseSurface from "./Surface";
import Image from "next/image";
import { House, Box, Copy } from "@gravity-ui/icons";
import { auth } from "@clerk/nextjs/server";
import { NavLink } from "./NavLink";

async function Sidenav() {
  const { orgId } = await auth();

  const links = [
    {
      label: "Home",
      href: `/aplicacao/${orgId}`,
      icon: <House className="w-5 h-5" />,
    },
    {
      label: "Produtos",
      href: `/aplicacao/${orgId}/produtos`,
      icon: <Box className="w-5 h-5" />,
    },
    {
      label: "Categorias",
      href: `/aplicacao/${orgId}/categorias`,
      icon: <Copy className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 ">
      <BaseSurface variant="default" className="rounded-3xl ">
        <div className=" flex flex-row h-16 items-center justify-center rounded-md p-4">
          <div className="w-32 text-white md:w-40">
            <Link href={`/aplicacao/${orgId}`}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={50}
                height={50}
                className="rounded-md"
              />
            </Link>
          </div>
          <div className="text-center text-lg font-semibold md:text-xl">
            StockManager
          </div>
        </div>
      </BaseSurface>
      <BaseSurface
        variant="default"
        className="flex grow mt-4 flex-row justify-between rounded-3xl space-x-2 md:flex-col md:space-x-0 md:space-y-2"
      >
        <div className="flex flex-col gap-3 p-4">
          <BaseSurface
            variant="default"
            className="flex grow mt-4 flex-col rounded-3xl p-4 space-y-2"
          >
            {links.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </BaseSurface>
        </div>
      </BaseSurface>
    </div>
  );
}

export default Sidenav;
