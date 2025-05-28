import { Product } from '../../sanity.types';
import ProductGrid from './ProductGrid';
import CategorySelector from './CategorySelector';
import SortingFilter from './SortingFilter';
interface ProductsViewProps {
    products: Array<Product>;
    categoryId?: string;
    ref?: any;
}
const ProductsView = ({ products, ref, categoryId = "" }: ProductsViewProps) => {
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
                    <ProductGrid products={products} ref={ref} />
                </div>
            </div>
        </div>
    )
}

export default ProductsView