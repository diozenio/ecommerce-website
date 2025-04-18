import { ProductsResponse, Product } from "@/types/product";
import { mockProducts } from "./__mocks__/product.mock";

export async function getAllProducts(
  limit: number = 10,
  skip: number = 0,
  category?: string
): Promise<ProductsResponse> {
  const filtered = category
    ? mockProducts.filter((p) => p.category === category)
    : mockProducts;

  return {
    products: filtered.slice(skip, skip + limit),
    total: filtered.length,
    skip,
    limit,
  };
}

export async function getProductById(id: string | number): Promise<Product> {
  const product = mockProducts.find((p) => p.id === Number(id));
  if (!product) throw new Error("Produto não encontrado");
  return product;
}

export async function searchProducts(
  query: string,
  limit: number = 10
): Promise<ProductsResponse> {
  const filtered = mockProducts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return {
    products: filtered.slice(0, limit),
    total: filtered.length,
    skip: 0,
    limit,
  };
}
