import { Category } from "@/types/category";
import { mockCategories } from "./__mocks__/category.mock";

export async function getProductCategories(): Promise<Category[]> {
  return mockCategories;
}
