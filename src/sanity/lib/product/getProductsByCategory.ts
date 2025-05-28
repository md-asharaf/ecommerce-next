"use server";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { PaginationResult } from "@/hooks/use-pagination";
import { Product } from "../../../../sanity.types";

export const getProductsByCategory = async (
    slug: string,
    page: number = 1,
    limit: number = 10
): Promise<PaginationResult<Product>> => {
    const start = (page - 1) * limit;
    const end = start + limit;

    const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        {
            "items": *[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)] | order(name asc)[$start...$end],
            "totalCount": count(*[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)])
        }
    `);

    try {
        const result = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY_QUERY,
            params: { slug, start, end },
        });

        const items = result.data?.items || [];
        const totalCount = result.data?.totalCount || 0;
        const totalPages = Math.ceil(totalCount / limit);

        return {
            items,
            totalCount,
            totalPages,
        };
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return {
            items: [],
            totalCount: 0,
            totalPages: 0,
        };
    }
};
