"use server";
import crypto from "crypto";
export type RayzorpayCheckoutResponse = {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
};
export const verifyRazorpaySignature = async (
    { razorpay_payment_id, razorpay_signature }: RayzorpayCheckoutResponse,
    order_id: string
) => {
    const secret = process.env.RAZORPAY_SECRET_KEY as string;

    const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(`${order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generated_signature !== razorpay_signature) {
        throw new Error("Signature verification failed");
    }
};
