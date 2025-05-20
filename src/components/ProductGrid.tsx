"use client"
import { ElasticProduct } from '@/lib/elasticSearch';
import { Product } from '../../sanity.types'
import ProductThumbnail from './ProductThumbnail';
import { AnimatePresence, motion } from "framer-motion"
interface ProductGridProps {
    products: Product[] | ElasticProduct[];
}
const ProductGrid = ({ products }: ProductGridProps) => {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4'>
            {products?.map((product, index) => {
                return <AnimatePresence key={index}>
                    <motion.div
                        layout
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='flex'
                    >
                        <ProductThumbnail product={product}/>
                    </motion.div>
                </AnimatePresence>
            })}
        </div>
    )
}

export default ProductGrid