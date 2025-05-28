import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategoryBySlug } from "@/sanity/lib/category/getCategoryBySlug";
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
    return (
        <div className="flex flex-col justify-start min-h-screen p-4">
            <div className="rounded-lg sm:p-8 w-full space-y-2">
                <BreadCrumbComponent items={items} />
                <CategoryProducts categoryId={category._id} slug={slug} />
            </div>
        </div>
    )
}

export default CategoryPage