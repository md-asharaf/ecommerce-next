import React from 'react'
import { Product } from '../../sanity.types'
import Link from 'next/link';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
interface ProductThumbnailProps {
    product: Product;
}
const ProductThumbnail = ({ product }: ProductThumbnailProps) => {
    const isOutOfStock = product?.stock === 0;
    return (
        <Link
            href={`/product/${product?.slug?.current}`}
            className={`group flex flex-col bg-white rounded-lg border shadow-sm border-gray-200 transition-all duration-200 overflow-hidden hover:shadow-md ${isOutOfStock && 'opacity-50'}`}
        >
            <div className='relative w-full h-full aspect-square overflow-hidden'>
                {
                    product?.image && (
                        <Image src={imageUrl(product.image).url()} fill alt={product.name || "Product Image"}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            className='object-contain transition-transform duration-300 group-hover:scale-105'
                        />
                    )
                }
                {isOutOfStock && (
                    <div className='absolute inset-0 items-center flex justify-center bg-black opacity-50'>
                        <span className='text-white font-bold text-lg'>
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>
            <div className='p-4'>
                <h2 className='text-lg font-semibold truncate text-gray-800'>
                    {product.name}
                </h2>
                <p className='text-sm mt-2 text-gray-600 line-clamp-2'>
                    {
                        product?.description?.map((block) =>
                            block._type == "block" ? block.children?.map((child) => child.text).join(" ") : ""
                        ).join() || "No description available"
                    }
                </p>
                <p>
                    ${product.price?.toFixed(2)}
                </p>
            </div>
        </Link>
    )
}

export default ProductThumbnail