import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/product/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryByRef } from "@/sanity/lib/category/getCategoryByRef";
import { formatCurrency } from "@/lib/formatCurrency";
import AddToCartButton from "@/components/AddToCartButton";
import ThumbnailGallery from "@/components/ThumbnailGallery";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { getRatingsCountAndAverageBySlug } from "@/sanity/lib/rating/getRatingsCountAndAverageBySlug";
import { getRatingsBySlug } from "@/sanity/lib/rating/getRatingsBySlug";
import Reviews from "@/components/Reviews";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return notFound();
  }
  const category = await getCategoryByRef(product.category?._ref!);
  const [{ ratingCount, ratingAvg, reviewCount }, { items: reviews }] = await Promise.all([getRatingsCountAndAverageBySlug(slug), getRatingsBySlug(slug, 1, 3)]);
  const isOutOfStock = product.stock === 0;

  const items = [
    {
      title: category?.title || "Category",
      href: `/category/${category?.slug?.current || ""}`,
    },
  ];

  const images = [
    product.image ? { asset: product.image } : null,
    product.imageUrl ? { url: product.imageUrl } : null,
  ].filter(Boolean);

  const originalPrice = product.price ?? 0;
  const discountedPrice = originalPrice * 0.7;
  const discountPercentage = Math.round((1 - discountedPrice / originalPrice) * 100);
  const savings = originalPrice - discountedPrice;

  const mockHighlights = [
    "Premium quality materials for lasting durability",
    "Ergonomic design for maximum comfort",
    "Easy to clean and maintain",
    "Environmentally friendly manufacturing process",
    "2-year warranty included",
  ];
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl bg-white min-h-[calc(100vh-4rem)]">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="border border-gray-200 rounded">
            <div className="relative aspect-square overflow-hidden rounded-lg p-2">
              <Image
                src={
                  images[0]?.asset
                    ? imageUrl(images[0].asset)?.url()
                    : images[0]?.url || "/placeholder.png"
                }
                alt={product.name || "Product Image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 500px"
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
            {images.length > 0 && (
              <ThumbnailGallery
                images={images.filter((img): img is { url?: string; asset?: any } => img !== null)}
              />
            )}
          </div>
          <div className="lg:col-span-2 lg:sticky lg:top-6 p-4 z-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <AddToCartButton
                product={product}
              />
              <Button
                disabled={isOutOfStock}
                className={`w-1/2 text-sm font-semibold ${isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                  }`}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <BreadCrumbComponent items={items} />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
            {product.name || "Unnamed Product"}
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
              <StarRating rating={ratingAvg} />
              <span>{(ratingAvg).toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-600">
              ({ratingCount} Ratings, {reviewCount} Reviews)
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">
                {formatCurrency(discountedPrice, "INR")}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {formatCurrency(originalPrice, "INR")}
              </span>
              <span className="text-sm text-green-600 font-medium">
                {discountPercentage}% off
              </span>
            </div>
            <p className="text-sm text-gray-600">
              You save: {formatCurrency(savings, "INR")}
            </p>
          </div>

          <div>
            <span
              className={`text-sm font-semibold ${(product?.stock ?? 0) < 10 ? "text-red-600" : "text-green-600"
                }`}
            >
              {!product.stock ? "Out of Stock" : product.stock > 9 ? `${product.stock} in stock` : `only ${product.stock} left`}
            </span>
          </div>

          <div className="text-sm text-gray-700 space-y-3">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <p>
                <span className="font-medium">Free Delivery</span> by{" "}
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  Check
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
              </svg>
              <p>10 Days Return Policy</p>
            </div>
          </div>

          <div className="prose prose-sm text-gray-700">
            {Array.isArray(product.description) ? (
              <PortableText value={product.description} />
            ) : (
              product.description || "No description available."
            )}
          </div>

          {mockHighlights.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
              <ul className="list-disc pl-5 text-sm text-gray-700 mt-2">
                {mockHighlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
          {reviewCount > 0 &&
            <div>
              <Reviews ratings={reviews} />
              {4 > 3 && (
                <Link
                  href={`/product/${slug}/reviews`}
                  className="mt-4 inline-block text-blue-600 hover:underline"
                >
                  See all {reviews.length} reviews
                </Link>
              )}
            </div>
          }
        </div>

      </div>
    </div>
  );
};

export default ProductPage;