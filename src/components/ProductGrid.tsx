"use client"
import { ElasticProduct } from '@/lib/elasticSearch';
import { Product } from '../../sanity.types'
import ProductThumbnail from './ProductThumbnail';
import { AnimatePresence, motion } from "framer-motion"
import { useIntersection } from "@mantine/hooks"
import { useEffect, useRef, useState } from 'react';
import { useProductStore } from '@/store/product';
import { getAllProducts } from '@/sanity/lib/product/getAllProducts';
import Loading from '@/app/(store)/loading';
interface ProductGridProps {
    products?: Product[] | ElasticProduct[];
}

const ProductGrid = ({ products: categoryProducts }: ProductGridProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { addProducts, products, page, hasNextPage, setHasNextPage, setPage } = useProductStore()
    const lastProductRef = useRef(null)
    const { ref, entry } = useIntersection({
        root: lastProductRef.current,
        threshold: 1,
    });
    const items = categoryProducts || products;
    useEffect(() => {
        if (page > 1) return;
        fetchNextPage();
    }, [])
    const fetchNextPage = async () => {
        if (isLoading || !hasNextPage) return;
        setIsLoading(true);
        try {
            const { products: newProducts, hasNextPage: nextPage } = await getAllProducts(page, 18);
            setHasNextPage(nextPage);
            if (newProducts.length > 0) {
                addProducts(newProducts);
                setPage(page + 1);
            }
        } catch (error) {
            console.error('Error fetching next page:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage && !isLoading) {
            fetchNextPage();
        }
    }, [entry, hasNextPage, isLoading]);
    console.log({ page, hasNextPage })
    return (
        <div className={`flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4 z-10`}>
            {items?.map((product, index) => {
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
            {products.length}
            {isLoading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20'>
                    <Loading />
                </div>
            )}
        </div>
    )
}

export default ProductGrid