// src/ui/Admin/AdminPageLayout.tsx
"use client";

import { PageLayout } from "../PageLayout";
import { ProdutoType } from "@/src/db/definitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// ── Tipos ──────────────────────────────────────────────────────────────────

type KPIs = {
  totalStock: number;
  lowStockCount: number;
  todayMovements: { entradas: number; saidas: number; ajustes: number };
  inventoryValue: number;
};

type Movimento = {
  id: string;
  produto_nome: string;
  tipo: string;
  quantidade: number;
  created_at: string | Date;
};

type Props = {
  data: {
    kpis: KPIs;
    produtos: ProdutoType[];
    movimentos: Movimento[];
  };
};

// ── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function calcMovimentosMensais(movimentos: Movimento[]) {
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const agora = new Date();

  const ultimos6 = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(agora.getFullYear(), agora.getMonth() - 5 + i, 1);
    return {
      mes: meses[d.getMonth()],
      _ano: d.getFullYear(),
      _mes: d.getMonth(),
      entradas: 0,
      saidas: 0,
    };
  });

  movimentos.forEach((m) => {
    const d = new Date(m.created_at);
    const bucket = ultimos6.find(
      (b) => b._ano === d.getFullYear() && b._mes === d.getMonth(),
    );
    if (!bucket) return;
    if (m.tipo === "entrada") bucket.entradas += m.quantidade ?? 0;
    if (m.tipo === "saida") bucket.saidas += m.quantidade ?? 0;
  });

  return ultimos6.map(({ mes, entradas, saidas }) => ({
    mes,
    entradas,
    saidas,
  }));
}

// ── Chart configs ──────────────────────────────────────────────────────────

const areaConfig = {
  entradas: { label: "Entradas", color: "hsl(221 83% 53%)" },
  saidas: { label: "Saídas", color: "hsl(0 84% 60%)" },
} satisfies ChartConfig;

const barConfig = {
  quantidade_estoque: { label: "Stock Actual", color: "hsl(221 83% 53%)" },
  estoque_minimo: { label: "Mínimo", color: "hsl(215 20% 85%)" },
} satisfies ChartConfig;

// ── Badge estado ───────────────────────────────────────────────────────────

function EstadoBadge({ produto }: { produto: ProdutoType }) {
  const atual = produto.quantidade_estoque ?? 0;
  const minimo = produto.estoque_minimo ?? 0;
  const critico = atual < minimo;
  const ok = atual >= minimo * 1.5;

  if (critico)
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
        Crítico
      </Badge>
    );
  if (ok)
    return (
      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
        OK
      </Badge>
    );
  return (
    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
      Baixo
    </Badge>
  );
}

// ── Componente principal ───────────────────────────────────────────────────

export default function AdminPageLayout({ data }: Props) {
  const { kpis, produtos, movimentos } = data;
  const movimentosMensais = calcMovimentosMensais(movimentos);

  const barData = produtos.slice(0, 8).map((p) => ({
    nome: p.nome.length > 12 ? p.nome.slice(0, 12) + "…" : p.nome,
    quantidade_estoque: p.quantidade_estoque ?? 0,
    estoque_minimo: p.estoque_minimo ?? 0,
  }));

  const kpiCards = [
    {
      title: "Valor do Inventário",
      value: formatCurrency(kpis.inventoryValue),
      sub: "stock activo",
      icon: "💶",
      accent: "text-blue-600",
    },
    {
      title: "Total em Stock",
      value: kpis.totalStock.toLocaleString("pt-PT"),
      sub:
        kpis.lowStockCount > 0
          ? `⚠ ${kpis.lowStockCount} em stock baixo`
          : "Tudo OK",
      icon: "📦",
      accent: "text-violet-600",
      subColor: kpis.lowStockCount > 0 ? "text-amber-500" : "text-emerald-500",
    },
    {
      title: "Entradas Hoje",
      value: kpis.todayMovements.entradas,
      sub: `${kpis.todayMovements.ajustes} ajuste(s)`,
      icon: "📥",
      accent: "text-emerald-600",
    },
    {
      title: "Saídas Hoje",
      value: kpis.todayMovements.saidas,
      sub: "movimentos do dia",
      icon: "📤",
      accent: "text-rose-600",
    },
  ];

  return (
    <PageLayout
      title="Dashboard Admin"
      description="Visão detalhada do inventário da organização"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((card) => (
          <Card
            key={card.title}
            className="shadow-none border border-slate-200"
          >
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span>{card.icon}</span>
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <p className={`text-2xl font-bold tabular-nums ${card.accent}`}>
                {card.value}
              </p>
              <p
                className={`text-xs mt-1 ${card.subColor ?? "text-slate-400"}`}
              >
                {card.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Área — movimentos mensais */}
        <Card className="shadow-none border border-slate-200">
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Movimentos — últimos 6 meses
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <ChartContainer config={areaConfig} className="h-[200px] w-full">
              <AreaChart
                data={movimentosMensais}
                margin={{ left: -20, right: 4 }}
              >
                <defs>
                  <linearGradient id="gradEntradas" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(221 83% 53%)"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(221 83% 53%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="gradSaidas" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(0 84% 60%)"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(0 84% 60%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="hsl(215 20% 92%)"
                />
                <XAxis
                  dataKey="mes"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "hsl(215 16% 57%)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "hsl(215 16% 57%)" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="entradas"
                  stroke="hsl(221 83% 53%)"
                  strokeWidth={2}
                  fill="url(#gradEntradas)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="saidas"
                  stroke="hsl(0 84% 60%)"
                  strokeWidth={2}
                  fill="url(#gradSaidas)"
                  dot={false}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Barras — stock por produto */}
        <Card className="shadow-none border border-slate-200">
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Stock vs Mínimo — top 8 produtos
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <ChartContainer config={barConfig} className="h-[200px] w-full">
              <BarChart data={barData} margin={{ left: -20, right: 4 }}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="hsl(215 20% 92%)"
                />
                <XAxis
                  dataKey="nome"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "hsl(215 16% 57%)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "hsl(215 16% 57%)" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="quantidade_estoque"
                  fill="hsl(221 83% 53%)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
                <Bar
                  dataKey="estoque_minimo"
                  fill="hsl(215 20% 85%)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de produtos */}
      <Card className="shadow-none border border-slate-200">
        <CardHeader className="pb-2 pt-4 px-5">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Estado do Stock — prioridade crítico
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="pl-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Produto
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Stock
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Mínimo
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Preço
                </TableHead>
                <TableHead className="pr-5 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Estado
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-10 text-center text-sm text-slate-300"
                  >
                    Sem produtos registados.
                  </TableCell>
                </TableRow>
              ) : (
                produtos.map((p) => (
                  <TableRow
                    key={p.id}
                    className="border-slate-100 hover:bg-slate-50"
                  >
                    <TableCell className="pl-5 font-medium text-slate-700">
                      {p.nome}
                    </TableCell>
                    <TableCell className="font-mono tabular-nums text-slate-600">
                      {p.quantidade_estoque ?? 0}{" "}
                      <span className="text-slate-400 text-xs">
                        {p.unidade}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono tabular-nums text-slate-400">
                      {p.estoque_minimo ?? 0}{" "}
                      <span className="text-xs">{p.unidade}</span>
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {p.preco_venda != null
                        ? formatCurrency(Number(p.preco_venda))
                        : "—"}
                    </TableCell>
                    <TableCell className="pr-5 text-right">
                      <EstadoBadge produto={p} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
