import { FormEvent, useState, ChangeEvent } from "react";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/category";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import Spinner from "../common/spinner";

interface ProductsFilterProps {
  currentCategory?: string;
  currentSearch?: string;
  onFilterChange: (
    category: string | undefined,
    search: string | undefined
  ) => void;
}

export default function ProductsFilter({
  currentCategory,
  currentSearch = "",
  onFilterChange,
}: ProductsFilterProps) {
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const { data: categoriesData, isLoading: loadingCategories } =
    useCategories();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFilterChange(currentCategory, searchTerm || undefined);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange(
      value === "all" ? undefined : value,
      searchTerm || undefined
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    onFilterChange(undefined, undefined);
  };

  return (
    <div className="p-4 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <div className="flex-1">
          <Label htmlFor="category" className="mb-2 block">
            Categoria
          </Label>

          <Select
            value={currentCategory || "all"}
            onValueChange={(value) =>
              handleCategoryChange({
                target: { value },
              } as React.ChangeEvent<HTMLSelectElement>)
            }
            disabled={loadingCategories}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categoriesData?.categories.map((category: Category) => (
                <SelectItem key={category.slug} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {loadingCategories && (
            <div className="absolute right-10 top-2">
              <Spinner />
            </div>
          )}
        </div>

        <div className="flex-1">
          <Label htmlFor="search" className="mb-2 block">
            Buscar
          </Label>

          <form onSubmit={handleSubmit} className="flex">
            <Input
              type="text"
              id="search"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nome do produto..."
              className="rounded-r-none focus-visible:ring-0 border-r-0"
            />
            <Button
              type="submit"
              variant="outline"
              className="rounded-l-none px-4"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div>
          <Button
            variant="secondary"
            type="button"
            onClick={handleClearFilters}
          >
            Limpar filtros
          </Button>
        </div>
      </div>

      {(currentCategory || (currentSearch && currentSearch.length > 0)) && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Filtros ativos:</span>

          {currentCategory && (
            <Badge variant="outline" size="md">
              Categoria: {currentCategory}
              <button
                type="button"
                onClick={() => onFilterChange(undefined, currentSearch)}
                className="hover:opacity-50 transition-all duration-300 ease-in-out focus:outline-none"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {currentSearch && (
            <Badge variant="outline" size="md">
              Busca: {currentSearch}
              <button
                type="button"
                onClick={() => onFilterChange(currentCategory, undefined)}
                className="hover:text-red-600 focus:outline-none"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
