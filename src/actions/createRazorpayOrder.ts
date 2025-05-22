"use server";
import { CartItem } from "@/store/cart";
import { razorpay } from "@/lib/razorpay";
import { LineItem } from "@/types/razorpay";
import { Metadata } from "@/app/(store)/cart/page";

type RazorpayOrderPayload = {
    amount: number;
    currency: "INR";
    payment_capture: boolean;
    line_items: LineItem[];
    notes: Metadata;
};

export const createRazorpayOrder = async (
    items: CartItem[],
    metadata: Metadata
) => {
    try {
        const totalPrice = items.reduce((total, { product, quantity }) => {
            return total + (product.price ?? 0) * quantity;
        }, 0);

        const payload: RazorpayOrderPayload = {
            amount: Math.round(totalPrice * 100),
            currency: "INR",
            payment_capture: true,
            line_items: items.map(
                ({ product, quantity }): LineItem => ({
                    type: "product",
                    sku: product._id ?? "",
                    variant_id: product._rev ?? "",
                    price: `${(product.price ?? 0) * 100}`,
                    offer_price: `${(product.price ?? 0) * 100}`,
                    tax_amount: 0,
                    quantity,
                    name: product.name ?? "",
                    description: product.description ?? "",
                    weight: "0",
                    dimensions: {
                        height: "0",
                        width: "0",
                        length: "0",
                    },
                    image_url: product.imageUrl ?? "",
                    product_url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${product.slug?.current ?? ""}`,
                })
            ),
            notes: metadata,
        };
        console.log("Payload for Razorpay Order", payload);
        const order = await razorpay.orders.create(payload);
        return order || null;
    } catch (error) {
        console.error("Error creating checkout session", error);
        return null;
    }
};
