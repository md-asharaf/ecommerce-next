import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductById = async (productId: string, variantId?: string) => {
    const PRODUCT_BY_ID_QUERY = defineQuery(`
        *[_type == "product" && _id == $productId][0] {
            image: images[0],
            name,
            description,
            originalPrice,
            slug,
            brand->,
            ${variantId ? `variant: *[_type == "variant" && productId==$productId && _id == $variantId][0],` : ""}
        }
    `);

    try {
        const product = await sanityFetch({
            query: PRODUCT_BY_ID_QUERY,
            params: { productId, variantId },
        });

        return product.data || null;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
};
