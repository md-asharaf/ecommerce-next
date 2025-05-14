import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProductsByName = async (searchParam: string) => {
    const PRODUCTS_BY_NAME_QUERY = defineQuery(`
        *[_type=="product"
            && name match $searchParam
        ] | order(name asc)
        `);

    try {
        const products = await sanityFetch({
            query: PRODUCTS_BY_NAME_QUERY,
            params: {
                searchParam,
            },
        });
        return products.data || [];
    } catch (error) {
        console.error("Error searching products by name:", error);
        return [];
    }
};
