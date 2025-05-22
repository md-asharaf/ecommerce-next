import { Product } from '../../sanity.types';
import ProductGrid from './ProductGrid';
import CategorySelector from './CategorySelector';
import SortingFilter from './SortingFilter';

interface ProductsViewProps {
    fetchData: (page?: number) => Promise<{
        products: Product[];
        hasNextPage: boolean;
    }>;
    categoryId?: string;
}
const ProductsView = ({ fetchData, categoryId }: ProductsViewProps) => {
    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between w-full'>
                <div className='sm:max-w-[200px]'>
                    <CategorySelector categoryId={categoryId} />
                </div>
                <div className='sm:max-w-[200px]'>
                    <SortingFilter />
                </div>
            </div>
            <div className='flex-1'>
                <div>
                    <ProductGrid fetchData={fetchData} />
                </div>
            </div>
        </div>
    )
}

export default ProductsView