import { Card, ListBox, ListBoxItem } from "@heroui/react";
import { ArrowUpRightFromSquare } from "@gravity-ui/icons";
import { fetchCategoriaComSubcategorias } from "@/src/db/data";
import Link from "next/link";

export default async function CategoryCards() {
  const categoriasComSubcategorias = await fetchCategoriaComSubcategorias();

  //debug logs
  /*   console.log("Categories data:", categoriasComSubcategorias);
  console.log("First category:", categoriasComSubcategorias[0]); */

  return (
    <div className="flex flex-wrap gap-4 align-center">
      {categoriasComSubcategorias.map((categoria) => (
        <Card key={categoria.id_categoria} className="mb-4 p-4 w-100">
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
