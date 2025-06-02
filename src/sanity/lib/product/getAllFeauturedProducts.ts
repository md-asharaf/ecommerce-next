"use server"
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllFeauturedProducts = async (page: number, limit: number) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const FEATURED_PRODUCTS_QUERY = defineQuery(
        `*[_type == "product" && featured == true] | order(_createdAt desc)[$start...$end]`
    );
    try {
        const products = await sanityFetch({
            query: FEATURED_PRODUCTS_QUERY,
            params: {
                start,
                end,
            },
        });
        return {
            items: products.data || [],
            totalCount: products.data.length ?? 0,
            totalPages: Math.ceil(products.data.length ?? 0 / limit),
        };
    } catch (error) {
        console.error("Error fetching featured products:", error);
        return { items: [], totalCount: 0, totalPages: 0 };
    }
};
