import { Product } from '../../sanity.types';
import Link from 'next/link';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import { ElasticProduct } from '@/lib/elasticSearch';
import { formatCurrency } from '@/lib/formatCurrency';

interface ProductThumbnailProps {
  product: Product | ElasticProduct;
}

const ProductThumbnail = ({ product }: ProductThumbnailProps) => {
  const isOutOfStock = product?.stock === 0;
  const originalPrice = product.price ?? 0;
  const discountedPrice = originalPrice * 0.7;
  const discountPercentage = Math.round((1 - discountedPrice / originalPrice) * 100);
  // Mock rating; replace with product.rating if available
  const rating = product.rating ?? 4.2; // Adjust based on your schema
  const ratingCount = product.ratingCount ?? 123; // Mock data; adjust as needed

  return (
    <Link
      href={`/product/${typeof product?.slug === 'string' ? product.slug : product?.slug?.current || ''}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isOutOfStock && 'opacity-60'
      } w-full aspect-[3/4]`}
    >
      {/* Image Section */}
      <div className="relative w-full flex-1 overflow-hidden rounded-t-lg">
        <Image
          src={product.image ? imageUrl(product.image).url() : product.imageUrl || '/placeholder.png'}
          fill
          alt={product.name || 'Product Image'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          priority={true} // Prioritize for homepage visibility
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <span className="text-white font-semibold text-base">Out of Stock</span>
          </div>
        )}
        {/* Discount Badge */}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 flex flex-col gap-2">
        {/* Product Name */}
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
          {product.name || 'Unnamed Product'}
        </h2>

        {/* Ratings */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-1.5 py-0.5 rounded">
            <span>{rating.toFixed(1)}</span>
            <svg
              className="w-3.5 h-3.5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-xs text-gray-500">({ratingCount})</span>
        </div>

        {/* Price and Discount */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold">
            {formatCurrency(discountedPrice, "INR")}
          </span>
          <span className="text-sm text-gray-500 line-through">
            {formatCurrency(originalPrice, "INR")}
          </span>
          {discountPercentage > 0 && (
          <div className="text-green-600 text-xs font-semibold px-2 py-1 rounded">
            {discountPercentage}% off
          </div>
        )}
        </div>
      </div>
    </Link>
  );
};

export default ProductThumbnail;