import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/product/searchProductsByName";

const SearchPage = async ({ searchParams }: {
    searchParams: Promise<{
        query
        : string
    }>
}) => {
    const { query } = await searchParams;
    const {items:products,totalCount,totalPages} = await searchProductsByName(query);
    const fetch = async (page:number)=> {
        "use server"
        return await searchProductsByName(query,page)
    }
    
    return (<div className="flex flex-col items-center justify-start min-h-screen p-4">
        <div className="p-8 rounded-lg w-full">
            <h1 className="text-3xl font-bold mb-6 text-center">
                {!products?.length ? "No products found" : "Search results"} for query : {query}
            </h1>
            {!products?.length ? <p className="text-gray-600 text-center">
                Try searching with different keywords
            </p> :
                <ProductGrid initialProducts={products} initialTotalCount={totalCount} initialTotalPages={totalPages} fetch={fetch} />
            }
        </div>
    </div>
    )
}

export default SearchPage