"use client"
import { useEffect, useState } from 'react'
import { Product } from '../../sanity.types'
import { useCartStore } from '@/store/cart'
interface QuantitySelectorProps {
    product: Product,
    disabled?: boolean
}
const QuantitySelector = ({ product, disabled = false }: QuantitySelectorProps) => {
    const { addItem, getItemCount, removeItem } = useCartStore()
    const itemCount = getItemCount(product._id)
    const [isClient, setIsClient] = useState(false)
    useEffect(() => { setIsClient(true) }, [])
    if (!isClient) return null
    return (
        <div className='flex items-center justify-center'>
            <table className='border-collapse border border-gray-300 rounded-md'>
                <tbody>
                    <tr>
                        <td className='border-x border-gray-300 hover:bg-gray-200'>
                            <button className={`w-8 h-8 rounded flex items-center justify-center transition-colors duration-200`}
                                onClick={() => removeItem(product._id)}
                            >
                                <span className='text-3xl'>
                                    -
                                </span>
                            </button>                       
                        </td>
                        <td className='border-x border-gray-300 px-2'>
                            <span className='w-8 h-8 text-center font-semibold'>
                                {itemCount}
                            </span>
                        </td>
                        <td className='border-x border-gray-300 hover:bg-gray-200'>
                            <button className={`w-8 h-8 rounded flex items-center justify-center transition-colors duration-200 ${disabled && "bg-gray-400 cursor-not-allowed"}`}
                                disabled={disabled}
                                onClick={() => addItem(product)}
                            >
                                <span className='text-xl'>
                                    +
                                </span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default QuantitySelector