import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/product/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryByRef } from "@/sanity/lib/category/getCategoryyRef";
import { formatCurrency } from "@/lib/formatCurrency";
import AddToCartButton from "@/components/AddToCartButton";

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
    const items = [
        {
            title: category?.title || "",
            href: `/category/${category?.slug?.current}`
        }
    ]
    const isOutOfStock = product.stock === 0;
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                {/* image section */}
                <div className={`relative aspect-square overflow-hidden rounded-lg ${isOutOfStock && "opacity-50"}`}>
                    <Image
                        src={product.image ? imageUrl(product.image).url() : product.imageUrl || ''}
                        alt={product.name || "Product Image"}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 400px, 400px'
                        className='object-contain w-full h-full transition-transform duration-300'
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
                {/* product details section */}
                <div className="flex flex-col justify-start space-y-2">
                    <BreadCrumbComponent items={items} />
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-3xl font-bold">
                            {product.name}
                        </h1>
                        <div className="flex space-x-4 text-lg">
                            <span className="text-gray-500 line-through">{formatCurrency(product.price ?? 0, "INR")}</span>
                            <span className="font-semibold">{formatCurrency((product.price ?? 0) * 0.70, "INR")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">(4.0)</span>
                        </div>
                        <div className="prose max-w-none">
                            {Array.isArray(product.description) ? (
                                <PortableText value={product.description} />
                            ) : product.description}
                        </div>
                    </div>
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    )
}

export default ProductPage