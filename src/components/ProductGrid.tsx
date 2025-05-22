"use client"
import { Product } from '../../sanity.types'
import ProductThumbnail from './ProductThumbnail';
import { AnimatePresence, motion } from "framer-motion"
import { useIntersection } from "@mantine/hooks"
import { useEffect, useRef, useState } from 'react';
import Loading from '@/app/(store)/loading';
interface ProductGridProps {
    fetchData: (page?: number) => Promise<{
        products: Product[];
        hasNextPage: boolean;
    }>;
}
const ProductGrid = ({ fetchData }: ProductGridProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            const { products, hasNextPage } = await fetchData(page);
            setProducts(products);
            setHasNextPage(hasNextPage);
            setPage(page + 1);
            setIsLoading(false);
        };
        loadInitialData();
    }, [fetchData]);
    const addProducts = (newProducts: Product[]) => {
        setProducts((prev) => [...prev, ...newProducts]);
    }
    const lastProductRef = useRef(null)
    const { ref, entry } = useIntersection({
        root: lastProductRef.current,
        threshold: 1,
    });
    const fetchNextPage = async () => {
        if (isLoading || !hasNextPage) return;
        setIsLoading(true);
        try {
            const { products: newProducts, hasNextPage: nextPage } = await fetchData(page);
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
            {isLoading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20'>
                    <Loading />
                </div>
            )}
        </div>
    )
}

export default ProductGrid