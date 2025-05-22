import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import ProductsView from "@/components/ProductsView";
import { getCategoryBySlug } from "@/sanity/lib/category/getCategoryBySlug";
import { getProductsByCategory } from "@/sanity/lib/product/getProductsByCategory";
import { notFound } from "next/navigation";

const CategoryPage = async ({ params }: {
    params: Promise<{
        slug: string
    }>
}) => {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);
    if (!category) {
        return notFound();
    }
    const items = [
        {
            title: category.title || "",
            href: `/category/${category.slug?.current}`
        }
    ];
    const fetchData = async (page?: number) => {
        "use server";
        return await getProductsByCategory(slug, page);
    };
    return (
        <div className="flex flex-col justify-start min-h-screen p-4">
            <div className="rounded-lg sm:p-8 w-full space-y-2">
                <BreadCrumbComponent items={items} />
                <ProductsView
                    fetchData={fetchData}
                    categoryId={category._id}
                />
            </div>
        </div>
    )
}

export default CategoryPage