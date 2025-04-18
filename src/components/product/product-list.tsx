"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { usePagination } from "@/hooks/usePagination";
import ProductsFilter from "./products-filter";
import ProductsHeader from "./products-header";
import ProductsLoading from "./products-loading";
import ProductsError from "./products-error";
import ProductsEmpty from "./products-empty";
import ProductsGrid from "./products-grid";

import PageSizeSelector from "./page-size-selector";
import { Product } from "@/types/product";
import { useWishlistStore } from "@/store/useWishlistStore";
import ProductsPagination from "./products-pagination";

export default function ProductList() {
  const [category, setCategory] = useState<string | undefined>();
  const [search, setSearch] = useState<string | undefined>();
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();

  const pagination = usePagination({ initialPage: 1, initialPageSize: 12 });
  const {
    currentPage,
    pageSize,
    offset,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    goToPage,
    setTotalItems,
    setPageSize,
  } = pagination;

  const { data, isLoading, isError, error } = useProducts({
    limit: pageSize,
    skip: offset,
    category,
    search,
  });

  if (data?.total && data.total !== pagination.totalItems) {
    setTotalItems(data.total);
  }

  const handleAddToCart = (product: Product) => {
    console.log(`Produto adicionado ao carrinho: ${product.title}`);
  };

  const handleFilterChange = (
    category: string | undefined,
    search: string | undefined
  ) => {
    setCategory(category);
    setSearch(search);
    goToPage(1);
  };

  const handleAddToWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <ProductsHeader />

      <ProductsFilter
        currentCategory={category}
        currentSearch={search}
        onFilterChange={handleFilterChange}
      />

      {isLoading && <ProductsLoading />}
      {isError && <ProductsError error={error} />}
      {data?.products && data.products.length > 0 ? (
        <ProductsGrid
          products={data.products}
          onAddToCart={handleAddToCart}
          isInWishlist={isInWishlist}
          onAddToWishlist={handleAddToWishlist}
        />
      ) : (
        !isLoading && <ProductsEmpty />
      )}

      <div className="w-full flex justify-between gap-8 items-center my-6">
        {data?.total && totalPages && totalPages > 1 && (
          <ProductsPagination
            currentPage={currentPage}
            goToPage={goToPage}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            totalPages={totalPages}
          />
        )}

        {data?.products && data.products.length > 0 && (
          <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
        )}
      </div>
    </div>
  );
}
