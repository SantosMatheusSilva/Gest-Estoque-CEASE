"use client";

import { useEffect, useState, useTransition } from "react";
import { Description, Label, SearchField, FieldError } from "@heroui/react";

type BaseItem = {
  id: string;
};

type SearchComponentProps<T extends BaseItem> = {
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  /**
   * Function that receives the search term
   * and returns the results (usually calling a server action)
   */
  onSearch: (term: string) => Promise<T[]>;
  /**
   * Called when an item is selected
   */
  onSelect: (item: T) => void;
  /**
   * Function to extract display label from item
   */
  getLabel: (item: T) => string;
};

export function SearchComponent<T extends BaseItem>({
  placeholder = "Search...",
  label = "Search",
  description,
  error,
  isInvalid,
  isRequired,
  onSearch,
  onSelect,
  getLabel,
}: SearchComponentProps<T>) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      startTransition(async () => {
        const data = await onSearch(query);
        setResults(data);
      });
    }, 400);

    return () => clearTimeout(delay);
  }, [query, onSearch]);

  function handleSelect(item: T) {
    setQuery(getLabel(item));
    setResults([]);
    onSelect(item);
  }

  return (
    <div className="relative flex flex-col gap-2">
      <SearchField
        value={query}
        onChange={setQuery}
        isRequired={isRequired}
        isInvalid={isInvalid}
      >
        <Label>{label}</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-70" placeholder={placeholder} />
          <SearchField.ClearButton />
        </SearchField.Group>
        {description && <Description>{description}</Description>}
        {error && <FieldError>{error}</FieldError>}
      </SearchField>

      {results.length > 0 && (
        <div className="absolute top-full z-50 mt-1 w-70 rounded-md border bg-white shadow-md">
          {results.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              {getLabel(item)}
            </button>
          ))}
        </div>
      )}

      {isPending && <div className="text-sm text-gray-500">Searching...</div>}
    </div>
  );
}
