"use server";
import { Metadata } from "@/app/(store)/cart/page";
import { razorpay } from "@/lib/razorpay";
import { backendClient } from "@/sanity/lib/backendClient";
import crypto from "crypto";
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
        const { notes, amount, currency, line_items } =
            await razorpay.orders.fetch(razorpay_order_id);
        const products = line_items?.map((item) => ({
            _key: crypto.randomUUID(),
            product: {
                _type: "reference",
                _ref: item.sku as string,
            },
            quantity: item.quantity,
        }));
        const {
            city,
            clerkUserId,
            country,
            email,
            firstName,
            lastName,
            phone,
            state,
            street,
            zip,
        } = notes as Metadata;
        await backendClient.create({
            _type: "order",
            orderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            status: "paid",
            email,
            city,
            country,
            firstName,
            lastName,
            phone,
            state,
            street,
            zip,
            clerkUserId,
            currency,
            amountDiscount: 0,
            totalAmount: Number(amount) / 100,
            products,
            orderDate: new Date().toISOString(),
        });
    } catch (error) {
        console.log("Error creating order in sanity", error);
    }
};
