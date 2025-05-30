"use server"
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getReviewsCountBySlug = async (
    slug: string 
): Promise<number> => {
    const REVIEWS_COUNT_BY_SLUG_QUERY = defineQuery(`
        count(*[_type == "review" && product->slug.current == $slug])
    `);

    try {
        const result = await sanityFetch({
            query: REVIEWS_COUNT_BY_SLUG_QUERY,
            params: { slug },
        });
        return result.data || 0;
    } catch (error) {
        console.error("Error fetching reviews count:", error);
        return 0;
    }
};
