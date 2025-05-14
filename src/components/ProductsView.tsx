import React from 'react'
import { Category, Product } from '../../sanity.types';
import ProductGrid from './ProductGrid';
import CategorySelector from './CategorySelector';
import SortingFilter from './SortingFilter';

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}
const ProductsView = ({ products, categories }: ProductsViewProps) => {
    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between w-full'>
                <div className='sm:max-w-[200px]'>
                    <CategorySelector categories={categories} />
                </div>
                <div className='sm:max-w-[200px]'>
                    <SortingFilter />
                </div>
            </div>
            <div className='flex-1'>
                <div>
                    <ProductGrid products={products} />
                </div>
            </div>
        </div>
    )
}

export default ProductsView