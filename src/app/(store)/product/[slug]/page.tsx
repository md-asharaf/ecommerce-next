import AddToBasketButton from "@/components/AddToBasketButton";
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/product/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryByRef } from "@/sanity/lib/category/getCategoryyRef";

const ProductPage = async ({ params }: {
    params: Promise<{
        slug: string
    }>
}) => {
    const { slug } = await params;
    const product = await getProductBySlug(slug)
    if (!product) {
        return notFound();
    }
    const category = await getCategoryByRef(product.category?._ref!);
    const isOutOfStock = product.stock === 0;
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock && "opacity-50"}`}>
                    <Image src={product.image ? imageUrl(product.image).url() : product.imageUrl || ''} fill alt={product.name || "Product Image"}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
                    />
                    {
                        isOutOfStock && (
                            <div className="absolute inset-0 flex items-center bg-black justify-center opacity-50">
                                <span className="text-white font-bold text-lg">
                                    Out of Stock
                                </span>
                            </div>
                        )
                    }
                </div>
                <div className="flex flex-col justify-between">
                    <BreadCrumbComponent productName={product.name} category={category!} />
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            {product.name}
                        </h1>
                        <div className="text-3xl font-semibold mb-2">
                            ${product.price?.toFixed(2)}
                        </div>
                        <div className="prose max-w-none mb-2">
                            {Array.isArray(product.description) && (
                                <PortableText value={product.description} />
                            )}
                        </div>
                    </div>
                    <div className="mt-6">
                        <AddToBasketButton product={product} disabled={isOutOfStock} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage