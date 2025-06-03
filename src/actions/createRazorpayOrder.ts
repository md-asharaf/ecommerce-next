"use server";
import { razorpay } from "@/lib/razorpay";

type RazorpayOrderPayload = {
    amount: number;
    currency: "INR";
    payment_capture: boolean;
    notes: any;
};

export const createRazorpayOrder = async (
    totalPrice: number,
    orderId: string,
    customerName: string
) => {
    try {
        const payload: RazorpayOrderPayload = {
            amount: Math.round(totalPrice * 100),
            currency: "INR",
            payment_capture: true,
            notes: {
                customerName,
                orderId,
            },
        };

        console.log("Payload for Razorpay Order", payload);
        const order = await razorpay.orders.create(payload as any);
        return order || null;
    } catch (error) {
        console.error("Error creating checkout session", error);
        return null;
    }
};
