"use client"
import { useCartStore } from '@/store/cart';
import { useEffect } from 'react'

const ClearCart = ({ orderId }: { orderId: string }) => {
    const { clearCart } = useCartStore();
    useEffect(() => {
        if (orderId) {
            clearCart();
        }
    }, [orderId, clearCart])
    return null
}

export default ClearCart