import Reviews from "@/components/Reviews";
import ThumbnailGallery from "@/components/ThumbnailGallery";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/product/getProductBySlug";
import Image from "next/image";

const ProductReviews = async ({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ page: number }> }) => {
  const { slug } = await params;
  const { page = 1 } = await searchParams;
  const product = await getProductBySlug(slug)
  const { items: ratings, totalPages } = await getRatingsBySlug(slug, page, 10);
  const isOutOfStock = product?.stock == 0
  const images = [
    "https://picsum.photos/400/400?random=1",
    "https://picsum.photos/400/400?random=2",
    "https://picsum.photos/400/400?random=3",
    "https://picsum.photos/400/400?random=4",
    "https://picsum.photos/400/400?random=5"
  ]
  return (<div className="container mx-auto px-8 py-4 max-w-6xl bg-white min-h-[calc(100vh-4rem)] flex space-x-4 sm:space-x-8">
    <div className="w-1/4 flex flex-col space-y-8">
      <div className="relative aspect-square overflow-hidden rounded-lg px-4 py-6">
        <Image
          src={
            product?.image ? imageUrl(product.image)?.url()
              : product?.imageUrl || "/placeholder.png"
          }
          alt={product?.name || "Product Image"}
          fill
          className={`object-contain w-full h-full transition-transform duration-300 hover:scale-105 ${isOutOfStock && "opacity-60"
            }`}
          priority
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <span className="text-white font-semibold text-xl tracking-wide">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="flex-1 border-t">
        <ThumbnailGallery images={images} />
      </div>
    </div>
    <div className="flex-1 border-l p-4">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight border-b pb-4">
        {(product?.name || "Unnamed Product") + " Reviews"}
      </h1>
      <Reviews ratings={ratings} totalPages={totalPages} currentPage={page} />
    </div>
  </div>
  )
}

export default ProductReviews