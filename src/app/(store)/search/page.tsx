import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/product/searchProductsByName";
import { redirect } from "next/navigation";
const SearchPage = async ({ searchParams }: {
    searchParams: Promise<{
        query
        : string
    }>
}) => {
    const { query } = await searchParams;
    if(!query || query.trim() === "") {
        redirect('/');
    }
    const fetch = async (page: number) => {
        "use server";
        return searchProductsByName(query, page, 10);
    }

    return (
        <ProductGrid fetch={fetch} />
    )
}

export default SearchPage