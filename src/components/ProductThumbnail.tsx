import { Product } from '../../sanity.types'
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
    return (
        <Link
            href={`/product/${typeof product?.slug == 'string' ? product?.slug : product?.slug?.current}`}
            className={`group flex flex-col bg-white rounded-lg border shadow-sm border-gray-200 transition-all duration-200 overflow-hidden hover:shadow-md ${isOutOfStock && 'opacity-50'} w-full aspect-[3/4]`}
        >
            <div className='relative w-full flex-1 overflow-hidden'>
                <Image src={product.image ? imageUrl(product.image).url() : product.imageUrl || ''} fill alt={product.name || "Product Image"}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
                />
                {isOutOfStock && (
                    <div className='absolute inset-0 items-center flex justify-center bg-black opacity-50'>
                        <span className='text-white font-bold text-lg'>
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>
            <div className='p-2 sm:p-4 flex flex-col'>
                <h2 className='text-lg font-semibold truncate text-gray-800'>
                    {product.name}
                </h2>
                <div className="flex space-x-4 text-lg">
                    <span className="text-gray-500 line-through">{formatCurrency(product.price ?? 0, "INR")}</span>
                    <span className="font-semibold">{formatCurrency((product.price ?? 0) * 0.70, "INR")}</span>
                </div>
            </div>
        </Link>
    )
}

export default ProductThumbnail