import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/category/getAllCategories";
import { getCategoryBySlug } from "@/sanity/lib/category/getCategoryBySlug";
import { getProductsByCategory } from "@/sanity/lib/product/getProductsByCategory";
import { notFound } from "next/navigation";
import { title } from "process";

const CategoryPage = async ({ params }: {
    params: Promise<{
        slug: string
    }>
}) => {
    const { slug } = await params;
    const products = await getProductsByCategory(slug);
    const category = await getCategoryBySlug(slug);
    const categories = await getAllCategories();
    if (!category) {
        return notFound();
    }
    const items = [
        {
            title: category.title || "",
            href: `/category/${category.slug?.current}`
        }
    ]
    return (
        <div className="flex flex-col justify-start min-h-screen p-4">
            <div className="rounded-lg sm:p-8 w-full space-y-2">
                <BreadCrumbComponent items={items} />
                <ProductsView categories={categories} products={products} />
            </div>
        </div>
    )
}

export default CategoryPage