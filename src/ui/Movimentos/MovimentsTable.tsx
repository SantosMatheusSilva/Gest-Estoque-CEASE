import BaseSurface from "../Surface";
import { fetchMovimentosComProduto } from "@/src/db/data";
import { auth } from "@clerk/nextjs/server";
import UserAvatar from "../Usuario/UserAvatar";
import { Plus, Minus } from "@gravity-ui/icons";

type MovimentRow = {
  id: string;
  produto: string;
  tipo: "entrada" | "saida" | "ajuste";
  quantidade: number;
  motivo: string;
  autor: string;
};

type MovimentsTableProps = {
  data: MovimentRow[];
};

export default async function MovimentsTable() {
  const { orgId } = (await auth()) as { orgId: string };
  const data = await fetchMovimentosComProduto(orgId);

  return (
    <BaseSurface>
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
                  <td className="px-4 py-3">{movimento.produto}</td>
                  <td className="px-4 py-3 capitalize">
                    {movimento.tipo === "entrada" ? (
                      <Plus></Plus>
                    ) : (
                      <Minus></Minus>
                    )}
                  </td>
                  <td className="px-4 py-3">{movimento.quantidade}</td>
                  <td className="px-4 py-3">{movimento.motivo}</td>
                  <td className="px-4 py-3">
                    {UserAvatar({ clerkUserId: movimento.autor })}
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
