import ProductsView from "@/components/ProductsView";
import { getAllProducts } from "@/sanity/lib/product/getAllProducts";

const Home = async () => {
  const fetchData = async (page?: number) => {
    "use server";
    return await getAllProducts(page);
  };
  return (
    <div className="flex flex-col justify-start min-h-screen p-4">
      <div className="rounded-lg sm:p-8 w-full space-y-2">
        <ProductsView
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default Home;
