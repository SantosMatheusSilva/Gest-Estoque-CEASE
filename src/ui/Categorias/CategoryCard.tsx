import { Card, ListBox, ListBoxItem } from "@heroui/react";
import { ArrowUpRightFromSquare } from "@gravity-ui/icons";
import { fetchCategoriaComSubcategorias } from "@/src/db/data";
import BaseSurface from "../Surface";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function CategoryCards() {
  const { orgId } = (await auth()) as { orgId: string };
  const categoriasComSubcategorias =
    await fetchCategoriaComSubcategorias(orgId);

  //debug logs
  /*   console.log("Categories data:", categoriasComSubcategorias);
  console.log("First category:", categoriasComSubcategorias[0]); */
  if (categoriasComSubcategorias.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center align-center gap-2">
        <BaseSurface variant="default">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold">
              Nenhuma Categoria encontrada
            </h2>
            <p>Os recursos solicitados não existem.</p>
            <p>Comece por adicionar uma categoria ao seu estoque.</p>
          </div>
        </BaseSurface>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {categoriasComSubcategorias.map((categoria) => (
        <Card key={categoria.id_categoria} className="mb-4 p-4 w-60 h-60">
          <Card.Header>
            <Card.Title className="text-xl font-bold mb-2">
              {categoria.nome}
            </Card.Title>
          </Card.Header>
          <Card.Content className="max-h-48 overflow-y-auto mb-4">
            <span className="block font-medium">
              Subcategorias:{" "}
              {categoria.subcategorias && categoria.subcategorias.length > 0
                ? ` (${categoria.subcategorias.length})`
                : ""}
            </span>
            <ListBox>
              <ListBox.Section>
                {categoria.subcategorias &&
                categoria.subcategorias.length > 0 ? (
                  categoria.subcategorias.map((subcategoria) => (
                    <ListBox.Item key={subcategoria.nome}>
                      {subcategoria.nome}
                    </ListBox.Item>
                  ))
                ) : (
                  <ListBox.Item className="block text-gray-500">
                    Nenhuma subcategoria associada.
                  </ListBox.Item>
                )}
              </ListBox.Section>
            </ListBox>
            {/*  {categoria.subcategorias?.length ? (
              <ul className="list-disc list-inside">
                {categoria.subcategorias.map((subcategoria) => (
                  <li key={subcategoria.id_categoria}>{subcategoria.nome}</li>
                ))}
              </ul>
            ) : (
              <span className="block text-gray-500">
                Nenhuma subcategoria associada.
              </span>
            )} */}
          </Card.Content>
          <Card.Footer>
            <Link
              className="hover:underline flex items-center gap-1"
              href={`/aplicacao/categorias/${categoria.id_categoria}/detalhes`}
            >
              Detalhes <ArrowUpRightFromSquare />
            </Link>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}
