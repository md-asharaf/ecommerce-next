import { ElasticProduct } from "@/lib/elasticSearch";

export const searchProductsByName = async (searchParam: string) => {
    try {
        const products = await fetch(
            `http://localhost:3000/api/product/search?q=${searchParam}`,
            {
                method: "GET",
            }
        );
        const response = await products.json();
        if (!response) {
            throw new Error("No results found");
        }
        console.log("Search results:", response);
        return response.results as ElasticProduct[];
    } catch (error) {
        console.error("Error searching products by name:", error);
        return [];
    }
};
