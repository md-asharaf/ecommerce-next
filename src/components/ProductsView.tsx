import { Product } from '../../sanity.types';
import ProductGrid from './ProductGrid';
import CategorySelector from './CategorySelector';
import SortingFilter from './SortingFilter';
import { FetchFunction } from '@/hooks/use-pagination';
import { ElasticProduct } from '@/lib/elasticSearch';
interface ProductsViewProps {
    categoryId?: string,
    fetch:FetchFunction<Product | ElasticProduct>
}
const ProductsView = ({ fetch, categoryId = "" }: ProductsViewProps) => {
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
                    <ProductGrid fetch={fetch} />
                </div>
            </div>
        </div>
    )
}

export default ProductsView