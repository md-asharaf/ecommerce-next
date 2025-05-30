import ProductsView from "@/components/ProductsView";
import { getAllProducts } from "@/sanity/lib/product/getAllProducts";

const Home = () => {
  return (
    <div className="rounded-lg sm:px-8 w-full space-y-2">
      <ProductsView
        fetch={getAllProducts}
      />
    </div>
  );
};

export default Home;
