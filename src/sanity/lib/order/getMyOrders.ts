"use server";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { PaginationResult } from "@/hooks/use-pagination";
import { Order, Product } from "../../../../sanity.types";

export interface PopulatedOrder extends Omit<Order, "products"> {
    products: {
        quantity: number;
        product: Product;
    }[];
}

export const getMyOrders = async (
    userId: string,
    page: number = 1,
    limit: number = 5
): Promise<PaginationResult<PopulatedOrder>> => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const MY_ORDERS_QUERY = defineQuery(`
        {
            "orders": *[_type == "order" && clerkUserId == $userId] | order(orderDate desc)[$start...$end]{
                ...,
                products[]{
                    ...,
                    product->
                }
            },
            "total": count(*[_type == "order" && clerkUserId == $userId])
        }
    `);
    try {
        const result = await sanityFetch({
            query: MY_ORDERS_QUERY,
            params: {
                userId,
                start,
                end,
            },
        });
        const total = result.data?.total || 0;
        const orders = result.data?.orders || [];
        return {
            items: orders as PopulatedOrder[],
            totalPages: Math.ceil(total / limit),
            totalCount: total,
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        return {
            items: [],
            totalPages: 0,
            totalCount: 0,
        };
    }
};
