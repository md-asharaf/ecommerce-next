import { ElasticProduct } from "@/lib/elasticSearch";

export const searchProductsByName = async (searchParam: string, page: number = 1, limit: number = 10) => {
    try {
        const products = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/search?q=${searchParam}&page=${page}&limit=${limit}`,
            {
                method: "GET",
            }
        );
        const response = await products.json();
        if (!response) {
            throw new Error("No results found");
        }
        return {
            products: response.results as ElasticProduct[],
            hasNextPage: response.results.length === limit,
            totalCount: response.total || 0
        };
    } catch (error) {
        console.error("Error searching products by name:", error);
        return {
            products: [],
            hasNextPage: false,
            totalCount: 0
        };
    }
};
