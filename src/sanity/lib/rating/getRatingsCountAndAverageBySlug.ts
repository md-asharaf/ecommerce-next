"use server";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getRatingsCountAndAverageBySlug = async (
    slug: string
): Promise<{
    ratingCount: number;
    ratingAvg: number;
    reviewCount: number;
}> => {
    const RATINGS_COUNT_AND_AVG_BY_SLUG_QUERY = defineQuery(`
        {
            "ratingCount": count(*[_type == "rating" && product->slug.current == $slug]),
            "reviewCount": count(*[_type == "rating" && product->slug.current == $slug && defined(review)]),
            "ratingAvg": round(math::avg(*[_type == "rating" && product->slug.current == $slug].rating) * 10) / 10
        }
    `);

    try {
        const result = await sanityFetch({
            query: RATINGS_COUNT_AND_AVG_BY_SLUG_QUERY,
            params: { slug },
        });
        return {
            ratingCount: result.data?.ratingCount || 0,
            reviewCount: result.data?.reviewCount || 0,
            ratingAvg: result.data?.ratingAvg || 0,
        };
    } catch (error) {
        console.error("Error fetching ratings count and average:", error);
        return {
            ratingAvg: 0,
            ratingCount: 0,
            reviewCount: 0,
        };
    }
};
