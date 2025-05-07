"use server";
import { razorpay } from "@/lib/razorpay";
import { backendClient } from "@/sanity/lib/backendClient";
import crypto from "crypto";
import { Metadata } from "./createRazorpayOrder";
export type RazorpaySuccessResponse = {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
};
export const verifyRazorpaySignature = async ({
    razorpay_payment_id,
    razorpay_signature,
    razorpay_order_id,
}: RazorpaySuccessResponse) => {
    const secret = process.env.RAZORPAY_SECRET_KEY as string;

    const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
    if (generated_signature !== razorpay_signature) {
        console.error("Signature verification failed");
        return null;
    }
    //extract notes from razorpay_order_id
    const { notes, receipt, amount, currency, line_items } =
        await razorpay.orders.fetch(razorpay_order_id);
    const { customerName, customerEmail, clerkUserId } = notes as Metadata;
    const order = await backendClient.create({
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
        products: [],
        orderDate: new Date().toISOString(),
    });
    return `/sucess?orderId=${razorpay_order_id}&paymentId=${razorpay_payment_id}`;
};
