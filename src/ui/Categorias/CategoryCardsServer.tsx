import CategoryCards from "./CategoryCard";

type Props = {
  categoriasComSubcategorias: any[];
  orgId: string;
  userId: string;
};

export default function CategoryCardsServer({
  categoriasComSubcategorias,
  orgId,
  userId,
}: Props) {
  return (
    <CategoryCards
      categoriasComSubcategorias={categoriasComSubcategorias ?? []}
      orgId={orgId}
      userId={userId}
    />
  );
}
