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
    initialTotalPages: number,
    initialTotalCount:number
    initialProducts: (Product | ElasticProduct)[],
    fetch: FetchFunction<Product | ElasticProduct>,
}
const ProductGrid = ({ initialProducts,initialTotalPages,initialTotalCount,fetch }: ProductGridProps) => {
    const { data:products, fetchPage, currentPage, totalPages, isLoading } = usePagination({
        fetch,
        initialData: initialProducts,
        initialTotalPages: initialTotalPages || 1,
        initialTotalCount: initialTotalCount || initialProducts.length,
    });
    const lastProductRef = useRef(null)
    const { ref, entry } = useIntersection({
        root: lastProductRef.current,
        threshold: 1,
    });
    useEffect(() => {
        if (entry?.isIntersecting && !isLoading && currentPage < totalPages) {
            fetchPage();
        }
    }, [entry, totalPages, isLoading]);
    console.log(
        { currentPage, totalPages,isLoading,products }
    );
    if (!products || products.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No products found</p>
            </div>
        );
    }
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