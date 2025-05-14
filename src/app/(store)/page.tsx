import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/category/getAllCategories";
import { getAllProducts } from "@/sanity/lib/product/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
