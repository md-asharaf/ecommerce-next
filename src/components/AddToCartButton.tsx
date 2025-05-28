"use client"
import { useCartStore } from "@/store/cart"
import { Product } from "../../sanity.types"
import { Button } from "./ui/button"

const AddToCartButton = ({ product,disabled=false }: { product: Product,disabled?:boolean }) => {
    const { addItem } = useCartStore();
    const addToCart = () => {
        addItem(product)
    }
    return (
        <Button disabled={disabled} onClick={addToCart} className={`w-1/2 text-sm font-medium text-white rounded-md transition-colors duration-200 ${
            disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'
          }`}>ADD TO CART</Button>
    )
}

export default AddToCartButton