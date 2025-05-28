"use client"
import { usePagination } from "@/hooks/use-pagination";
import { useIntersection } from "@mantine/hooks";
import { useCallback, useEffect, useRef } from "react";
import { Product } from "../../sanity.types";
import ProductsView from "./ProductsView";
import { getProductsByCategory } from "@/sanity/lib/product/getProductsByCategory";

const CategoryProducts = ({ slug, categoryId }: { slug: string; categoryId: string }) => {
    const fetchProductsByCategory = useCallback((page: number) => {
        return getProductsByCategory(slug, page);
    }, [])
    const { data, fetchPage, totalPages, currentPage, isLoading } = usePagination<Product>(fetchProductsByCategory, 1);
    const lastProductRef = useRef(null)
    const { ref, entry } = useIntersection({
        root: lastProductRef.current,
        threshold: 1,
    });

    useEffect(() => {
        if (entry?.isIntersecting && !isLoading && currentPage < totalPages) {
            fetchPage(currentPage + 1);
        }
    }, [entry, totalPages, isLoading, fetchPage]);
    const products = data?.flatMap((page) => page) || [];
    return (
        <ProductsView
            ref={ref}
            products={products}
            categoryId={categoryId}
        />
    )
}

export default CategoryProducts