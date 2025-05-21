import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/category/getAllCategories";
export default async function Home() {
  const categories = await getAllCategories();
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4">
        <ProductsView categories={categories} />
      </div>
    </div>
  );
}
