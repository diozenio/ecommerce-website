import { useState, useCallback } from "react";

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems?: number;
  totalPages?: number;
}

interface PaginationActions {
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
}

interface PaginationHelpers {
  offset: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

type PaginationHookReturn = PaginationState &
  PaginationActions &
  PaginationHelpers;

interface PaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  initialTotalItems?: number;
}

export function usePagination({
  initialPage = 1,
  initialPageSize = 10,
  initialTotalItems,
}: PaginationOptions = {}): PaginationHookReturn {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [totalItems, setTotalItems] = useState<number | undefined>(
    initialTotalItems
  );

  const offset = (currentPage - 1) * pageSize;
  const totalPages =
    totalItems !== undefined ? Math.ceil(totalItems / pageSize) : undefined;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage =
    totalPages !== undefined ? currentPage < totalPages : true;

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1) page = 1;
      if (totalPages !== undefined && page > totalPages) page = totalPages;
      setCurrentPage(page);
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [hasPreviousPage]);

  const changePageSize = useCallback(
    (size: number) => {
      const firstItemIndex = offset;
      const newPage = Math.floor(firstItemIndex / size) + 1;

      setPageSize(size);
      setCurrentPage(newPage);
    },
    [offset]
  );

  return {
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    offset,
    hasPreviousPage,
    hasNextPage,
    goToPage,
    nextPage,
    previousPage,
    setPageSize: changePageSize,
    setTotalItems,
  };
}
