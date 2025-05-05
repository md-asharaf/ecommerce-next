"use server";
import { BasketItem } from "@/store/store";
import { razorpay } from "@/lib/razorpay";
export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
};
export const createRazorpayOrder = async (
    items: BasketItem[],
    metadata: Metadata
) => {
    try {
        const itemsWithoutPrice = items.some(({ product }) => !product.price);
        if (itemsWithoutPrice) {
            throw new Error("Some items do not have price");
        }
        const totalPrice = items.reduce((total, { product, quantity }) => {
            return total + (product.price ?? 0) * quantity;
        }, 0);
        const { orderNumber, ...rest } = metadata;
        const order = await razorpay.orders.create({
            amount: totalPrice * 100,
            currency: "INR",
            receipt: orderNumber,
            payment_capture: true,
            notes: rest,
        });
        return order || null;
    } catch (error) {
        console.error("Error creating checkout session", error);
        return null;
    }
};
