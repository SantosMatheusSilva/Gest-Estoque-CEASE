import { Description, Label, SearchField } from "@heroui/react";

export function SearchProducts() {
  return (
    <div className="flex flex-col gap-4">
      <SearchField name="search">
        <Label>Procurar por produto</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input
            className="w-[280px]"
            placeholder="procurar produto..."
          />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Enter keywords to search for products</Description>
      </SearchField>
    </div>
  );
}
