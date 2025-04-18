import { useQuery } from "@tanstack/react-query";
import { CategoriesResponse } from "@/types/category";

export function useCategories(enabled = true) {
  const fetchCategories = async (): Promise<CategoriesResponse> => {
    const response = await fetch("/api/products/categories");

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  };

  return useQuery<CategoriesResponse>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled,
  });
}
