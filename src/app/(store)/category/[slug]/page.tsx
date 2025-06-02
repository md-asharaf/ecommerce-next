import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import CategorySelector from "@/components/CategorySelector";
import ProductGrid from "@/components/ProductGrid";
import SortingFilter from "@/components/SortingFilter";
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
    const {items:products,totalCount,totalPages} = await getProductsByCategory(slug, 1);
    const fetch = async (page:number)=>{
        "use server"
        return getProductsByCategory(slug, page);
    }
    return (
        <div className="flex flex-col justify-start min-h-screen p-4">
            <div className="rounded-lg sm:p-8 w-full space-y-2">
                <BreadCrumbComponent items={items} />
                <div className='flex flex-col'>
            <div className='flex items-center justify-between w-full'>
                <div className='sm:max-w-[200px]'>
                    <CategorySelector categoryId={category._id} />
                </div>
                <div className='sm:max-w-[200px]'>
                    <SortingFilter />
                </div>
            </div>
            <div className='flex-1'>
                <div>
                    <ProductGrid fetch={fetch} initialProducts={products} initialTotalCount={totalCount} initialTotalPages={totalPages} />
                </div>
            </div>
        </div>
            </div>
        </div>
    )
}

export default CategoryPage