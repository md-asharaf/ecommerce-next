"use client"
import { ElasticProduct } from '@/lib/elasticSearch';
import { Product } from '../../sanity.types'
import ProductThumbnail from './ProductThumbnail';
import { AnimatePresence, motion } from "framer-motion"
import { FetchFunction, usePagination } from '@/hooks/use-pagination';
import { useEffect, useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import LoadingSpinner from './LoadingSpinner';
interface ProductGridProps {
    fetch: FetchFunction<Product | ElasticProduct>,
}
const ProductGrid = ({ fetch }: ProductGridProps) => {
    const { data, fetchPage, currentPage, totalPages, isLoading } = usePagination(fetch, 1);
    const lastProductRef = useRef(null)
    const { ref, entry } = useIntersection({
        root: lastProductRef.current,
        threshold: 1,
    });
    useEffect(() => {
        if (entry?.isIntersecting && !isLoading && currentPage < totalPages) {
            fetchPage(currentPage + 1);
        }
    }, [entry, totalPages, isLoading]);
    console.log(currentPage, data)
    const products = data?.flatMap((page) => page) || [];
    return (
        <>
            <div className={`flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 mt-4 z-10`}>
                {products?.map((product, index) => {
                    const isLastProduct = index === products.length - 1;
                    return <AnimatePresence key={index} >
                        <motion.div
                            layout
                            initial={{ opacity: 0.2 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='flex'
                            ref={isLastProduct ? ref : undefined}
                        >
                            <ProductThumbnail product={product} />
                        </motion.div>
                    </AnimatePresence>
                })}
            </div>
            {isLoading && <LoadingSpinner />}
        </>
    )
}

export default ProductGrid