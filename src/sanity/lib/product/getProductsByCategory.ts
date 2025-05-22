import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (
    slug: string,
    page: number = 1,
    limit: number = 10
) => {
    const start = (page - 1) * limit;
    const end = start + limit;

    const COUNT_QUERY = defineQuery(`
        count(*[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)])
    `);

    const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)] | order(name asc)[$start...$end]
    `);

    try {
        const [products, totalCount] = await Promise.all([
            sanityFetch({
                query: PRODUCTS_BY_CATEGORY_QUERY,
                params: { slug, start, end },
            }),
            sanityFetch({
                query: COUNT_QUERY,
                params: { slug },
            }),
        ]);

        return {
            products: products.data || [],
            totalCount: totalCount.data || 0,
            hasNextPage: totalCount.data > end,
        };
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return {
            products: [],
            totalCount: 0,
            hasNextPage: false,
        };
    }
};
