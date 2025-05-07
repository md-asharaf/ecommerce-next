import { getMyOrders } from "@/sanity/lib/orders/getMyOrders"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


const OrdersPage = async () => {
    const { userId } = await auth()
    if (!userId) {
        redirect("/")
    }
    const orders = await getMyOrders(userId)
    return (
        <div>OrdersPage</div>
    )
}

export default OrdersPage