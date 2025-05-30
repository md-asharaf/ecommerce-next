import PaginatedOrders from "@/components/PaginatedOrders"
import { getMyOrders } from "@/sanity/lib/order/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
const OrdersPage = async ({ searchParams }: { searchParams: Promise<{ page: number }> }) => {
  const { userId } = await auth();
  if (!userId) {
    return notFound();
  }
  const { page = 1 } = await searchParams;

  const { items: orders, totalPages } = await getMyOrders(userId, page, 5);
  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white min-h-[calc(100vh-4rem)]">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">
          Your Orders
        </h1>
        <PaginatedOrders orders={orders} totalPages={totalPages} currentPage={page} />
    </div>
  )
}

export default OrdersPage