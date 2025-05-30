import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import { PopulatedOrder } from "@/sanity/lib/order/getMyOrders"
import OrderItem from "./OrderItem"
import Link from "next/link"
interface PaginatedOrdersProps {
    orders: PopulatedOrder[]
    currentPage: number
    totalPages: number
}
const PaginatedOrders = ({ orders, currentPage, totalPages }: PaginatedOrdersProps) => {
    if (!orders || orders.length === 0) return <div className="text-center py-8 text-gray-600">No orders found.</div>
    return (
        <div>
            <div className="space-y-4 sm:space-y-6">
                {orders.map((order) => (
                    <Link href={`/orders/${order.orderId}`} key={order.orderId} className="block">
                        <OrderItem key={order.orderId} order={order} />
                    </Link>
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        {currentPage > 1 && <PaginationItem>
                            <PaginationPrevious

                                href={`?page=${currentPage - 1}`}
                            />
                        </PaginationItem>}

                        {Array.from({ length: totalPages }, (_, idx) => {
                            const page = idx + 1
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href={`?page=${page}`}
                                        isActive={currentPage === page}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })}

                        {currentPage < totalPages && <PaginationItem>
                            <PaginationNext
                                href={`?page=${currentPage + 1}`}
                            />
                        </PaginationItem>}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}

export default PaginatedOrders