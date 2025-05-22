"use client"
import { useCartStore } from "@/store/cart"
import { Product } from "../../sanity.types"
import { Button } from "./ui/button"

const AddToCartButton = ({ product }: { product: Product }) => {
    const { addItem } = useCartStore();
    const addToCart = () => {
        addItem(product)
    }
    return (
        <Button onClick={addToCart}>ADD TO CART</Button>
    )
}

export default AddToCartButton