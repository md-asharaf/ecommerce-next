"use client";
import ProductsView from "@/components/ProductsView";
import { usePagination } from "@/hooks/use-pagination";
import { getAllProducts } from "@/sanity/lib/product/getAllProducts";
import { Product } from "../../../sanity.types";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import LoadingSpinner from "@/components/LoadingSpinner";

const Home = () => {
  const { data, fetchPage, currentPage, totalPages, isLoading } = usePagination<Product>(getAllProducts, 1);
  const lastProductRef = useRef(null)
  const { ref, entry } = useIntersection({
    root: lastProductRef.current,
    threshold: 1,
  });
  useEffect(() => {
    if (entry?.isIntersecting && !isLoading && currentPage < totalPages) {
      fetchPage(currentPage + 1);
    }
  }, [entry, totalPages, isLoading]);
  const products = data?.flatMap((page) => page) || [];
  return (
    <div className="flex flex-col justify-start p-4">
      <div className="rounded-lg sm:px-8 w-full space-y-2">
        <ProductsView
          products={products}
          ref={ref}
        />
      </div>
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default Home;
