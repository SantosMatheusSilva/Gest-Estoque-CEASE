import BaseSurface from "../Surface";
import { fetchMovimentosComProduto } from "@/src/db/data";
import { auth } from "@clerk/nextjs/server";
import UserAvatar from "../Usuario/UserAvatar";
import { Plus, Minus } from "@gravity-ui/icons";
import { Chip } from "@heroui/react";

export type MovimentRow = {
  id: string;
  produto: string;
  produto_nome: string;
  produto_unidade: string;
  tipo: "entrada" | "saida" | "ajuste";
  quantidade: number;
  motivo: string;
  autor_clerk_user_id: string;
};

export type MovimentsTableProps = {
  data: MovimentRow[];
};

export default async function MovimentsTable({ data }: MovimentsTableProps) {
  //const { orgId } = await auth();
  //const data = await fetchMovimentosComProduto(orgId as string);

  //console.log(data);
  return (
    <BaseSurface variant="default">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-sm font-semibold">
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Tipo de Movimento</th>
              <th className="px-4 py-3">Quantidade</th>
              <th className="px-4 py-3">Motivo</th>
              <th className="px-4 py-3">Autor</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  Nenhum movimento encontrado.
                </td>
              </tr>
            ) : (
              data.map((movimento) => (
                <tr
                  key={movimento.id}
                  className="border-b text-sm hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{movimento.produto_nome}</td>
                  <td className="px-4 py-3 capitalize">
                    {movimento.tipo === "entrada" ? (
                      <Chip color="accent">
                        <strong>
                          <Plus />
                        </strong>
                        <Chip.Label>{movimento.tipo}</Chip.Label>
                      </Chip>
                    ) : (
                      <Chip color="danger">
                        <strong>
                          <Minus />
                        </strong>
                        <Chip.Label>{movimento.tipo}</Chip.Label>
                      </Chip>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Chip>
                      {`${movimento.quantidade} ${movimento.produto_unidade}`}{" "}
                    </Chip>
                  </td>
                  <td className="px-4 py-3">
                    <Chip size="md">
                      <strong>{movimento.motivo}</strong>
                    </Chip>
                  </td>
                  <td className="px-4 py-3">
                    <UserAvatar clerkUserId={movimento.autor_clerk_user_id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </BaseSurface>
  );
}
