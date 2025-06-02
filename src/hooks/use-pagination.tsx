'use client'
import { useState, useCallback, useEffect } from "react";

export interface PaginationResult<T> {
    items: T[];
    totalCount: number;
    totalPages: number;
}

export type FetchFunction<T> = (page: number) => Promise<PaginationResult<T>>;

export type PaginationHook<T> = {
    data: T[];
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    totalCount: number;
    fetchPage: () => void;
};

export const usePagination = <T = unknown>({ fetch, initialData, initialTotalCount, initialTotalPages }: { fetch: FetchFunction<T>, initialData: T[], initialTotalPages: number, initialTotalCount: number }): PaginationHook<T> => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<T[]>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const loadData = useCallback(async (page: number) => {
        setIsLoading(true);
        try {
            const { items, totalCount, totalPages } = await fetch(page);
            setData((prevData) => [...prevData, ...items]);
            setCurrentPage(page);
            setTotalPages(totalPages);
            setTotalCount(totalCount);
        } finally {
            setIsLoading(false);
        }
    }, [fetch]);

    const fetchPage = () => {
        if (!isLoading && currentPage > 0 && currentPage < totalPages) {
            loadData(currentPage + 1);
        }
    };
    return {
        data,
        currentPage,
        isLoading,
        totalPages,
        totalCount,
        fetchPage,
    };
};
