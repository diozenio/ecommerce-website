import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, searchProducts } from "@/services/productService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = parseInt(searchParams.get("skip") || "0");
    const category = searchParams.get("category") || undefined;
    const query = searchParams.get("q") || undefined;

    if (query) {
      const products = await searchProducts(query, limit);
      return NextResponse.json(products);
    } else {
      const products = await getAllProducts(limit, skip, category);
      return NextResponse.json(products);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
