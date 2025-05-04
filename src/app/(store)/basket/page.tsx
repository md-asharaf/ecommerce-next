"use client"
import useBasketStore from "@/store/store"
import { useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const BasketPage = () => {
    const groupedItems = useBasketStore((state) => state.items)
    const totalPrice = useBasketStore((state) => state.getTotalPrice())
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => { setIsClient(true) }, [])
    if (!isClient) return null
    return (
        <div>BasketPage</div>
    )
}

export default BasketPage