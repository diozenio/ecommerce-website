import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "@/types/product";

interface UseProductsOptions {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
  enabled?: boolean;
}

export function useProducts({
  limit = 10,
  skip = 0,
  category,
  search,
  enabled = true,
}: UseProductsOptions = {}) {
  const fetchProducts = async (): Promise<ProductsResponse> => {
    let url = `/api/products?limit=${limit}&skip=${skip}`;

    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }

    if (search) {
      url += `&q=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  };

  return useQuery({
    queryKey: ["products", limit, skip, category, search],
    queryFn: fetchProducts,
    enabled,
  });
}
