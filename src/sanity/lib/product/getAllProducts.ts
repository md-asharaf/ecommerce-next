import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async (page: number = 1, limit: number = 10) => {
    const start = (page - 1) * limit;
    const end = start + limit;

    const COUNT_QUERY = defineQuery(`
        count(*[_type == "product"])
    `);

    const ALL_PRODUCTS_QUERY = defineQuery(`
        *[_type == "product"] | order(name asc)[$start...$end]
    `);

    try {
        const [products, totalCount] = await Promise.all([
            sanityFetch({
                query: ALL_PRODUCTS_QUERY,
                params: { start, end },
            }),
            sanityFetch({
                query: COUNT_QUERY,
            }),
        ]);

        return {
            products: products.data || [],
            totalCount: totalCount.data || 0,
            hasNextPage: totalCount.data > end,
        };
    } catch (error) {
        console.error("Error fetching products:", error);
        return {
            products: [],
            totalCount: 0,
            hasNextPage: false,
        };
    }
};
