"use client"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import { usePagination } from "@/hooks/use-pagination"
import { getMyOrders, PopulatedOrder } from "@/sanity/lib/order/getMyOrders"
import { useUser } from "@clerk/nextjs"
import { useCallback } from "react"
import OrderItem from "./OrderItem"
import LoadingSpinner from "./LoadingSpinner"
import Link from "next/link"

const PaginatedOrders = () => {
    const { isSignedIn, user, isLoaded } = useUser()
    const fetchOrders = useCallback((page?: number) => getMyOrders(user?.id || "", page), [user?.id])
    const {
        data,
        fetchPage,
        totalPages,
        isLoading,
        currentPage
    } = usePagination<PopulatedOrder>(fetchOrders, 1)

    if (!isLoaded || isLoading) return <LoadingSpinner />
    if (!isSignedIn) return <div className="text-center py-8 text-gray-600">Sign in to view your orders.</div>

    const orders = data?.[currentPage - 1];
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
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    fetchPage(currentPage - 1)
                                }}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, idx) => {
                            const page = idx + 1
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === page}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            fetchPage(page)
                                        }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    fetchPage(currentPage + 1)
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}

export default PaginatedOrders