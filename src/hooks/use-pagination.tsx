'use client'
import { useEffect, useState, useCallback } from "react";

export interface PaginationResult<T> {
    items: T[];
    totalCount: number;
    totalPages: number;
}

export type FetchFunction<T> = (page: number) => Promise<PaginationResult<T>>;

export type PaginationHook<T> = {
    data: Array<T[]>;
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    totalCount: number;
    fetchPage: (page: number) => void;
};

export const usePagination = <T = unknown>(fetch: FetchFunction<T>, initialPage: number = 1): PaginationHook<T> => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [data, setData] = useState<Array<T[]>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const loadData = useCallback(async (page: number) => {
        setIsLoading(true);
        try {
            const { items, totalCount, totalPages } = await fetch(page);
            if (items.length === 0) return;
            const newData = data;
            newData[page - 1] = items;
            setData(newData);
            setCurrentPage(page);
            setTotalPages(totalPages);
            setTotalCount(totalCount);
        } finally {
            setIsLoading(false);
        }
    }, [fetch]);

    useEffect(() => {
        loadData(initialPage);
    }, [loadData, initialPage]);

    const fetchPage = (page: number) => {
        if (!isLoading && page > 0 && page <= totalPages) {
            loadData(page);
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
