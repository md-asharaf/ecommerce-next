import CategoryShortcuts from "@/components/CategoryShorcuts";
import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import { getAllFeauturedProducts } from "@/sanity/lib/product/getAllFeauturedProducts";
import { getAllProducts } from "@/sanity/lib/product/getAllProducts";

export default async function Home() {
  const { items: products, totalCount, totalPages } = await getAllFeauturedProducts(1, 10);
  return (
    <main className="space-y-12">
      <HeroBanner />
      <CategoryShortcuts />
      <section className="sm:px-8">
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
        <ProductGrid initialProducts={products} fetch={getAllProducts} initialTotalCount={totalCount} initialTotalPages={totalPages} />
      </section>
      <PromoBanner />
    </main >
  );
}
