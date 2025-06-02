import { getAllProducts } from "@/sanity/lib/product/getAllProducts";
import ProductGrid from "@/components/ProductGrid";

const AllProductsPage = async () => {
    const { items: products, totalCount, totalPages } = await getAllProducts(1, 10);

    return (
        <main className="sm:px-8 py-8 space-y-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <ProductGrid
                initialProducts={products}
                initialTotalCount={totalCount}
                fetch={getAllProducts}
                initialTotalPages={totalPages}
            />
        </main>
    );
}
export default AllProductsPage;
