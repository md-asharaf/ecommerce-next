"use client"
import { ElasticProduct } from '@/lib/elasticSearch';
import { Product } from '../../sanity.types'
import ProductThumbnail from './ProductThumbnail';
import { AnimatePresence, motion } from "framer-motion"
interface ProductGridProps {
    products: Array<Product | ElasticProduct>;
    ref?: any;
}
const ProductGrid = ({ products, ref }: ProductGridProps) => {
    return (
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
    )
}

export default ProductGrid