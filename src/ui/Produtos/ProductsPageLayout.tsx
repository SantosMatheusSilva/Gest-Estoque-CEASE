"use client";

import { useState } from "react";
import { PageLayout } from "../PageLayout";
import { CreateProductForm } from "@/src/ui/Produtos/CreateProductForm";
import ProductCard from "./ProductCard";
import EditProductForm from "./EditProductForm";
import { CategoriaRaiz, Produto } from "@/src/db/definitions";
import BaseSurface from "../Surface";

interface ProductsPageLayoutProps {
  categorias: CategoriaRaiz[];
  produtos: Produto[];
}

export default function ProductsPageLayout({ 
  categorias, 
  produtos 
}: ProductsPageLayoutProps) {
  const [editModal, setEditModal] = useState(false);
  const [produtoEdit, setProdutoEdit] = useState<Produto | null>(null);

  const openEdit = (produto: Produto) => {
    setProdutoEdit(produto);
    setEditModal(true);
  };

  const closeEdit = () => {
    setEditModal(false);
    setProdutoEdit(null);
  };

  return (
    <PageLayout
      title="Produtos"
      description="Lista de produtos em stock"
      actions={
        <div className="flex gap-2">
          <CreateProductForm categorias={categorias} />
        </div>
      }
    >
      {produtos.length === 0 ? (
        <div>
          <BaseSurface>
            <h2 className="text-xl font-semibold">Nenhum Produto encontrado</h2>
          </BaseSurface>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {produtos.map((produto) => (
            <ProductCard key={produto.id} produto={produto} onEdit={openEdit} />
          ))}
        </div>
      )}

      {/* Modal - passa array vazio para subcategorias */}
      {produtoEdit && (
        <EditProductForm
          produto={produtoEdit}
          categorias={categorias}
        />
      )}
    </PageLayout>
  );
}


