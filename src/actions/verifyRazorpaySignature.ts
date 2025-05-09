"use server";
import { razorpay } from "@/lib/razorpay";
import { backendClient } from "@/sanity/lib/backendClient";
import crypto from "crypto";
import { Metadata } from "./createRazorpayOrder";
import { BasketItem } from "@/store/store";
export type RazorpaySuccessResponse = {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
};
export const verifyRazorpaySignature = async (
    eventData: RazorpaySuccessResponse
) => {
    const { razorpay_payment_id, razorpay_signature, razorpay_order_id } =
        eventData;
    const secret = process.env.RAZORPAY_SECRET_KEY as string;

    const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
    if (generated_signature !== razorpay_signature) {
        console.error("Signature verification failed");
        return null;
    }
    await createSanityOrder(eventData);
    return `/success?orderId=${razorpay_order_id}&paymentId=${razorpay_payment_id}`;
};

const createSanityOrder = async (eventData: RazorpaySuccessResponse) => {
    try {
        const { razorpay_payment_id, razorpay_signature, razorpay_order_id } =
            eventData;
        const { notes, receipt, amount, currency } =
            await razorpay.orders.fetch(razorpay_order_id);
        const { customerName, customerEmail, clerkUserId } = notes as Metadata;
        const lineItems = JSON.parse(
            notes?.line_items as string
        ) as BasketItem[];
        const products = lineItems.map((item) => ({
            _key: crypto.randomUUID(),
            product: {
                _type: "reference",
                _ref: item.product._id as string,
            },
            quantity: item.quantity,
        }));
        await backendClient.create({
            _type: "order",
            orderNumber: razorpay_order_id,
            razorpayReceiptId: receipt,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            status: "paid",
            customerName,
            email: customerEmail,
            clerkUserId,
            currency,
            amountDiscount: 0,
            price: Number(amount) / 100,
            products,
            orderDate: new Date().toISOString(),
        });
    } catch (error) {
        console.log("Error creating order in sanity", error);
    }
};
