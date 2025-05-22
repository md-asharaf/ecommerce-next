"use server"
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getCategoryBySlug = async (slug: string) => {
    const CATEGORY_BY_SLUG_QUERY = defineQuery(`
        *[_type=="category" && slug.current == $slug]
    `);
    try {
        const categories = await sanityFetch({
            query: CATEGORY_BY_SLUG_QUERY,
            params: { slug },
        });
        return categories.data?.[0] || null;
    } catch (error) {
        console.error("Error fetching category by slug: ", error);
        return null;
    }
};
