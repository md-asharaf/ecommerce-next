"use server"
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getCategoryByRef = async (ref: string) => {
    const CATEGORY_BY_REF_QUERY = defineQuery(`
        *[_type=="category" && _id == $ref]
        `);
    try {
        const categories = await sanityFetch({
            query: CATEGORY_BY_REF_QUERY,
            params: { ref },
        });
        return categories.data?.[0] || null;
    } catch (error) {
        console.error("Error fetching category by ref: ", error);
        return null;
    }
};
